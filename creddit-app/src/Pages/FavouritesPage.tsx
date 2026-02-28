// src/pages/FavouritesPage.tsx
import { Card, Text, Stack } from '@mantine/core';

export default function FavouritesPage() {

  const username = localStorage.getItem("username");




  // This page will show posts the user has saved as favourites.
  return (
    <Stack gap="md">
      <Text fw={600} size="lg">{username}'s Favourites</Text>
    </Stack>
  );
}
