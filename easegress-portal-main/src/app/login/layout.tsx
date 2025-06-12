export default function LoginLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi">
      <body style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        {children}
      </body>
    </html>
  )
}
