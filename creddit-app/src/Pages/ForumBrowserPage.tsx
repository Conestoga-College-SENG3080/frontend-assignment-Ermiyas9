import {Card, Text, Stack } from '@mantine/core';

export default function ForumBrowserPage() {

    const AuthorName = "Ermi";
    const StudentID = "0000";

  return (
    <Stack gap="md">
  
      {/* This is a simple forum browser page that displays a list of posts. 
      Each post is displayed as a card with the title, author, and student ID. will be updated later */}
      <Card shadow="sm" padding="lg" radius="md" withBorder>
        <Text fw={500}>The Title of the Post</Text>
      <Text size="sm" c="dimmed">Author: {AuthorName}</Text>
        <Text size="sm" c="dimmed">Student ID : {StudentID}</Text>
      </Card>

      <Card shadow="sm" padding="lg" radius="md" withBorder>
        <Text fw={500}>Another Post Title</Text>
        <Text size="sm" c="dimmed">Author: {AuthorName}</Text>
        <Text size="sm" c="dimmed">Student ID : {StudentID}</Text>
      </Card>
    </Stack>
  );
}
