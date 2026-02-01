import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Msg2ai Notes - Conference Networking Made Easy',
  description: 'Take notes, scan business cards, and generate AI-powered follow-up reports. Never lose a conference contact again.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}