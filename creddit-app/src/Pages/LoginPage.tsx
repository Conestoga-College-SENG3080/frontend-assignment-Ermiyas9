// src/pages/LoginPage.tsx

// this file is for the login page of the app. It contains a form with two input fields for the student ID and password, 
// and a submit button. 
import { useState } from "react";

export default function LoginPage() {
  const [studentId, setStudentId] = useState("");
  const [studentPassword, setThePassword] = useState("");

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "80vh",
      }}
    >
      <form
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "12px",
          width: "320px",
          padding: "24px",
          border: "1px solid #ddd",
          borderRadius: "8px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
        }}
      >
        <h2 style={{ textAlign: "center", marginBottom: "8px" }}>Login</h2>

        <input
          type="text"
          placeholder="Student ID"
          value={studentId}
          onChange={(e) => setStudentId(e.target.value)}
          style={{
            padding: "10px",
            borderRadius: "6px",
            border: "1px solid #ccc",
            fontSize: "14px",
          }}
        />

        <input
          type="studentPassword"
          placeholder="studentPassword"
          value={studentPassword}
          onChange={(e) => setThePassword(e.target.value)}
          style={{
            padding: "10px",
            borderRadius: "6px",
            border: "1px solid #ccc",
            fontSize: "14px",
          }}
        />

        <button
          type="submit"
          style={{
            padding: "10px",
            borderRadius: "6px",
            border: "none",
            backgroundColor: "#007bff",
            color: "white",
            fontSize: "15px",
            cursor: "pointer",
          }}
        >
          Login
        </button>
      </form>
    </div>
  );
}
