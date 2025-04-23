import mockThreads from '../data/mockThreads';

// Simple match based on tags and keywords
export const getAIResults = async (query) => {
  const q = query.toLowerCase();

  const matched = mockThreads.filter(thread =>
    thread.tags.some(tag => q.includes(tag)) ||
    thread.title.toLowerCase().includes(q) ||
    thread.content.toLowerCase().includes(q)
  );

  return matched.map(t => ({
    ...t,
    summary: t.content.slice(0, 100) + '...',
    why: `Matched based on tags or keywords: ${t.tags.filter(tag => q.includes(tag)).join(', ') || 'relevance'}`
  }));
};
