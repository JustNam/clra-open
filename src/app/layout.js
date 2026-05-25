import { AuthProvider } from '@/components/AuthProvider'
import '@/styles/globals.css'

export const metadata = {
  title: 'CLRA',
  description: 'User research platform',
}

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <body>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  )
}
