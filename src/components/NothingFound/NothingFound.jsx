import { Message } from './NothingFound.styled';
import PropTypes from 'prop-types';

export const NothingFound = ({ query }) => {
  return <Message>Nothing found for your query: "{query}"</Message>;
};

NothingFound.propTypes = {
  query: PropTypes.string.isRequired,
};
