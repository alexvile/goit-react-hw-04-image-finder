import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { fetchImages } from 'services/images-api';
import Modal from 'components/Modal/Modal';
import { GalleryContainer } from './ImageGallery.styled';
import { Button } from 'components/Button/Button';
import { Loader } from 'components/Loader/Loader';
import { NothingFound } from 'components/NothingFound/NothingFound';

export default function ImageGallery({ page, query, pageIncrement }) {
  const [images, setImages] = useState([]);
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState('');
  const [loader, setLoader] = useState(false);
  const [packageLength, setPackageLength] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalImg, setModalImg] = useState(null);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const onImgClick = id => {
    const clickedImg = images.find(image => image.id === id);
    setModalImg(clickedImg);
    toggleModal();
  };

  const scroll = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    // first loading
    if (query === '') {
      return;
    }
    // new query
    if (page === 1) {
      setStatus('idle');
      setImages([]);
    }

    setLoader(true);

    fetchImages(query, page)
      .then(images => {
        setStatus('resolved');
        setLoader(false);
        setImages(prevState => [...prevState, ...images.hits]);
        setPackageLength(images.hits.length);
      })
      .catch(error => {
        setError(error);
        setStatus('rejected');
      })
      .finally(() => {
        setTimeout(() => {
          scroll();
        }, 300);
      });
  }, [page, query]);

  if (status === 'idle') {
    return <div>{loader && <Loader />}</div>;
  }

  if (status === 'rejected') {
    return <p>{error.message}</p>;
  }

  if (status === 'resolved') {
    return (
      <div>
        {images.length > 0 ? (
          <GalleryContainer>
            {images.map(({ id, webformatURL, tags }) => (
              <ImageGalleryItem
                key={id}
                id={id}
                url={webformatURL}
                title={tags}
                onImgClick={onImgClick}
              />
            ))}
          </GalleryContainer>
        ) : (
          <NothingFound query={query} />
        )}
        {loader && <Loader />}
        {showModal && (
          <Modal onClose={toggleModal}>
            <img src={modalImg.largeImageURL} alt={modalImg.tags} />
          </Modal>
        )}
        {packageLength >= 12 && !loader && <Button onClick={pageIncrement} />}
      </div>
    );
  }
}

ImageGallery.propTypes = {
  page: PropTypes.number.isRequired,
  query: PropTypes.string.isRequired,
  pageIncrement: PropTypes.func.isRequired,
};
