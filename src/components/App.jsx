import { Component } from 'react';

import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';

export default class App extends Component {
  state = {
    query: '',
    page: 1,
  };

  loadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };
  handleFormSubmit = (query, page) => {
    this.setState({ query, page });
  };
  render() {
    return (
      <div>
        <button type="button" onClick={this.loadMore}>
          Load more
        </button>
        ----------------
        <Searchbar onSubmit={this.handleFormSubmit} />
        <ImageGallery query={this.state.query} />
      </div>
    );
  }
}
