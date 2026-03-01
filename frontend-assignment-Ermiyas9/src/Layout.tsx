/* ================================================================================================================================== */
/* FILE           : Layout.tsx                                                                                                        */
/* PROJECT        : Frontend Programming Assignment                                                                                   */
/* PROGRAMMER     : Ermiyas Gulti                                                                                                     */  
/* FIRST VERSION  : 2024-06-01                                                                                                        */
/* DESCRIPTION    : This file contains the Layout component, which provides a consistent structure and styling .                      */
/*                : for all pages in the application It includes a header with the application title and user information,            */
/*                : and renders the child components passed to it. The layout is designed to be responsive and visually appealing,    */
/*                : using Mantine components for styling.                                                                             */
/* ================================================================================================================================== */

// importing necessary components and hooks from React, React Router, and the Layout component for consistent page structure.
import React from "react"; 
import { Container, Paper, Title, Text } from "@mantine/core";


/* FUNCTION     : Layout
 * DESCRIPTION  : This component provides a consistent structure and styling for all pages in the application. 
 *              : It includes a header with the application title and user information, 
 *              : and renders the child components passed to it. The layout is designed to be responsive and visually appealing, 
 *              : using Mantine components for styling and also it helpsss to display student info in every page.
 * PARAMETERS   : children - The child components to be rendered within the layout
 * RETURNS      : JSX.Element - The rendered component
*/
export default function Layout({ children }: { children: React.ReactNode }) {

  // using environment variable to get the student ID, this is set in the .env file
  const username = import.meta.env.VITE_API_USERNAME;
  const studentID = import.meta.env.VITE_API_PASSWORD;

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