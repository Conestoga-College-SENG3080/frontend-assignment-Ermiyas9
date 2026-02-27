import { Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import LoginPage from "./Pages/LoginPage";

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<LoginPage />} />
      </Routes>
    </Layout>
  );
}
