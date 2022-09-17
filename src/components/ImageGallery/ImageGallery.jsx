import { Component } from 'react';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { fetchImages } from 'components/services/images-api';

export default class ImageGallery extends Component {
  state = {
    images: [],
    page: 1,
    status: 'idle',
    error: 'null',
  };

  componentDidUpdate(prevProps, prevState) {
    const prevQuery = prevProps.query;
    const currentQuery = this.props.query;

    const prevPage = prevState.page;
    const currentPage = this.state.page;

    if (prevQuery !== currentQuery || prevPage !== currentPage) {
      this.setState({ status: 'pending' });

      fetchImages(currentQuery, currentPage)
        .then(images => {
          console.log(images);
          this.setState({ images: images.hits, status: 'resolved' });
        })
        .catch(error => this.setState({ error, status: 'rejected' }));
    }
  }

  render() {
    const { images, status, error } = this.state;
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
          <ul>
            {images.length > 0 ? (
              <div>
                {images.map(({ id, webformatURL, tags }) => (
                  <ImageGalleryItem key={id} url={webformatURL} title={tags} />
                ))}
                {/* <button type="button" onClick={this.loadMore}>
                  Load more
                </button> */}
              </div>
            ) : (
              <p>Nothing found for your query: "{this.props.query}"</p>
            )}
          </ul>
        </div>
      );
    }
  }
}
