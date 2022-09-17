export const ImageGalleryItem = ({ url, title }) => {
  return (
    <span>
      <img width="200" src={url} alt={title} />
    </span>
  );
};
