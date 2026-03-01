// src/pages/FavouritesPage.tsx
import { Text, Stack, Card } from '@mantine/core';
import { useState, useEffect } from "react";

export default function FavouritesPage() {

  const username = import.meta.env.VITE_API_USERNAME;

  // first i am saving the favourite posts in local state, that comes from forum browser page then  
  // i will load them from local storage and display them in this page
  const [favoritePosts, setFavoritePosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // this use effect will run when the component mounts and load the favourite posts from local storage
  useEffect(() => {
    loadFavorites();
  }, []);

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


  // This page will show posts the user has saved as favourites.
  return (
    <Stack gap="md">
      <Text fw={600} size="lg">{username}'s Favourites</Text>

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
            Likes: {post.score ?? 0}
          </Text>
        </Card>
      ))}
    </Stack>
  );
}
