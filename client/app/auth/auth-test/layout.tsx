export default function AuthTestLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <h2>Auth Test Layout</h2>
      {children}
    </div>
  );
}