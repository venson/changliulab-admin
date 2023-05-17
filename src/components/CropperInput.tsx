import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';

interface ImageCropperProps {
  input: {
    onChange: (file: File) => void;
  };
  output: {
    onChange: (image: string) => void;
  };
  aspectRatio: number;
  width: number;
  height: number;
  quality: number;
}

function CropperInput({
  input,
  output,
  aspectRatio,
  width,
  height,
  quality,
}: ImageCropperProps) {
  const [croppedImage, setCroppedImage] = useState<string | null>(null);
  const cropperRef = useRef<Cropper>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    if (file) {
      const reader = new FileReader();

      reader.onload = () => {
        input.onChange(file);
        setCroppedImage(reader.result as string);
      };

      reader.readAsDataURL(file);
    }
  };

  const handleCrop = () => {
    if (cropperRef.current) {
      const canvas = cropperRef.current.getCroppedCanvas({
        width: width,
        height: height,
        minWidth: width,
        minHeight: height,
        maxWidth: width,
        maxHeight: height,
        fillColor: '#fff',
        imageSmoothingEnabled: false,
        imageSmoothingQuality: 'high',
      });

      canvas.toBlob((blob) => {
        const formData = new FormData();
        formData.append('file', blob!, 'image.jpg');

        fetch('https://image.changliulab.com/upload', {
          method: 'POST',
          body: formData,
        })
          .then((response) => response.json())
          .then((data) => {
            output.onChange(data.image);
            setCroppedImage(null);
          })
          .catch((error) => console.error(error));
      }, 'image/jpeg', quality);
    }
  };

  return (
    <>
      <input type="file" accept="image/*" onChange={handleFileChange} />
      {croppedImage && (
        <Cropper
          src={croppedImage}
          aspectRatio={aspectRatio}
          guides={true}
          viewMode={2}
          background={false}
          ref={cropperRef}
        />
      )}
      {croppedImage && (
        <button onClick={handleCrop}>Crop and Upload</button>
      )}
    </>
  );
}

CropperInput.propTypes = {
  input: PropTypes.object.isRequired,
  output: PropTypes.object.isRequired,
  aspectRatio: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  quality: PropTypes.number.isRequired,
};

export default CropperInput;
