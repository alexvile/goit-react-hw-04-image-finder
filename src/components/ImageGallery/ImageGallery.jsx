import { Component } from 'react';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { fetchImages } from 'components/services/images-api';

export default class ImageGallery extends Component {
  state = {
    images: [],
    status: 'idle',
    error: '',
    package_length: null,
  };

  componentDidUpdate(prevProps, _) {
    const prevQuery = prevProps.query;
    const currentQuery = this.props.query;

    const prevPage = prevProps.page;
    const currentPage = this.props.page;

    if (prevQuery !== currentQuery || prevPage !== currentPage) {
      this.setState({ status: 'pending' });

      fetchImages(currentQuery, currentPage)
        .then(images => {
          console.log(images);

          // For new query
          if (prevQuery !== currentQuery) {
            this.setState({
              images: images.hits,
              status: 'resolved',
              package_length: images.hits.length,
            });
          }

          // For addition query
          if (prevQuery === currentQuery) {
            this.setState(prevState => ({
              status: 'resolved',
              images: [...prevState.images, ...images.hits],
              package_length: images.hits.length,
            }));
          }
        })
        .catch(error => this.setState({ error, status: 'rejected' }));
    }
  }

  render() {
    const { images, status, error, package_length } = this.state;
    const { query, pageIncrement } = this.props;

    if (status === 'idle') {
      return <p>Введите картинку</p>;
    }
    if (status === 'pending') {
      return <p>Загружаем...</p>;
    }
    if (status === 'rejected') {
      return <p>{error.message}</p>;
    }
    if (status === 'resolved') {
      return (
        <div>
          {images.length > 0 ? (
            <ul>
              {images.map(({ id, webformatURL, tags }) => (
                <ImageGalleryItem key={id} url={webformatURL} title={tags} />
              ))}
            </ul>
          ) : (
            <p>Nothing found for your query: "{query}"</p>
          )}

          {package_length >= 12 && (
            <button type="button" onClick={pageIncrement}>
              Load more
            </button>
          )}
        </div>
      );
    }
  }
}
