// src/App.tsx
import { Routes, Route } from "react-router-dom";
import Layout from "./Layout";

import ForumBrowserPage from "./Pages/ForumBrowserPage";
import FavouritesPage from "./Pages/FavouritesPage";

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<ForumBrowserPage />} />
        <Route path="/favourites" element={<FavouritesPage />} />

      </Routes>
    </Layout>
  );
}