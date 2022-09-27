import { Component } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
    this.setState({ page: 1 });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { query, page } = this.state;

    if (query.trim() === '') {
      // toast.error('empty string');
      toast.warn('You should to write something to search');
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
