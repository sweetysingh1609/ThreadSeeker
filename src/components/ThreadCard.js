// src/components/ThreadCard.js
import React from 'react';
import { Card, Badge, Button } from 'react-bootstrap';
import { motion } from 'framer-motion';

function ThreadCard({ thread, onSave, onTagClick }) {
  return (
    <motion.div
      className="mb-3"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, type: 'spring' }}
    >
      <Card className="mb-3 shadow-sm">
        <Card.Body>
          <Card.Title>{thread.title}</Card.Title>
          <Card.Text>{thread.summary}</Card.Text>
          <p><span role="img" aria-label="brain">🧠</span> <strong>Why this?</strong> {thread.why}</p>
          <div className="mb-2">
{thread.tags.map(tag => (
  <motion.div
    key={tag}
    whileTap={{ scale: 0.9 }}
    whileHover={{ scale: 1.1 }}
    style={{ display: 'inline-block' }}
  >
    <Badge
      bg="info"
      className="me-1 mb-1"
      style={{ cursor: 'pointer' }}
      onClick={() => onTagClick(tag)}
    >
      #{tag}
    </Badge>
  </motion.div>
))}



          </div>
          <Button size="sm" variant="outline-success" onClick={() => onSave(thread)}>
            💾 Save for later
          </Button>
        </Card.Body>
      </Card>
    </motion.div>
  );
}

export default ThreadCard;
