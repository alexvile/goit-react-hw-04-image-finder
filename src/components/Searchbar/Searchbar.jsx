import { useState } from 'react';

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

export default function Searchbar({ onSubmit }) {
  const [query, setQuery] = useState('');
  // const [page, setPage] = useState(1);

  // const formReset = () => {
  //   setPage(1);
  // };

  const handleSubmit = e => {
    e.preventDefault();

    if (query.trim() === '') {
      toast.warn('You should to write something to search');
      return;
    }

    onSubmit(query);
    // formReset();
  };

  const handleChange = e => {
    setQuery(e.currentTarget.value.toLowerCase());
  };

  return (
    <SearchContainer>
      <SearchForm onSubmit={handleSubmit}>
        <SearchFormButton type="submit">
          <SearchFormButtonLabel>Label</SearchFormButtonLabel>
        </SearchFormButton>
        <SearchFormInput
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          type="text"
          onChange={handleChange}
          value={query}
        />
      </SearchForm>
    </SearchContainer>
  );
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
