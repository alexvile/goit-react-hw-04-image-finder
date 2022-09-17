import { Component } from 'react';

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

    if (this.state.query.trim() === '') {
      alert('empty string');
      return;
    }

    this.props.onSubmit(this.state.query, this.state.page);
    this.formReset();
  };
  handleChange = e => {
    this.setState({ query: e.currentTarget.value.toLowerCase() });
  };
  render() {
    return (
      <header>
        <form onSubmit={this.handleSubmit}>
          <button type="submit">
            <span>Search</span>
          </button>
          <label>
            Search query
            <input
              autoComplete="off"
              autoFocus
              placeholder="Search images and photos"
              type="text"
              onChange={this.handleChange}
              value={this.state.query}
            />
          </label>
        </form>
      </header>
    );
  }
}
