import React from 'react';
import { Layout } from './components/Layout/Layout';
import { Header } from './components/Header';
import { Features } from './components/Features';

function App() {
  return (
    <Layout>
      <Header />
      <Features />
    </Layout>
  );
}

export default App;