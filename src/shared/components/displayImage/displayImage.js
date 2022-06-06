import { useEffect, useState } from "react";
import playlistThumbnail from "../../../assets/images/playlistThumbnail.svg";
import placeholder from "../../../assets/images/placeholder-image.jpg";
import Style from "./displayImage.module.scss";

const DisplayImage = ({
  imageUrl = "image_url",
  className,
  isProfileAvatar = false,
  playlistImage = false,
}) => {
  const [imageSrc, setImageSrc] = useState("");
  const [isErrorOccured, setIsErrorOccured] = useState(false);

  useEffect(() => {
    setImageSrc(imageUrl);
  }, [imageUrl]);

  const anErrorOccured = () => {
    playlistImage ? setImageSrc(playlistThumbnail) : setIsErrorOccured(true);
  };

  return (
    <>
      {isErrorOccured ? (
        <img
          src={placeholder}
          className={`${Style.imageStyle} ${className} ${
            isErrorOccured ? Style.image : ""
          }`}
          onError={anErrorOccured}
        />
      ) : (
        <img
          src={imageSrc}
          className={`${Style.imageStyle}  ${className}`}
          onError={anErrorOccured}
        />
      )}
    </>
  );
};
export default DisplayImage;
