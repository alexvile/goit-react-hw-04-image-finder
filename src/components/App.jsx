import { Component } from 'react';

import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';

export default class App extends Component {
  state = {
    query: '',
    page: 1,
  };

  handleFormSubmit = (query, page) => {
    this.setState({ query, page });
  };

  loadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  render() {
    return (
      <div>
        ----------------
        <Searchbar onSubmit={this.handleFormSubmit} />
        <ImageGallery
          query={this.state.query}
          page={this.state.page}
          pageIncrement={this.loadMore}
        />
      </div>
    );
  }
}
