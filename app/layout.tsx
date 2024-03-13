import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Hyper_elemnts in Latent Space',
  description: 'Generative P5 Sketch + Fal SDXL Turbo | concept and programming by Marlon Barrios Solano',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      
      <body className={inter.className}>{children}
      
      </body>
    </html>
  )
}
