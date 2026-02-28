// src/Layout.tsx
import React from "react";
import { Container, Paper, Title, Text } from "@mantine/core";

export default function Layout({ children }: { children: React.ReactNode }) {
  const username = "egulti";
  const studentID = "8744128";

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#f0f2f5",
        padding: "30px",
        fontFamily: "Inter, sans-serif",
      }}
    >
      <Container size="md">
        <Paper
          shadow="sm"
          p="lg"
          radius="md"
          style={{
            marginBottom: "30px",
            textAlign: "center",
            backgroundColor: "white",
          }}
        >
          <Title
            order={2}
            style={{
              padding: "10px",
              color: "#4CAF50",
              fontWeight: "bolder",
              fontSize: "30px",
              marginBottom: "10px",
            }}
          >
            Creddit App
          </Title>

          <Text size="lg" style={{ fontWeight: 500 }}>
            User: {username} &nbsp;|&nbsp; Student ID: {studentID || "N/A"}
          </Text>
        </Paper>

        <main>{children}</main>
      </Container>
    </div>
  );
}