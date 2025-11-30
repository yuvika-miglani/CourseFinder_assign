import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { DataProvider } from './context/DataContext';
import Layout from './components/Layout';
import Home from './pages/Home';
import View from './pages/View';
import Admin from './pages/Admin';
import Edit from './pages/Edit';

function App() {
  return (
    <DataProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="course/:courseId/topic/:topicId/subtopic/:subtopicId" element={<View />} />
            <Route path="admin" element={<Admin />} />
            <Route path="editor" element={<Edit />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </DataProvider>
  );
}

export default App;
