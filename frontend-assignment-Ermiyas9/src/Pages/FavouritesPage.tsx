/* ======================================================================================================================== */
/* FILE             : FavouritesPage.tsx                                                                                    */
/* PROJECT          : Frontend programming assignment                                                                       */
/* PROGRAMMER       : Ermiyas Gulti                                                                                         */
/* FIRST VERSION    : 2026-03-01                                                                                            */
/* DESCRIPTION      : This file contains the FavouritesPage component, which displays the user's favourite posts. It loads  */
/*                  : the favourite post IDs from local storage, fetches the post details from the API, and allows the user */ 
/*                  : to view and remove posts from their favourites.                                                       */
/* ======================================================================================================================== */


// importing necessary components and hooks from React, Mantine, and React Router. Also importing an image for the remove button.
import { Text, Stack, Card, Button } from '@mantine/core';
import { useState, useEffect } from "react";
import remove from "../assets/remove.png";
import { useNavigate } from "react-router-dom";


/*
 * FUNCTION     : FavouritesPage
 * DESCRIPTION  : This component displays the user's favourite posts. It loads the favourite post IDs from local storage, 
 *                fetches the post details from the API, and allows the user to view and remove posts from their favourites.
 * PARAMETERS   : None
 * RETURNS      : JSX.Element - The rendered component
*/
export default function FavouritesPage() {
  const username = import.meta.env.VITE_API_USERNAME;
  const navigate = useNavigate();

  // first i am saving the favourite posts in local state, that comes from forum browser page then  
  // i will load them from local storage and display them in this page
  const [favoritePosts, setFavoritePosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);


  /*
   * FUNCTION     : useEffect
   * DESCRIPTION  : This effect runs when the component mounts and loads the user's favourite posts by calling the loadFavorites function.
   * PARAMETERS   : None
   * RETURNS      : void
  */
  useEffect(() => {
    loadFavorites();
  }, []);


  /*
  * FUNCTION     : loadFavorites
  * DESCRIPTION  : This function loads the user's favourite posts. It retrieves the list of favourite post IDs from local storage, 
  *              : then fetches the details of each post from the API and saves them in local state to display on the page.
  * PARAMETERS   : None
  * RETURNS      : void
  */
  async function loadFavorites() {
    setLoading(true);
    setError(null);

    try {
      const stored = localStorage.getItem("favorites");
      if (!stored) {
        setFavoritePosts([]);
        setLoading(false);
        return;
      }

      const favoriteIds: string[] = JSON.parse(stored);
      if (favoriteIds.length === 0) {
        setFavoritePosts([]);
        setLoading(false);
        return;
      }

      const token = localStorage.getItem("token");

      // then fetch each post by id from the API and save them in local state to display in the page
      const posts: any[] = [];
      // then loop through the fav posts and save them in local state to display pr later to remove from fav. 
      for (const id of favoriteIds) {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/posts/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        });

        if (response.ok) {
          const post = await response.json();
          posts.push(post);
        }
      }

      setFavoritePosts(posts);
    } catch (err) {
      console.error(err);
      setError("Failed to load favorites. Check console.");
    } finally {
      setLoading(false);
    }
  }

  /*
   * FUNCTION     : removeFromFavorites
   * DESCRIPTION  : This function removes a post from the user's favourites. It updates the local state 
   *              : and also updates the list of favourite post IDs in local storage.
   * PARAMETERS   : postId - The ID of the post to remove from favourites
   * RETURNS      : void
  */
  function removeFromFavorites(postId: string) {
    const updated = favoritePosts.filter((p) => p.id !== postId);
    setFavoritePosts(updated);

    const stored = localStorage.getItem("favorites");
    if (stored) {
      const ids: string[] = JSON.parse(stored).filter(
        (id: string) => id !== postId
      );
      localStorage.setItem("favorites", JSON.stringify(ids));
    }
  }

  // if the page is loading show loading text, if there is an error show error message, otherwise show the favourite posts.
  if (loading) return <Text>Loading favourites…</Text>;
  if (error) return <Text c="red">{error}</Text>;

  // This page will show posts the user has saved as favourites.
  return (
    <Stack gap="md">
      <Text fw={700} fz="2.0rem">
        {username}'s Favourites
      </Text>

      <div style={{ display: "flex", justifyContent: "center" }}>
        <Button
          mt="md"
          style={{
            paddingBottom: "0.5rem",
            paddingTop: "0.5rem",
            backgroundColor: "#4CAF50",
            color: "white",
          }}
          onClick={() => navigate("/")}
        >
          Go to Forum
        </Button>
      </div>

      {loading && <Text>Loading favourites…</Text>}
      {error && <Text c="red">{error}</Text>}

      {favoritePosts.length === 0 && !loading && (
        <Text c="dimmed">No favourite posts saved.</Text>
      )}

      {favoritePosts.map((post) => (
        <Card key={post.id} shadow="sm" padding="lg" radius="md" withBorder>
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

          <Button
            mt="md"
            color="red"
            style={{
              paddingBottom: "0.5rem",
              paddingTop: "0.5rem",
              color: "white",
              backgroundColor: "#4CAF50",
            }}
            onClick={() => removeFromFavorites(post.id)}
          >
            <img
              src={remove}
              alt="Remove from Favorites"
              style={{ width: "16px", height: "16px", paddingRight: "8px" }}
            />
            Remove from Favorites
          </Button>
        </Card>
      ))}
    </Stack>
  );
}