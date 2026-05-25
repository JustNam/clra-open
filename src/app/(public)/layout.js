export default function PublicLayout({ children }) {
  return (
    <main style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
      {children}
    </main>
  )
}
