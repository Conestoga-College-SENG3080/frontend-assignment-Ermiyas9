/* ============================================================================================================================ */
/* FILE         : App.tsx                                                                                                       */
/* PROJECT      : Frontend Programming Assignment                                                                               */
/* PROGRAMMER   : Ermiyas Gulti                                                                                                 */
/* FIRST VERSION: 2024-06-01                                                                                                    */
/* DESCRIPTION  : This file serves as the main entry point for the React application. It sets up the routing for                */
/*                : the application using React Router, defining the routes for the forum browser page and the favourites page. */ 
/*                : The Layout component is used to provide a consistent structure across all pages.                            */
/* ============================================================================================================================ */


// importing necessary components and hooks from React, React Router, and the Layout component for consistent page structure.
import { Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import ForumBrowserPage from "./Pages/ForumBrowserPage";
import FavouritesPage from "./Pages/FavouritesPage";


/* FUNCTION   : App
 * DESCRIPTION  : This is the main component of the application. It sets up the routing for the application using React Router, 
 *              : defining the routes for the forum browser page and the favourites page. 
 *              : The Layout component is used to provide a consistent structure across all pages.
 * PARAMETERS   : None
 * RETURNS      : JSX.Element - The rendered component
*/
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