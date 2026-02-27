// src/Layout.tsx
import React from "react";

export default function Layout({ children }: { children: React.ReactNode }) {

  // This is a simple layout component that wraps around the main content of the app.
  // i am going to use it to add a header and some padding around the main content.
  return (
    <div style={{ padding: "20px" }}>
      <header
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginBottom: "20px",
          marginTop: "0px",
        }}
      >
        <div
          style={{
            padding: "20px 40px",
            borderRadius: "8px",
            fontWeight: 700,
            fontSize: "40px",
            textAlign: "center",
          }}
        >
          Credit - App
        </div>
      </header>

      <main>{children}</main>
    </div>
  );
}
