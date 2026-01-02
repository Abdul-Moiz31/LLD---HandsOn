import React, { useEffect, useState, useCallback } from 'react';
import { createPortal } from 'react-dom';

/**
 * Portal component that renders children into a DOM node outside the parent hierarchy.
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Content to render
 * @param {HTMLElement} props.container - Target container (default: document.body)
 */
function Portal({ children, container }) {
  // TODO: Implement your solution here
}

/**
 * Modal component with backdrop and compound components.
 * @param {Object} props - Component props
 * @param {boolean} props.isOpen - Whether modal is visible
 * @param {Function} props.onClose - Close handler
 * @param {React.ReactNode} props.children - Modal content
 * @param {boolean} props.closeOnBackdrop - Close when clicking backdrop (default: true)
 * @param {boolean} props.closeOnEscape - Close on Escape key (default: true)
 */
function Modal({ 
  isOpen, 
  onClose, 
  children, 
  closeOnBackdrop = true, 
  closeOnEscape = true 
}) {
  // TODO: Implement your solution here
}

/**
 * Modal Header component
 */
Modal.Header = function ModalHeader({ children }) {
  // TODO: Implement your solution here
};

/**
 * Modal Body component
 */
Modal.Body = function ModalBody({ children }) {
  // TODO: Implement your solution here
};

/**
 * Modal Footer component
 */
Modal.Footer = function ModalFooter({ children }) {
  // TODO: Implement your solution here
};

export { Portal, Modal };

