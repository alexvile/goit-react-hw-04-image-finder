import { Component } from 'react';

import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import { Container } from './App.styled';
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
    const { query, page } = this.state;
    return (
      <Container>
        <Searchbar onSubmit={this.handleFormSubmit} />
        <ImageGallery query={query} page={page} pageIncrement={this.loadMore} />
      </Container>
    );
  }
}
