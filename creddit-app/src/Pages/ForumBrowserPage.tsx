import { useState } from "react";
import { Card, Text, Stack, Button } from "@mantine/core";
import { useNavigate } from "react-router-dom";



export default function ForumBrowserPage() {
  const [forumName, setForumName] = useState("");
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

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

    setLoading(true);
    setError(null);

    try {
      // here we fetch the posts from the API using the forum name and the post filter (sort by hot and limit to 10 posts)
      // encode the forumName to avoid issues with spaces/special chars
      const url = `${formBrowseAPIURL}/forums/${encodeURIComponent(forumName)}${postFilter}`;
      console.log("Requesting:", url);

      const response = await fetch(url, {
        headers: {
          Authorization: `Bearer ${token}`,
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
  <div style={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "left", padding: "20px" }}>
  
    <div style={{ width: "100%", maxWidth: "500px", textAlign: "left", marginBottom: "40px" }}>
      <Text fz="2xl" fw={600}>
        Welcome to Browse a Forum, {username}
      </Text>
      <Text fz="md" color="dimmed">
        Student ID: {StudentID}
      </Text>
    </div>

 
    <Stack gap="md" align="center" style={{ width: "100%", maxWidth: "500px" }}>
      <div style={{ padding: "20px", width: "100%", display: "flex", flexDirection: "column", gap: "10px" }}>
        <label style={{ fontWeight: 600, fontSize: "20px", marginBottom: "5px" }}>Forum name</label>
        <input
          type="text"
          placeholder="Enter forum name (e.g., 'funny')"
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

    <div style={{ display: "flex", justifyContent: "center", gap: "20px", marginTop: "20px", width: "100%" }}>
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
        posts.map((post) => (
          <Card key={post.id} shadow="sm" padding="lg" radius="md" withBorder style={{ width: "100%" }}>
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
        ))
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