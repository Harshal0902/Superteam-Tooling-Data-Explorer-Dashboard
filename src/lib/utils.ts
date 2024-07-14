import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { Metadata } from 'next'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function constructMetadata({
  title = 'SolScope',
  description = 'Track and explore Solana transactions, NFTs, tokens, and account details effortlessly with SolScope.',
  image = '/assets/thumbnails/thumbnail.png',
  icons = '/favicon.ico',
  noIndex = false
}: {
  title?: string
  description?: string
  image?: string
  icons?: string
  noIndex?: boolean
} = {}): Metadata {
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [
        {
          url: image
        }
      ]
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
      creator: '@SolScope'
    },
    icons,
    metadataBase: new URL('https://solscope.vercel.app'),
    ...(noIndex && {
      robots: {
        index: false,
        follow: false
      }
    })
  }
}
