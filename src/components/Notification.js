import React from 'react';
import { Alert } from 'react-bootstrap';

const Notification = ({ message, variant }) => {
  return (
    <Alert variant={variant} className="mt-3">
      {variant === "success" ? "🔔" : "❌"} {message}
    </Alert>
  );
};

export default Notification;
