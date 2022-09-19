import { ImageContainer, Image } from './ImageGalleryItem.styled';
export const ImageGalleryItem = ({ id, url, title, onImgClick }) => {
  return (
    <ImageContainer
      onClick={() => {
        onImgClick(id);
      }}
    >
      <Image width="200" src={url} alt={title} />
    </ImageContainer>
  );
};
