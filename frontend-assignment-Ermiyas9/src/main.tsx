/* ===========================================================================================================================  */
/* FILE         : src/main.tsx                                                                                                  */
/* PROJECT      : Frontend Programming Assignment                                                                               */
/* PROGRAMMER   : Ermiyas Gulti                                                                                                 */
/* FIRST VERSION: 2024-06-01                                                                                                    */
/* DESCRIPTION  : This file serves as the main entry point for the React application. It sets up the routing for                */
/*                : the application using React Router, defining the routes for the forum browser page and the favourites page. */ 
/*                : The Layout component is used to provide a consistent structure across all pages.                            */
/* ============================================================================================================================ */

// importing necessary components and hooks from React, React Router, and the Layout component for consistent page structure.
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { MantineProvider } from "@mantine/core";
import App from "./App";


/*
* FUNCTION   : main
* DESCRIPTION  : This is the main entry point of the application. It sets up the routing for the application using React Router, 
*              : defining the routes for the forum browser page and the favourites page. 
*              : The Layout component is used to provide a consistent structure across all pages.
* PARAMETERS   : None
* RETURNS      : void
*/
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter basename="/frontend-assignment-Ermiyas9/">
      <MantineProvider>
        <App />
      </MantineProvider>
    </BrowserRouter>
  </StrictMode>
);