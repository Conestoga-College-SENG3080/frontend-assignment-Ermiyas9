import { Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import LoginPage from "./Pages/LoginPage";
import ForumBrowserPage from "./Pages/ForumBrowserPage";
//import FavouritesPage from "./Pages/FavouritesPage";

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/ForumBrowserPage" element={<ForumBrowserPage />} />

      </Routes>
    </Layout>
  );
}
