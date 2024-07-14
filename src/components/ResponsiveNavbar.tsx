"use client"

import React, { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { Menu, X, Home, Image as ImageIcon, Coins, ArrowRightLeft } from 'lucide-react'
import Link from 'next/link'

export default function ResponsiveNavbar() {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [isClosing, setIsClosing] = useState<boolean>(false);
    const toggleOpen = () => {
        if (isOpen) {
            setIsClosing(true);
            setTimeout(() => {
                setIsOpen(false);
                setIsClosing(false);
            }, 300);
        } else {
            setIsOpen(true);
        }
    };

    const pathname = usePathname();

    useEffect(() => {
        if (isOpen) toggleOpen()
        /* eslint-disable react-hooks/exhaustive-deps */
    }, [pathname])

    const closeOnCurrent = (href: string) => {
        if (pathname === href) {
            toggleOpen()
        }
    }
    
    return (
        <div className='lg:hidden'>

            <button type='button' onClick={toggleOpen} aria-hidden='false' aria-label='button' className='pt-1'>
                <Menu className='h-7 w-7' aria-hidden='false' />
            </button>

            {isOpen && (
                <div>
                    <div className={`flex overflow-x-hidden mx-2 -mt-2 h-screen overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none lg:hidden transition-all duration-200 ${isClosing ? 'animate-fade-out-up' : 'animate-fade-in-down'}`}>
                        <div className='relative my-4 mx-auto w-screen'>
                            <div className='border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-background outline-none focus:outline-none'>
                                <div className='flex items-start justify-between p-5 border-solid rounded-t'>
                                    <Link href='/' passHref>
                                        <div className='inline-flex items-center text-3xl font-base tracking-wide cursor-pointer'>
                                            SolScope
                                        </div>
                                    </Link>

                                    <button className='absolute right-6' onClick={toggleOpen} aria-hidden='false' aria-label='button'>
                                        <X className='h-7 w-7' aria-hidden='false' />
                                    </button>
                                </div>

                                <div className='grid justify-center'>
                                    <div className='inline-flex w-64 h-1 bg-indigo-500 rounded-full'></div>
                                </div>

                                <div className='grid place-items-center px-8 text-xl py-2 gap-2 w-full mb-4'>

                                    <div className='pt-2 px-2 cursor-pointer w-full'>
                                        <Link onClick={() => closeOnCurrent('/')} href='/'>
                                            <div className='flex flex-row justify-between items-center'>
                                                Home
                                                <Home />
                                            </div>
                                        </Link>
                                    </div>

                                    <div className='border-t-2 pt-2 px-2 cursor-pointer w-full'>
                                        <Link onClick={() => closeOnCurrent('/nft')} href='/nft'>
                                            <div className='flex flex-row justify-between items-center'>
                                                NFT
                                                <ImageIcon />
                                            </div>
                                        </Link>
                                    </div>

                                    {/* <div className='border-t-2 pt-2 px-2 cursor-pointer w-full'>
                                        <Link onClick={() => closeOnCurrent('/token')} href='/token'>
                                            <div className='flex flex-row justify-between items-center'>
                                                Token
                                                <Coins />
                                            </div>
                                        </Link>
                                    </div> */}

                                    <div className='border-y-2 p-2 cursor-pointer w-full'>
                                        <Link onClick={() => closeOnCurrent('/transactions')} href='/transactions'>
                                            <div className='flex flex-row justify-between items-center'>
                                                Transactions
                                                <ArrowRightLeft />
                                            </div>
                                        </Link>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='opacity-25 fixed inset-0 z-40 h-[200vh] bg-black md:hidden'></div>
                </div>
            )}

        </div>
    )
}
