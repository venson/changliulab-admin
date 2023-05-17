import React, { useState, createRef} from "react";
import Cropper, { ReactCropperElement } from "react-cropper";
import "cropperjs/dist/cropper.css";
import { Button, Modal } from "@mui/material";
import { Box } from "@mui/system";
import {
  ControllerRenderProps, FieldValues,
} from "react-hook-form";
import { getImageAuth, upLoadToOss} from "../dataProvider";
import { CommonInputProps, ImageField, LabeledProps } from "ra-ui-materialui";
import { useInput } from "react-admin";
const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "90%",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
interface Props {
}
  let imageName:string;
const MyCropper  = ((props:CropperInputProps) => {
  const {onChange, onBlur,source, ...rest} = props;
  const {
    field,
    fieldState,
    formState,
    isRequired
} = useInput({
    ...props,
});
  const [image, setImage] = useState<string>();
  const [modalOpen, setModalOpen] = useState(false);
  const cropperRef = createRef<ReactCropperElement>();
  const width = props.mode === 'free' ? 10: 160;
  const height= props.mode === 'free' ? 10: props.mode === 'cover' ? 210: 160;

  console.log(props)
  // console.log(props)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log('file changed')
    e.preventDefault();
    const file:File| null = e.target.files && e.target.files[0]
    let files: FileList | null = null;
    files = e.target.files;
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result as string);
        console.log("onload");
        setModalOpen(true);
        imageName=file.name.substring(0,file.name.lastIndexOf('.')) + '.webp'
        const uriName = encodeURIComponent(
          file.name.substring(0, file.name.lastIndexOf('.')) + '.webp'
        ).replace(/[!'()*]/g, (c) => `%${c.charCodeAt(0).toString(16).toUpperCase()}`);
        console.log(imageName)
      };
      reader.readAsDataURL(file);
    }
  };

  const getCropData = () => {};
  const closeCrop = ()=>{
    setModalOpen(false);
  }
  const saveCrop = () => {
    if (cropperRef.current?.cropper) {
      cropperRef.current.cropper.getCroppedCanvas().toBlob(
        (blob) => {
            if(blob){
                console.log(blob)
            getImageAuth(props.path).then((res) =>{
            const formData = new FormData();
            const timeMark = new Date().getTime();
            console.log(res)
            console.log(res.data.data.dir)
            const key = res.data.data.dir + '/' + timeMark + imageName;
            console.log('key', key)
            const newUrl = "https://image.changliulab.com" + '/' + key;
            formData.append('key', key);
            formData.append('policy', res.data.data.policy);
            formData.append('OSSAccessKeyId', res.data.data.accessId);
            formData.append('success_action_status', '200');
            formData.append('Signature', res.data.data.signature);
            formData.append('file', blob, imageName);
            field.onChange(newUrl)
            // upLoadToOss(res.data.data.host, formData).then(()=>{
            //     console.log('uploaded')
            //     console.log(newUrl)
            //  props.value = newUrl;
            // })
            })
            }
        },
        "image/webp",
        0.8
      );
    }
  };

  return (
    <div>
      <div style={{ width: "100%" }}>
        {/* <ImageField {...field} sx={{maxHeight: 100, maxWidth: 100}}/> */}
        <Box
        component="img"
        sx={{
          height: 160,
          width: 160,
          p:2,
          // maxHeight: { xs: 233, md: 167 },
          // maxWidth: { xs: 350, md: 250 },
        }}
        alt="The house from the offer."
        src={field.value}
      />
        <Button variant="contained" component="label">
        Upload
        <input  hidden accept="image/*" type="file" onChange={handleChange}/>
        </Button>
        {/* <input type="file" onChange={onChange} /> */}
        <br />
        <br />
        <Modal open={modalOpen}>
          <Box sx={{ ...style }}>
            <div className="flex ">
              <Cropper
              className="w-1/2"
                ref={cropperRef}
                // style={{ height: "90%", width: "50%", float: "left" }}
                // zoomTo={0.5}
                preview=".img-preview"
                src={image}
                viewMode={1}
                minCropBoxHeight={height}
                minCropBoxWidth={width}
                background={true}
                cropBoxResizable={props.mode === 'free'}
                responsive={true}
                autoCropArea={1}
                checkOrientation={false} // https://github.com/fengyuanchen/cropperjs/issues/671
                guides={true}
              />
              <div className="p-3 w-1/2">
                  <h1 className="text-gray-700">Preview</h1>
                  <div
                    className="img-preview overflow-hidden"
                      style={{ width: "100%", height:400 }}
                    //   style={{...cropStyle}}
                  />
                </div>
            </div>
            <div className="flex justify-between p-4">
              <Button variant="contained" color="success" onClick={saveCrop}> Save</Button>
              <Button variant="contained" color="secondary" onClick={closeCrop}>Cancel</Button>
            </div>
          </Box>
        </Modal>
      </div>
    </div>
  );
});
export type CropperInputProps= CommonInputProps &
    Omit<LabeledProps, 'children'> & {
      // height: number,
      // width:number,
      mode: 'avatar'|'cover'|'free',
      path: string,
    } & ControllerRenderProps<FieldValues, string>;
export default MyCropper;
