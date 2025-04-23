import React from 'react';
import { Button, Card } from 'react-bootstrap';

const SavedThreads = ({ saved, onDelete }) => {
  return (
    <div>
      <h4>Saved Threads</h4>
      {saved.map((thread, index) => (
        <Card key={index} className="mb-3">
          <Card.Body>
            <Card.Title>{thread.title}</Card.Title>
            <Card.Text>{thread.summary}</Card.Text>
            <Button variant="danger" onClick={() => onDelete(index)}>🗑 Delete</Button>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
};

export default SavedThreads;
