import { Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import LoginPage from "./Pages/LoginPage";
import ForumBrowserPage from "./Pages/ForumBrowserPage";

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<ForumBrowserPage />} />
        <Route path="/login" element={<LoginPage />} />

      </Routes>
    </Layout>
  );
}
