// src/pages/LoginPage.tsx

// this file is for the login page of the app. It contains a form with two input fields for the student ID and password, 
// and a submit button. 
import { useState } from "react";
import { useNavigate } from "react-router-dom";



export default function LoginPage() {
  const [username, setusername] = useState("");
  const [password, setThePassword] = useState("");
  const loginAPI = "https://awf-api.lvl99.dev/auth/login"
  const navigate = useNavigate();

  async function handleLogin() {

   const response = await fetch(loginAPI, {
      method: "POST",
     headers: {
        "Content-Type": "application/json"
     },
        body: JSON.stringify({
          username: username,
          password: password
        }),

   })

   if (!response.ok) {
      alert("Invalid username or password")
      return
   }

   const data = await response.json()

   //  this will save the token so Layout so i can use it to fetch the posts and display them in the forum browser page
   localStorage.setItem("token", data.access_token)

   // so after login, the username and password will be saved in the local storage so 
   // i can use them to display the username in the forum browser page 
   localStorage.setItem("username", username);
   localStorage.setItem("password", password);


   // After login, go to forum browser page
   navigate("/ForumBrowserPage")

}

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
          value={username}
          onChange={(e) => setusername(e.target.value)}
          style={{
            padding: "10px",
            borderRadius: "6px",
            border: "1px solid #ccc",
            fontSize: "14px",
          }}
        />

        <input
          type="password"
          placeholder="password"
          value={password}
          onChange={(e) => setThePassword(e.target.value)}
          style={{
            padding: "10px",
            borderRadius: "6px",
            border: "1px solid #ccc",
            fontSize: "14px",
          }}
        />

        <button
          type="button"
          onClick={handleLogin}
          style={{
            padding: "10px",
            borderRadius: "6px",
            border: "none",
            backgroundColor: "#007bff",
            color: "white",
            fontSize: "15px",
            cursor: "pointer",
            width: "100%",
          }}
        >
          Login
        </button>
      </form>
    </div>
  );
}



