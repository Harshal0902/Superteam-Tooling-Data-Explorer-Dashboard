import React from 'react'
import Image from 'next/image'

export default function Footer() {
    return (
        <div className='flex flex-1 flex-wrap flex-row items-center justify-center py-2 text-xl'>Code with <span><Image src='/assets/footer/love.png' alt='love' width='30' height='30' className='px-0.5' /></span>, <span><Image src='/assets/footer/next-js.svg' alt='next-js' width='25' height='25' className='mx-0.5 border border-white rounded-full' /></span> and <span><Image src='/assets/footer/typescript.svg' alt='typescript' width='25' height='25' className='px-0.5' /></span> by&nbsp;<a href='https://harshal09.vercel.app/' target='_blank' className='font-semibold underline'>Harshal Raikwar</a></div>
    )
}
