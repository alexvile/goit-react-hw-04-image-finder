import React, { Component } from 'react';
import { createPortal } from 'react-dom';
import { Overlay, Content } from './Modal.styled';
import PropTypes from 'prop-types';

const modalRoot = document.getElementById('modal-root');
export default class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.closeModal);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.closeModal);
  }

  closeModal = e => {
    if (e.code === 'Escape') {
      this.props.onClose();
    }
  };

  closeByClick = e => {
    if (e.currentTarget === e.target) {
      this.props.onClose();
    }
  };

  render() {
    return createPortal(
      <Overlay onClick={this.closeByClick}>
        <Content>{this.props.children}</Content>
      </Overlay>,
      modalRoot
    );
  }
}

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};
