import { Card, Text, Stack } from '@mantine/core';
import { useState } from 'react';

export default function ForumBrowserPage() {
  const [userName] = useState<string>(() => localStorage.getItem("username") || "");
  const [password] = useState<string>(() => localStorage.getItem("password") || "");

  return (
    <Stack gap="md">
      <Text fz="xl" fw={400}>
        Welcome{userName ? `, ${userName}` : ""}!
      </Text>

     {/* This is a simple forum browser page that displays a list of posts. 
      Each post is displayed as a card with the title, author, and student ID. will be updated later */}

      <Card shadow="sm" padding="lg" radius="md" withBorder>
        <Text fw={500}>The Title of the Post</Text>
        <Text size="sm" c="dimmed">Author: {userName}</Text>
        <Text size="sm" c="dimmed">Student ID: {password}</Text>
      </Card>

      <Card shadow="sm" padding="lg" radius="md" withBorder>
        <Text fw={500}>Another Post Title</Text>
        <Text size="sm" c="dimmed">Author: {userName}</Text>
        <Text size="sm" c="dimmed">Student ID: {password}</Text>
      </Card>
    </Stack>
  );
}
