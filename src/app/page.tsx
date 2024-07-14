"use client"

import React, { Suspense } from 'react'
import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import { Spotlight } from '@/components/ui/spotlight'
import { ContainerScroll } from '@/components/ui/container-scroll-animation'
import Image from 'next/image'

interface Feature {
  logo: string;
  title: string;
  description: string;
}

const features: Feature[] = [
  {
    logo: 'clock',
    title: 'Real-Time Transaction Tracking',
    description: 'Instantly monitor and review all your Solana transactions with up-to-the-minute accuracy.'
  },
  {
    logo: 'pic',
    title: 'Comprehensive NFT Insights',
    description: 'Dive deep into your NFT portfolio with detailed information and analytics.'
  },
  {
    logo: 'money',
    title: 'Token Portfolio Management',
    description: 'Keep track of all your tokens in one place, with easy access to balance and performance metrics.'
  },
  {
    logo: 'performance',
    title: 'Account Overview',
    description: 'Get a complete overview of your account details, including transaction history and asset holdings.'
  },
]

const FeatureCard: React.FC<Feature> = ({ logo, title, description }) => (
  <div className='relative w-64 p-6 my-4 bg-gray-200 shadow-xl rounded-3xl'>
    <div className='absolute flex items-center p-3 rounded-full shadow-xl bg-gradient-to-r from-[#61cb55] to-[#0eda07] left-4 -top-8'>
      <Image src={`/assets/home/${logo}.svg`} height={50} width={50} quality={100} alt='img' className='p-1' />
    </div>
    <div className='mt-8 text-gray-800'>
      <p className='my-2 text-xl font-semibold'>{title}</p>
      <div className='flex space-x-2 font-medium text-basic'>
        <p>{description}</p>
      </div>
    </div>
  </div>
);

export default function Page() {
  return (
    <Suspense fallback='loading'>
      <div className='md:h-[30rem] w-full flex md:items-center md:justify-center antialiased bg-grid-white/[0.02] relative overflow-hidden'>
        <Spotlight
          className='-top-40 -left-10 md:-left-32 md:-top-20 h-screen'
          fill='white'
        />
        <Spotlight
          className='h-[80vh] w-[50vw] top-10 left-full'
          fill='purple'
        />
        <Spotlight className='left-80 top-28 h-[80vh] w-[50vw]' fill='blue' />
        <div className=' p-4 max-w-7xl  mx-auto relative z-10  w-full pt-8 md:pt-0'>
          <h1 className='text-4xl md:text-6xl font-bold pb-4 text-center bg-clip-text dark:text-transparent dark:bg-gradient-to-b dark:from-neutral-50 dark:to-neutral-400 bg-opacity-50'>
            SolScope <br /> <span className='italic'>Your Gateway to Solana Insights</span>
          </h1>
          <p className='pt-4 font-normal text-xl dark:text-neutral-300 max-w-4xl text-center mx-auto'>
            Track and analyze your Solana transactions, NFTs, and tokens effortlessly. Access comprehensive and real-time account details at a glance. <br />
            Easily monitor all your Solana assets with our user-friendly interface.
          </p>
        </div>
      </div>

      <MaxWidthWrapper>
        <div className='flex flex-col overflow-hidden'>
          <ContainerScroll
            titleComponent={
              <>
                <h1 className='text-4xl font-semibold'>
                  Explore Solana<br />
                  <span className='text-4xl md:text-[6rem] font-bold mt-1 leading-none'>
                    with Ease
                  </span>
                </h1>
              </>
            }>
            <Image src='/assets/thumbnails/thumbnail.png' width={800} height={200} alt='img' className='mx-auto rounded-2xl object-cover w-full h-full object-left-top' />
          </ContainerScroll>
        </div>

        <div>
          <div className='my-12 text-center'>
            <h1 className='text-4xl font-bold leading-10 sm:text-5xl sm:leading-none md:text-6xl'>Features</h1>
          </div>

          <div className='flex items-center justify-center pb-8 w-full'>
            <div className='grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
              {features.map((feature, index) => (
                <FeatureCard key={index} {...feature} />
              ))}
            </div>
          </div>
        </div>
      </MaxWidthWrapper>
    </Suspense>
  )
}
