


export default function Layout({ children }: { children: React.ReactNode }) {

  // This is a simple layout component that wraps around the main content of the app.
  // i am going to use it to add a header and some padding around the main content.
  return (
    <div style={{ padding: "20px" }}>
      <header style={{ marginBottom: "20px" }}>
        <h1>Creddit App</h1>
      </header>

      <main>{children}</main>
    </div>
  );
}
