import { useState } from "react";
import { Card, Text, Stack, TextInput, Button } from "@mantine/core";

export default function ForumBrowserPage() {
  const [forumName, setForumName] = useState("");
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // user name and user password(StudentID) are saved in the local storage after login,
  // so we can use them to display the username in the forum browser page
  const username = localStorage.getItem("username");
  const StudentID = localStorage.getItem("password");

  // This is the base URL for the API, the token and the post
  const formBrowseAPIURL = "https://awf-api.lvl99.dev";
  const token = localStorage.getItem("token");


  // this is the post filter to sort by hot and limit to 10 posts, it will be appended to the API endpoint when fetching posts
  const postFilter = "?sort=hot&limit=10";

  async function loadForumPosts() {
  if (!forumName) return;

  // reset state before loading new posts
  setLoading(true);

  // this will clear any previous error message when we start loading new posts, so the user won't be confused by old error messages when they try to load a new forum
  setError(null);

  try {
    // here we fetch the posts from the API using the forum name and the post filter (sort by hot and limit to 10 posts)
    const forumAPICallURl = `${formBrowseAPIURL}/forums/${encodeURIComponent(forumName)}${postFilter}`;
    console.log("Requesting:", forumAPICallURl);

    // this is the request for the API , includes token header i dont think we need to add MEthod GET. 
    const response = await fetch(forumAPICallURl, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    });

    console.log("Status:", response.status, response.statusText);

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

    // display the posts 
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
    <Stack gap="md">
      <Text fz="xl" fw={500}>
        Welcome to Browse a Forum, {username}
      </Text>

      <Text>Student ID {StudentID}</Text>

      <TextInput
        label="Forum name"
        placeholder="Eneter forum name (e.g., 'funny')"
        value={forumName}
        onChange={(e) => setForumName(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") loadForumPosts();
        }}
      />

      <Button onClick={loadForumPosts} disabled={loading}>
        {loading ? "Loading…" : "Load Top 10 Hot Posts"}
      </Button>

      {error && (
        <Text c="red" size="sm">
          {error}
        </Text>
      )}

      {posts.length > 0 ? (
        posts.map((post) => (
          <Card key={post.id} shadow="sm" padding="lg" radius="md" withBorder>
            <Text>{post.title}</Text>
            <Text size="sm" color="dimmed">
              {post.author} — {new Date(post.created_utc * 1000).toLocaleString()}
            </Text>
          </Card>
        ))
      ) : (
        <Text c="dimmed" ta="center" mt="xl">
          No posts to display. Search for a forum to begin.
        </Text>
      )}
    </Stack>
  );
}

