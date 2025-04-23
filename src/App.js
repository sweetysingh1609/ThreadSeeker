import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Form, Button, Nav } from 'react-bootstrap';
import mockThreadsData from './data/mockThreads';
import ThreadCard from './components/ThreadCard';
import Notification from './components/Notification';
import SavedThreads from './components/SavedThreads';

function App() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [saved, setSaved] = useState([]);
  const [notificationMsg, setNotificationMsg] = useState('');
  const [notificationVariant, setNotificationVariant] = useState('');
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('explore');
  const [mockThreads, setMockThreads] = useState(mockThreadsData);

  const handleSearch = () => {
    setLoading(true);
    setTimeout(() => {
      const filtered = mockThreads.filter(thread =>
        thread.title.toLowerCase().includes(query.toLowerCase()) ||
        thread.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase()))
      );
      setResults(filtered);
      setLoading(false);

      if (filtered.length > 0) {
        setNotificationMsg("You’ve got new curated threads!");
        setNotificationVariant("success");
      } else {
        setNotificationMsg("No threads found for your query 😕");
        setNotificationVariant("danger");
      }
    }, 1000);
  };

  const handleTagSearch = (tag) => {
    setQuery(tag);
    setLoading(true);
    setTimeout(() => {
      const filtered = mockThreads.filter(thread =>
        thread.tags.some(t => t.toLowerCase() === tag.toLowerCase()) ||
        thread.title.toLowerCase().includes(tag.toLowerCase())
      );
      setResults(filtered);
      setLoading(false);

      if (filtered.length > 0) {
        setNotificationMsg("You’ve got new curated threads!");
        setNotificationVariant("success");
      } else {
        setNotificationMsg("No threads found for this tag 😕");
        setNotificationVariant("danger");
      }
    }, 1000);
  };

  const handleSave = (thread) => {
    const alreadySaved = saved.find(item => item.id === thread.id);
    if (!alreadySaved) {
      setSaved([...saved, thread]);
      setNotificationMsg("Thread saved successfully!");
      setNotificationVariant("success");
    } else {
      setNotificationMsg("Thread is already saved!");
      setNotificationVariant("info");
    }
    setTimeout(() => {
      setNotificationMsg("");
    }, 2000);
  };

  const handleDelete = (index) => {
    const updated = saved.filter((_, i) => i !== index);
    setSaved(updated);
  };

  const extractTags = (text) => {
    const words = text.toLowerCase().match(/\b\w{4,}\b/g);
    const stopWords = ["this", "that", "with", "have", "from", "they", "your", "could", "about", "there"];
    const filtered = [...new Set((words || []).filter(word => !stopWords.includes(word)))];
    return filtered.slice(0, 5);
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      const text = e.target.result;
      const blocks = text.trim().split(/\n\s*\n/);
      const newThreads = blocks.map((block, index) => {
        const lines = block.split('\n');
        const title = lines[0] || `Untitled ${index + 1}`;
        const summary = lines.slice(1, 3).join(' ') || 'No summary available.';
        return {
          id: mockThreads.length + index + 1,
          title,
          summary,
          why: "Extracted from uploaded file",
          tags: extractTags(title + ' ' + summary)
        };
      });
      setMockThreads([...mockThreads, ...newThreads]);
      setNotificationMsg("Thread(s) added from uploaded file!");
      setNotificationVariant("success");
      setTimeout(() => {
        setNotificationMsg("");
      }, 2000);
    };

    if (file) reader.readAsText(file);
  };

  return (
    <div style={{ display: 'flex' }}>
      <Nav className="flex-column bg-light p-3" style={{ minHeight: '100vh', width: '250px' }}>
        <h4 className="mb-4">🧵 ThreadSeeker</h4>
        <Nav.Link onClick={() => setActiveTab('explore')}>Explore</Nav.Link>
        <Nav.Link onClick={() => setActiveTab('saved')}>Saved Threads</Nav.Link>
        <Nav.Link onClick={() => setActiveTab('upload')}>Upload</Nav.Link>
        <Nav.Link onClick={() => alert('Coming soon!')}>Settings</Nav.Link>
      </Nav>

      <Container className="my-5" style={{ flex: 1 }}>
        {notificationMsg && (
          <Notification message={notificationMsg} variant={notificationVariant} />
        )}

        {activeTab === 'explore' && (
          <>
            <Form className="mb-4 d-flex sticky-top bg-white p-3" style={{ zIndex: 1000 }}>
              <Form.Control
                type="text"
                placeholder="Search for threads..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <Button className="ms-2" onClick={handleSearch}>Search</Button>
            </Form>

            {loading && (
              <div className="text-center my-4">
                <div className="spinner-border text-info" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
                <div>Curating threads...</div>
              </div>
            )}

            {results.map(thread => (
              <ThreadCard key={thread.id} thread={thread} onSave={handleSave} onTagClick={handleTagSearch} />
            ))}
          </>
        )}

        {activeTab === 'saved' && (
          <SavedThreads saved={saved} onDelete={handleDelete} />
        )}

        {activeTab === 'upload' && (
          <div>
            <h4>Upload a Text File</h4>
            <Form.Group controlId="formFile" className="mb-3">
              <Form.Label>Select a .txt file to convert into threads</Form.Label>
              <Form.Control type="file" accept=".txt" onChange={handleFileUpload} />
            </Form.Group>
          </div>
        )}
      </Container>
    </div>
  );
}

export default App;
