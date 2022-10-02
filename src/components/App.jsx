import { ToastContainer } from 'react-toastify';
import { useState } from 'react';

import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import { Container } from './App.styled';

export default function App() {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);

  const handleFormSubmit = (query, page) => {
    setQuery(query);
    setPage(page);
  };

  const loadMore = () => {
    setPage(prevState => prevState + 1);
  };

  return (
    <Container>
      <Searchbar onSubmit={handleFormSubmit} />
      <ImageGallery query={query} page={page} pageIncrement={loadMore} />
      <ToastContainer autoClose={2500} />
    </Container>
  );
}
