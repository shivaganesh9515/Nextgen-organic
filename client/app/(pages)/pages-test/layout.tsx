export default function PagesTestLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <h2>Pages Test Layout</h2>
      {children}
    </div>
  );
}