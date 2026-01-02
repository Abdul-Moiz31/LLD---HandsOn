import React, { useState } from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Portal, Modal } from './PortalModal';

describe('Portal', () => {
  test('should render children into document body by default', () => {
    render(
      <Portal>
        <div data-testid="portal-content">Content</div>
      </Portal>
    );

    expect(screen.getByTestId('portal-content')).toBeInTheDocument();
  });

  test('should render children into specified container', () => {
    const container = document.createElement('div');
    container.id = 'custom-container';
    document.body.appendChild(container);

    render(
      <Portal container={container}>
        <div data-testid="custom-content">Custom Content</div>
      </Portal>
    );

    expect(container.querySelector('[data-testid="custom-content"]')).toBeInTheDocument();

    document.body.removeChild(container);
  });

  test('should clean up on unmount', () => {
    const { unmount } = render(
      <Portal>
        <div data-testid="cleanup-test">Content</div>
      </Portal>
    );

    expect(screen.getByTestId('cleanup-test')).toBeInTheDocument();

    unmount();

    expect(screen.queryByTestId('cleanup-test')).not.toBeInTheDocument();
  });
});

describe('Modal', () => {
  test('should not render when isOpen is false', () => {
    render(
      <Modal isOpen={false} onClose={() => {}}>
        <div data-testid="modal-content">Content</div>
      </Modal>
    );

    expect(screen.queryByTestId('modal-content')).not.toBeInTheDocument();
  });

  test('should render when isOpen is true', () => {
    render(
      <Modal isOpen={true} onClose={() => {}}>
        <div data-testid="modal-content">Content</div>
      </Modal>
    );

    expect(screen.getByTestId('modal-content')).toBeInTheDocument();
  });

  test('should call onClose when backdrop clicked', () => {
    const onClose = jest.fn();
    
    render(
      <Modal isOpen={true} onClose={onClose} closeOnBackdrop={true}>
        <div data-testid="modal-content">Content</div>
      </Modal>
    );

    const backdrop = screen.getByTestId('modal-content').parentElement?.parentElement;
    if (backdrop) {
      fireEvent.click(backdrop);
      expect(onClose).toHaveBeenCalled();
    }
  });

  test('should not close when clicking modal content', () => {
    const onClose = jest.fn();
    
    render(
      <Modal isOpen={true} onClose={onClose}>
        <div data-testid="modal-content">Content</div>
      </Modal>
    );

    fireEvent.click(screen.getByTestId('modal-content'));
    expect(onClose).not.toHaveBeenCalled();
  });

  test('should call onClose on Escape key', () => {
    const onClose = jest.fn();
    
    render(
      <Modal isOpen={true} onClose={onClose} closeOnEscape={true}>
        <div>Content</div>
      </Modal>
    );

    fireEvent.keyDown(document, { key: 'Escape' });
    expect(onClose).toHaveBeenCalled();
  });

  test('should render compound components', () => {
    render(
      <Modal isOpen={true} onClose={() => {}}>
        <Modal.Header>
          <span data-testid="header">Header</span>
        </Modal.Header>
        <Modal.Body>
          <span data-testid="body">Body</span>
        </Modal.Body>
        <Modal.Footer>
          <span data-testid="footer">Footer</span>
        </Modal.Footer>
      </Modal>
    );

    expect(screen.getByTestId('header')).toBeInTheDocument();
    expect(screen.getByTestId('body')).toBeInTheDocument();
    expect(screen.getByTestId('footer')).toBeInTheDocument();
  });
});

