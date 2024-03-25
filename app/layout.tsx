import "@measured/puck/puck.css";
import "./styles.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body id="body-root">{children}</body>
    </html>
  );
}
