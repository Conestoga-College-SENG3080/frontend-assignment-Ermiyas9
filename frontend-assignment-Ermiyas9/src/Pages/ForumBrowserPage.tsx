/* ============================================================================================================================ */
/* FILE             : ForumBrowserPage.tsx                                                                                      */
/* PROJECT          : Forum Browser Web Application                                                                             */
/* NAMESPACE        : src/pages                                                                                                 */
/* PROGRAMMER       : Ermiyas Gulti                                                                                             */
/* FIRST VERSION    : 2026-03-01                                                                                                */
/* DESCRIPTION      : This file contains the ForumBrowserPage component, which allows users to browse forums and view posts.    */
/*                  : It includes functionality to load posts from a specified forum, display them in a user-friendly format,   */
/*                  : and add or remove posts from the user's favorites. The component also handles API authentication          */
/*                  : and display error messages.                                                                               */
/* =============================================================================================================================*/


// Importing necessary components and hooks from React, Mantine, and React Router. Also importing images for the favorite button states.
import { useState } from "react";
import { Card, Text, Stack, Button } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import favorited from "../assets/favorited.png";
import unfavorited from "../assets/unfavorited.png";


/*
  * FUNCTION     : ForumBrowserPage
  * DESCRIPTION  : This Function allows users to browse forums and view posts. It includes functionality to load posts from a specified forum, 
  *              : display them in a user-friendly format, and add or remove posts from the user's favorites. itt aslo handles API 
  *              : authentication and display error messages.
*/
export default function ForumBrowserPage() {

  const [forumName, setForumName] = useState("");
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const username = import.meta.env.VITE_API_USERNAME;
  const password = import.meta.env.VITE_API_PASSWORD;
  const baseURL = import.meta.env.VITE_API_URL;

  //const token = localStorage.getItem("token");

  // this is the post filter to sort by hot and limit to 10 posts, it will be appended to the API endpoint when fetching posts
  const postFilter = "?sort=hot&limit=10";

  /*
  * FUNCTION     : fetchToken
  * DESCRIPTION  : This function will authenticating the user and retrieving an access token from the API. 
  *              : It sends a POST request to the login endpoint with the username and password, and if successful, 
  *              : it saves the token in local storage for use in subsequent API requests.
  * PARAMETERS   : None
  * RETURNS      : Promise<string | null> - The access token if successful, or null if there was an error
  */
  async function fetchToken() {
    try {
      const response = await fetch(`${baseURL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      // Read response as text first for debugging
      const text = await response.text();
      console.log("Login status:", response.status);
      console.log("Login response body:", text);

      // Try to parse JSON from text
      let data;
      try {
        data = JSON.parse(text);
      } catch (err) {
        console.error("Failed to parse login response JSON:", err);
        setError("Failed to parse login response. Check console for details.");
        return null;
      }

      if (!response.ok) {
        setError(`Failed to get token. ${data.message || text}`);
        return null;
      }

      // here im saving the token in local storage
      localStorage.setItem("token", data.access_token);
      return data.access_token;
    } catch (err) {
      console.error(err);
      setError("Failed to get token. Check console for details.");
      return null;
    }
  }

  // stoting favorites in local state so i cann easly check if the post is favorited or not.
  const [favorites, setFavorites] = useState<string[]>(() => {
    const stored = localStorage.getItem("favorites");
    return stored ? JSON.parse(stored) : [];
  });


  /*
  * FUNCTION     : loadForumPosts
  * DESCRIPTION  : This function loads posts from the specified forum. It first authenticates the user to get an access token, 
  *              :  then it fetches the top 10 hot posts from the forum using the API. The function handles errors, 
  *              :   displaying appropriate messages if the forum is not found or if there are issues with the API request.
  * PARAMETERS   : None
  * RETURNS      : void
  */
  async function loadForumPosts() {
    if (!forumName) return;
    setLoading(true);
    setError(null);

    try {
      // Remove any old token before fetching a new one
      localStorage.removeItem("token");

      // Get token from API
      const apiToken = await fetchToken();
      if (!apiToken) {
        setLoading(false);
        return;
      }

      // here we fetch the posts from the API using the forum name and the post filter (sort by hot and limit to 10 posts)
      // encode helps to safely include forum names with spaces or special characters in the URL
      const url = `${baseURL}/forums/${encodeURIComponent(forumName)}${postFilter}`;
      console.log("Requesting:", url);

      const response = await fetch(url, {
        headers: {
          Authorization: `Bearer ${apiToken}`,
          Accept: "application/json",
        },
      });

      console.log("Status:", response.status, response.statusText);

      // read raw text first so we can log helpful error bodies for debugging
      const text = await response.text();
      console.log("Response body:", text);

      if (!response.ok) {
        const serverMessage = text ? ` — ${text}` : "";
        setError(`Forum "${forumName}" not found or API endpoint is incorrect.${serverMessage}`);
        setPosts([]);
        setLoading(false);
        return;
      }

      // parse the JSON returned from the forum endpoint
      const data = JSON.parse(text);

      // the forum endpoint already returns full post objects
      // so we do not need to fetch posts by ids again
      setPosts(data);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setError("Failed to load posts. Check console for details.");
      setPosts([]);
      setLoading(false);
    }
  }

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "left",
        padding: "20px",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "500px",
          textAlign: "left",
          marginBottom: "40px",
        }}
      >
        <Text fw={700} fz="2.0rem">
          Welcome to Browse a Forum, {username}
        </Text>
        <Text c="dimmed" mt="xs">
          Enter a forum name to load the top 10 hot posts. You can also save posts to your favorites and view them on the favorites page.
        </Text>
      </div>

      <Stack gap="md" align="center" style={{ width: "100%", maxWidth: "500px" }}>
        <div
          style={{
            padding: "20px",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            gap: "10px",
          }}
        >
          <label style={{ fontWeight: 600, fontSize: "20px", marginBottom: "5px" }}>
            Forum name
          </label>
          <input
            type="text"
            placeholder="Enter forum name (e.g., 'funny', 'showerthoughts', 'music', 'aww',...)"
            value={forumName}
            onChange={(e) => setForumName(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") loadForumPosts();
            }}
            style={{
              padding: "12px 15px",
              fontSize: "16px",
              height: "50px",
              width: "100%",
              borderRadius: "8px",
              border: "1px solid #ccc",
              boxSizing: "border-box",
              outline: "none",
              transition: "border-color 0.2s",
            }}
          />
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "20px",
            marginTop: "20px",
            width: "100%",
          }}
        >
          <Button
            onClick={loadForumPosts}
            disabled={loading}
            style={{
              padding: "12px 20px",
              borderRadius: "8px",
              border: "none",
              backgroundColor: "#4CAF50",
              color: "white",
              fontSize: "16px",
              cursor: loading ? "not-allowed" : "pointer",
              width: "250px",
              height: "50px",
              transition: "background-color 0.2s",
            }}
          >
            {loading ? "Loading…" : "Load Top 10 Hot Posts"}
          </Button>

          <Button
            onClick={() => navigate("/favourites")}
            style={{
              padding: "12px 20px",
              borderRadius: "8px",
              border: "none",
              backgroundColor: "#4CAF50",
              color: "white",
              fontSize: "16px",
              width: "250px",
              height: "50px",
              cursor: "pointer",
              transition: "background-color 0.2s",
            }}
          >
            Favorites
          </Button>
        </div>

        {error && (
          <Text c="red" size="sm">
            {error}
          </Text>
        )}

        {posts.length > 0 ? (
          posts.map((post) => {
            // this is where we check if the post is in the favorites list, we get the favorites from local storage and check if the post id is in the favorites array
            const isFavorite = favorites.includes(post.id);
            console.log("Fetched post:", post);

            return (
              <Card
                key={post.id}
                shadow="sm"
                padding="lg"
                radius="md"
                withBorder
                style={{ width: "100%" }}
              >
                <Text fw={600} size="lg">
                  {post.title}
                </Text>
                <Text size="sm" mt="xs">
                  {post.content}
                </Text>
                <Text size="sm" c="dimmed" mt="sm">
                  Author: {post.author || "Unknown"}
                </Text>
                <Text size="sm" c="dimmed">
                  Likes: {post.totalLikes ?? 0}
                </Text>

                {/* then i add fav button here  */}
                <Button
                  mt="md"
                  style={{
                    // so the button will be yellow if the post is in favorites and green if not
                    paddingBottom: "0.5rem",
                    paddingTop: "0.5rem",
                    backgroundColor: isFavorite ? "yellow" : "#4CAF50",
                    color: isFavorite ? "black" : "white",
                  }}
                  onClick={() => {
                    let updated: string[];
                    if (isFavorite) {
                      updated = favorites.filter((id) => id !== post.id);
                    } else {
                      updated = [...favorites, post.id];
                    }
                    setFavorites(updated);
                    localStorage.setItem("favorites", JSON.stringify(updated));
                  }}
                >
                  <img
                    src={isFavorite ? favorited : unfavorited}
                    alt={isFavorite ? "Favorited" : "Add to Favorites"}
                    style={{ width: "16px", height: "16px", paddingRight: "8px" }}
                  />
                  {isFavorite ? "Favorited" : "Add to Favorites"}
                </Button>
              </Card>
            );
          })
        ) : (
          <div style={{ padding: "20px 20px" }}>
            <Text c="dimmed" ta="center" mt="xl">
              No posts to display. Search for a forum to begin.
            </Text>
          </div>
        )}
      </Stack>
    </div>
  );
}