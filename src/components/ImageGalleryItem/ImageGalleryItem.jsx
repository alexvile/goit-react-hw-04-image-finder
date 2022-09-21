import { ImageContainer, Image } from './ImageGalleryItem.styled';
import PropTypes from 'prop-types';

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

ImageGalleryItem.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  onImgClick: PropTypes.func.isRequired,
};
