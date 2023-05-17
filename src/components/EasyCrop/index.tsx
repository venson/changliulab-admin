import {
  useState,
  Fragment,
  ChangeEvent,
forwardRef,
} from "react";
import Slider from "@mui/material/Slider";
import { useInput } from "ra-core";

import Cropper, { Area } from "react-easy-crop";
import { Box, Button, Modal } from "@mui/material";
// import { generateImage } from "./utils";
import { generateImage } from "./utils";
import "./styles.css";
import { CommonInputProps, LabeledProps } from "ra-ui-materialui";
import { getImageAuth, upLoadToOss } from "../../dataProvider";

type CropperInputProps = 
CommonInputProps &
  {
    mode: "avatar" | "cover" | "banner";
    path: string;
  } ;
type cropSize = {width: number; height: number};
const EasyCrop = forwardRef((props: CropperInputProps,ref) => {
  const { field, fieldState, formState, isRequired } = useInput({
    ...props,
  });
  const [crop, setCrop] = useState({ x: 0, y: 0 });

  const [cropSize,setCropSize] = useState<cropSize>({width:100,height:100});
  const [croppedArea, setCroppedArea] = useState<{croppedArea:Area, croppedAreaPixels:Area}>();

  const [imgSrc, setImgSrc] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [zoom, setZoom] = useState(1);
  const [imgName, setImgName] = useState("");
  const { mode, path, source } = props;
  const uploadImage = () => {
    croppedArea &&
      generateImage(imgSrc, croppedArea.croppedAreaPixels, (blob) => {
        blob &&
          getImageAuth(path).then((res) => {
            const formData = new FormData();
            const timeMark = new Date().getTime();
            console.log(res);
            console.log(res.data.data.dir);
            const key = res.data.data.dir + "/" + timeMark + imgName;
            console.log("key", key);
            const newUrl = "https://image.changliulab.com" + "/" + key;
            formData.append("key", key);
            formData.append("policy", res.data.data.policy);
            formData.append("OSSAccessKeyId", res.data.data.accessId);
            formData.append("success_action_status", "200");
            formData.append("Signature", res.data.data.signature);
            formData.append("file", blob, imgName);
            upLoadToOss(res.data.data.host, formData).then(() => {
              console.log("uploaded");
              console.log(newUrl);
              field.onChange(newUrl);
              setModalOpen(false);
            });
          });
      });
  };

  const onCropComplete = (
    croppedArea:Area,
    croppedAreaPixels: Area
  ) => {
    setCroppedArea({croppedArea: croppedArea, croppedAreaPixels:croppedAreaPixels});
  };
  const closeModal = () => {
    setModalOpen(false);
  };

  const onSelectFile = (e: ChangeEvent<HTMLInputElement>) =>{
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setImgSrc("");
      setCrop({ x: 0, y: 0 }); // Makes crop preview update between images.
      if (mode === "avatar") {
        setCropSize({width:160,height:160});
      } else if (mode === "cover") {
        setCropSize({width:210,height:160});
      } else if (mode === "banner") {
        setCropSize({width:1280,height:300});
      }

      file &&
        setImgName(
          file.name.substring(0, file.name.lastIndexOf(".")) + ".webp"
        );
      const reader = new FileReader();
      reader.addEventListener("load", () =>
        setImgSrc(reader.result?.toString() || "")
      );
      reader.readAsDataURL(e.target.files[0]);
      setModalOpen(true);
    }
  }

  const Preview = ({ croppedArea }: { croppedArea: Area }) => {
    // console.log(croppedArea)
    const scale = 100/croppedArea.width;
    const transform = {
      x: `${-croppedArea.x * scale}%`,
      y: `${-croppedArea.y * scale}%`,
      scale,
      width: "calc(100% + 0.5px)",
      height: "auto",
    };

    const imageStyle = {
      transform: `translate3d(${transform.x}, ${transform.y}, 0) scale3d(${transform.scale},${transform.scale},1)`,
      width: transform.width,
      height: transform.height,
    };

    return (
      <div
        className="relative overflow-hidden"
        style={{ paddingBottom: `${100 /1}%`, width:cropSize.width}}
        // style={{ width: width}}
      >
        <img
          className="origin-top-left	absolute top-0 left-0"
          src={imgSrc}
          alt=""
          style={imageStyle}
        />
      </div>
    );
  };
  return (
    <Fragment>
      <div className="bg-gray-200 border-b border-solid border-gray-700">
        <label className="text-gray-500 text-xs text-left">Avatar</label>
        <Box
          component="img"
          sx={{
            height:cropSize.height,
            width: cropSize.width,
            mx: 2,
            mb:1,
            // maxHeight: { xs: 233, md: 167 },
            // maxWidth: { xs: 350, md: 250 },
          }}
          alt="Avatar missing."
          src={field.value}
        ></Box>
        <Button variant="contained" component="label" sx={{mb:1}}>
          Upload
          <input hidden accept="image/*" type="file" onChange={onSelectFile} />
        </Button>
      </div>
      <Modal open={modalOpen}>
        <Box className="bg-gray-700 absolute -translate-y-1/2	-translate-x-1/2	 top-1/2 left-1/2 w-5/6 p-4 ">
          <div className="flex">
            <div className="cropper w-1/2 border">
              <Cropper
                image={imgSrc}
                crop={crop}
                zoom={zoom}
                minZoom={0.1}
                zoomSpeed={0.1}
                cropSize={{ width:cropSize.width, height: cropSize.height}}
                onCropChange={setCrop}
                onCropComplete={onCropComplete}
                onZoomChange={setZoom}
                // onCropAreaChange={(croppedArea) => {
                //   console.log(croppedArea);
                //   setCroppedArea(croppedArea);
                // }}
              />
            </div>
            <div className="w-1/2">
              <div className="controls">
                <Slider
                  value={zoom}
                  min={0.1}
                  max={10}
                  step={0.05}
                  aria-labelledby="Zoom"
                  onChange={(_e, zoom) => setZoom(zoom as number)}
                />
              </div>
              <div className="viewer" style={{ height: "50vh" }}>
                <div>
                  {croppedArea && <Preview croppedArea={croppedArea.croppedArea} />}
                </div>
              </div>
            </div>
          </div>
          <div>
            <Button onClick={uploadImage}>Save</Button>
            <Button onClick={closeModal}>Cancel</Button>
          </div>
        </Box>
      </Modal>
    </Fragment>
  );
});
export default EasyCrop;
