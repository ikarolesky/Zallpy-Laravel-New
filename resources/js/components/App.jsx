import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CooperatorList from './components/CooperatorList';
import CooperatorForm from './components/CooperatorForm';
import CooperatorView from './components/CooperatorView';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<CooperatorList />} />
        <Route path="/cooperados/create" element={<CooperatorForm />} />
        <Route path="/cooperados/:id" element={<CooperatorView />} />
      </Routes>
    </BrowserRouter>
  );
}
