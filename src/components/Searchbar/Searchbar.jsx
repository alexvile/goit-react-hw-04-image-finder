import { Component } from 'react';
import PropTypes from 'prop-types';

import {
  SearchContainer,
  SearchForm,
  SearchFormButton,
  SearchFormButtonLabel,
  SearchFormInput,
} from './Searchbar.styled';

export default class Searchbar extends Component {
  state = {
    query: '',
    page: 1,
  };

  formReset = () => {
    this.setState({ query: '', page: 1 });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { query, page } = this.state;

    if (query.trim() === '') {
      alert('empty string');
      return;
    }

    this.props.onSubmit(query, page);
    this.formReset();
  };
  handleChange = e => {
    this.setState({ query: e.currentTarget.value.toLowerCase() });
  };
  render() {
    return (
      <SearchContainer>
        <SearchForm onSubmit={this.handleSubmit}>
          <SearchFormButton type="submit">
            <SearchFormButtonLabel>Label</SearchFormButtonLabel>
          </SearchFormButton>
          <SearchFormInput
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            type="text"
            onChange={this.handleChange}
            value={this.state.query}
          />
        </SearchForm>
      </SearchContainer>
    );
  }
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
