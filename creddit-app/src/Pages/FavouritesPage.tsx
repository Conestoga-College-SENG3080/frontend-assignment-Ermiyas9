// src/pages/FavouritesPage.tsx
import { Card, Text, Stack } from '@mantine/core';

export default function FavouritesPage() {

    const AuthorName = "Ermi";
    const Title = "bla bla bla  bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla";
    const PostId = "091";


  // This page will show posts the user has saved as favourites.
  return (
    <Stack gap="md">
      <Text fw={600} size="lg">{AuthorName}'s Favourites</Text>

      <Card shadow="sm" padding="lg" radius="md" withBorder>
        <Text fw={500}>{Title}</Text>
      </Card>

      <Card shadow="sm" padding="lg" radius="md" withBorder>
        <Text size="sm" c="dimmed">Post ID: {PostId}</Text>
      </Card>
    </Stack>
  );
}
