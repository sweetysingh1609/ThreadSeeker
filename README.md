# 🧵 ThreadSeeker — AI-Curated Social Content Explorer

ThreadSeeker is a sleek, semantic search app that helps you explore insightful threads from a mock database. Users can input natural language queries like:

> “Show me threads about AI ethics with humor”

...and ThreadSeeker will smartly return curated threads, including **summaries**, **explanations**, and **relevant tags**.

---

## 🚀 Live Demo

[🔗 View on Netlify (if hosted)](https://your-netlify-link.com)

---

## 💡 Features

- 🔍 **AI-like Semantic Search**  
  Input natural language queries and get intelligent results using smart keyword-matching logic.

- 🧠 **“Why This?” Relevance Insights**  
  Threads come with a short explanation of why they were shown for your search.

- 🏷️ **Interactive Tag Filtering**  
  Click any tag to instantly search all threads containing that topic.

- 💾 **Save for Later**  
  Favorite a thread to view it later under the “Saved Threads” section.

- 📤 **Upload `.txt` Files**  
  Convert your own text files into thread entries dynamically.

- 🔖 **Auto-Tag Generation**  
  Tags are automatically extracted from the uploaded text’s title and summary.

- 🔔 **Smart Notifications**  
  Get real-time feedback when you search, save, or upload threads.

- 🧭 **Sidebar Navigation**  
  Easily switch between Explore, Saved, Upload, and Settings.

- ✨ **Framer Motion Animations**  
  Smooth, elegant transitions on cards and notifications.

- 📦 **Bootstrap 5 Styling**  
  Clean, mobile-responsive layout using React-Bootstrap components.

- 🧪 **Basic Unit Testing**  
  Includes edge-case test coverage for search behavior.
---

## 💻 Local Setup

git clone https://github.com/sweetysingh1609/ThreadSeeker.git
cd threadseeker
npm install
npm start

## 📦 File Upload Guide

You can upload a `.txt` file under the **Upload** tab. The app will:

1. Use the **first line** as the thread title  
2. Use the **next 1–2 lines** as the summary  
3. Auto-tag using key words found in the title and summary

**Example `.txt` file:**

## Future plan
1. I wanted to make a Backend in python which would have algorithms like Huggingface’s, etc.
2. Then linking that python backend with this UI would boost the accuracy of this application even more.

## Challenges I Faced
1. Tag Filtering Logic
At first, tags were rendered as plain labels. Making them clickable to auto-trigger a search while preserving animations and showing a spinner took some finesse. Handling the search delay gracefully without a backend required simulating async logic properly.

2. Semantic Filtering
Simulating AI-curated results with only a static dataset was tricky. I had to write logic in search.js to approximate what an LLM would do — matching keywords in titles, tags, and partial summaries while still showing “Why this?” logic that felt intelligent.

3. Loader Integration
I initially tried to show a loader when the tag was clicked, but it conflicted with the synchronous nature of the mock data. I eventually simplified it to maintain a smooth experience.

4. UX Feedback
Creating a smooth, minimal, yet expressive interface took iteration. I chose Framer Motion for subtle animations and Bootstrap for clarity. Handling save/delete actions and alerts without cluttering the page required careful design.

5. Dynamic Thread Creation
Parsing .txt files, cleaning text, and turning it into UI-rich thread entries with tags and titles dynamically was non-trivial.


## 🛠️ Tech Stack

- **React.js**  
- **Bootstrap 5**  
- **Framer Motion** (animations)  
- **React-Bootstrap** (UI components)  
- **React Testing Library** + **Jest** (for tests)
