import {
  useState,
  useRef,
  ChangeEvent,
  SyntheticEvent,
  WheelEventHandler,
} from "react";
import { useInput } from "ra-core";

import ReactCrop, {
  centerCrop,
  makeAspectCrop,
  Crop,
  PixelCrop,
} from "react-image-crop";
import { canvasPreview } from "./canvasPreview";
import { useDebounceEffect } from "./useDebounceEffect";

import "react-image-crop/dist/ReactCrop.css";
import { Box, Modal } from "@mui/material";
import { CommonInputProps, LabeledProps } from "ra-ui-materialui";
import { ControllerRenderProps, FieldValues } from "react-hook-form";

// This is to demonstate how to make and center a % aspect crop
// which is a bit trickier so we use some helper functions.
function centerAspectCrop(
  mediaWidth: number,
  mediaHeight: number,
  aspect: number
) {
  return centerCrop(
    makeAspectCrop(
      {
        unit: "%",
        width: 90,
      },
      aspect,
      mediaWidth,
      mediaHeight
    ),
    mediaWidth,
    mediaHeight
  );
}

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  // maxWidth: "90%",
  maxHeight: 600,
  width: "90%",
  weight: "90%",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
const ImageCrop = ((props:CropperInputProps) => {

  const {onChange, onBlur,source, ...rest} = props;
  const {
    field,
    fieldState,
    formState,
    isRequired
} = useInput({
    ...props,
});
  const [modalOpen, setModalOpen] = useState(false);
  const [imgSrc, setImgSrc] = useState("");
  const previewCanvasRef = useRef<HTMLCanvasElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const hiddenAnchorRef = useRef<HTMLAnchorElement>(null);
  const blobUrlRef = useRef("");
  const [crop, setCrop] = useState<Crop>();
  const [completedCrop, setCompletedCrop] = useState<PixelCrop>();
  const [scale, setScale] = useState(0.7);
  const [rotate, setRotate] = useState(0);
  const [aspect, setAspect] = useState<number | undefined>(16/9);

  if (props.mode === "avatar" && aspect !== 1) {

    setAspect(1);
  console.log('avatar', aspect)
  } else if (props.mode === "cover" && aspect !== 16/9) {
    setAspect(16 / 9);
  console.log('covert', aspect)
  } else if (props.mode === "banner" && aspect !== 20/9) {
    setAspect(20 / 9);
  console.log('banner', aspect)
  }
  function onSelectFile(e: ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files.length > 0) {
      setCrop(undefined); // Makes crop preview update between images.
      const reader = new FileReader();
      reader.addEventListener("load", () =>
        setImgSrc(reader.result?.toString() || "")
      );
      reader.readAsDataURL(e.target.files[0]);
      setModalOpen(true);
    }
  }

  function onScroll(e:any) {
    // if(e.deltaY> 1){
    const delta = e.deltaY * -0.01;
    setScale(scale + delta > 0 ? scale + delta : scale);
    // }
  }

  function onImageLoad(e: SyntheticEvent<HTMLImageElement>) {
    if (aspect) {
      const { width, height } = e.currentTarget;
      console.log(aspect, width, height)
      const crop = centerCrop(
        makeAspectCrop(
          {
            // You don't need to pass a complete crop into
            // makeAspectCrop or centerCrop.
            unit: 'px',
            width: 100,
          },
          aspect,
          width,
          height
        ),
        width,
        height
      )
      console.log(crop)
      setCrop(crop)
      // setCrop(centerAspectCrop(width, height, aspect));
    }
  }
  function closeModal(){
    setModalOpen(false);
  }

  function onDownloadCropClick() {
    if (!previewCanvasRef.current) {
      throw new Error("Crop canvas does not exist");
    }

    previewCanvasRef.current.toBlob((blob) => {
      if (!blob) {
        throw new Error("Failed to create blob");
      }
      if (blobUrlRef.current) {
        URL.revokeObjectURL(blobUrlRef.current);
      }
      blobUrlRef.current = URL.createObjectURL(blob);
      hiddenAnchorRef.current!.href = blobUrlRef.current;
      hiddenAnchorRef.current!.click();
    });
  }

  useDebounceEffect(
    async () => {
      if (
        completedCrop?.width &&
        completedCrop?.height &&
        imgRef.current &&
        previewCanvasRef.current
      ) {
        // We use canvasPreview as it's much faster than imgPreview.
        canvasPreview(
          imgRef.current,
          previewCanvasRef.current,
          completedCrop,
          scale,
          rotate
        );
      }
    },
    100,
    [completedCrop, scale, rotate]
  );


  return (
    <div className="Crop-Controls">
      <input type="file" accept="image/*" onChange={onSelectFile} />
      <Modal open={modalOpen}>
        <Box sx={{ ...style }}>
          <div className="flex ">
            <div className="w-1/2 m-h-64" onWheel={onScroll}>
              <ReactCrop
                crop={crop}
                onChange={(crop, percentCrop) => {setCrop(percentCrop)}}
                onComplete={(c) => setCompletedCrop(c)}
                aspect={aspect}
                className="h-96"
                // maxHeight={100}
                // maxWidth={100}
                locked
              >
                <img
                  ref={imgRef}
                  alt="Crop me"
                  src={imgSrc}
                  style={{ transform: `scale(${scale}) rotate(${rotate}deg)` }}
                  onLoad={onImageLoad}
                />
              </ReactCrop>
            </div>
            <div>
              <div>
                <label htmlFor="scale-input">Scale: </label>
                <input
                  id="scale-input"
                  type="number"
                  step="0.1"
                  value={scale}
                  disabled={!imgSrc}
                  onChange={(e) => setScale(Number(e.target.value))}
                />
              </div>
              <div>
                <label htmlFor="rotate-input">Rotate: </label>
                <input
                  id="rotate-input"
                  type="number"
                  value={rotate}
                  disabled={!imgSrc}
                  onChange={(e) =>
                    setRotate(
                      Math.min(180, Math.max(-180, Number(e.target.value)))
                    )
                  }
                />
              </div>
              <canvas
                ref={previewCanvasRef}
                style={{
                  border: "1px solid black",
                  objectFit: "contain",
                  width: completedCrop?.width,
                  height: completedCrop?.height,
                }}
              />
            </div>
          </div>
          <div>
            <button onClick={onDownloadCropClick}>Save Crop</button>
            <button onClick={closeModal}>Cancel</button>
            {/* <a
                ref={hiddenAnchorRef}
                download
                style={{
                  position: "absolute",
                  top: "-200vh",
                  visibility: "hidden",
                }}
              >
                Hidden download
              </a> */}
          </div>
          {/* {!!imgSrc && (
              <ReactCrop
                crop={crop}
                onChange={(_, percentCrop) => setCrop(percentCrop)}
                onComplete={(c) => setCompletedCrop(c)}
                aspect={aspect}
                locked
              >
                <img
                  ref={imgRef}
                  alt="Crop me"
                  src={imgSrc}
                  style={{ transform: `scale(${scale}) rotate(${rotate}deg)` }}
                  onLoad={onImageLoad}
                />
              </ReactCrop>
            )} */}
          {/* {!!completedCrop && (
            <>
              <div>
                <canvas
                  ref={previewCanvasRef}
                  style={{
                    border: "1px solid black",
                    objectFit: "contain",
                    width: completedCrop.width,
                    height: completedCrop.height,
                  }}
                />
              </div>
              <div>
                <button onClick={onDownloadCropClick}>Download Crop</button>
                <a
                  ref={hiddenAnchorRef}
                  download
                  style={{
                    position: "absolute",
                    top: "-200vh",
                    visibility: "hidden",
                  }}
                >
                  Hidden download
                </a>
              </div>
            </>
            )} */}
        </Box>
      </Modal>
    </div>
  );
});
export type CropperInputProps= CommonInputProps &
    Omit<LabeledProps, 'children'> & {
      // height: number,
      // width:number,
      mode: 'avatar'|'cover'|'banner',
      path: string,
    } & ControllerRenderProps<FieldValues, string>;
export default ImageCrop;
