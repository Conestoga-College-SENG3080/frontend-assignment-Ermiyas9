

import { Center, Box } from '@mantine/core';

export default function Layout({ children }: { children: React.ReactNode }) {

  // This is a simple layout component that wraps around the main content of the app.
  // i am going to use it to add a header and some padding around the main content.
  return (
    <div style={{ padding: "20px" }}>
      <header style={{ marginBottom: "20px" }}>
        <Center h={100}>
          <Box bg="var(--mantine-color-blue-light)"p="md"style={{ padding: "100px", borderRadius: "8px", fontWeight: 600,fontSize: "20px",}}>
            Credit - App
          </Box>
        </Center>
      </header>

      <main>{children}</main>
    </div>
  );
}
