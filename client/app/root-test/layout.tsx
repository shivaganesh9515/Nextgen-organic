export default function RootTestLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <h2>Root Test Layout</h2>
      {children}
    </div>
  );
}