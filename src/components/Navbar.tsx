"use client"

import React, { useState, useEffect, Suspense } from 'react'
import Link from 'next/link'
import { toast } from 'sonner'
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import ResponsiveNavbar from './ResponsiveNavbar'
import { Button } from './ui/button'
import ModeToggle from './ModeToggle'

export default function Navbar() {
    const [isHidden, setIsHidden] = useState(false);
    const [prevScrollPos, setPrevScrollPos] = useState(0);

    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const [selectedNetwork, setSelectedNetwork] = useState('mainnet-beta');

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollPos = window.scrollY;
            setIsHidden(currentScrollPos > prevScrollPos && currentScrollPos > 0);
            setPrevScrollPos(currentScrollPos);
        };

        window.addEventListener('scroll', handleScroll);

        return () => window.removeEventListener('scroll', handleScroll);
    }, [prevScrollPos]);

    useEffect(() => {
        const mode = searchParams.get('mode');
        if (mode) {
            setSelectedNetwork(mode);
        }
    }, [searchParams]);

    const handleNetworkChange = (query: string) => {
        setSelectedNetwork(query);
        const newSearchParams = new URLSearchParams(searchParams.toString());
        newSearchParams.set('mode', query);
        router.push(`${pathname}?${newSearchParams.toString()}`);
        toast.success(`Network changes to ${query}`);
    };

    return (
        <Suspense fallback={<div>Loading...</div>}>
            <div className={`backdrop-blur-3xl fixed top-0 z-50 w-full transition-all duration-200 ${isHidden ? '-translate-y-full' : 'translate-y-0'}`}>
                <nav className='flex items-center py-2 flex-wrap px-2.5 md:px-12 tracking-wider justify-between'>
                    <Link href='/' passHref>
                        <div className='inline-flex items-center justify-center text-2xl md:text-5xl cursor-pointer'>
                            SolScope
                        </div>
                    </Link>

                    <div className='hidden top-navbar w-full lg:inline-flex lg:flex-grow lg:w-auto'>
                        <div className='lg:inline-flex lg:flex-row lg:ml-auto lg:w-auto w-full lg:items-center items-start flex flex-col lg:h-auto lg:space-x-4'>
                            <Button variant='ghost' className='hover:bg-primary hover:text-white text-md' asChild>
                                <Link href='/nft' passHref>
                                    NFT
                                </Link>
                            </Button>
                            {/* <Button variant='ghost' className='hover:bg-primary hover:text-white text-md' asChild>
                            <Link href='/token' passHref>
                                Token
                            </Link>
                        </Button> */}
                            {/* <Button variant='ghost' className='hover:bg-primary hover:text-white text-md' asChild>
                                <Link href='/transactions' passHref>
                                    Transactions
                                </Link>
                            </Button> */}

                            <Select value={selectedNetwork} onValueChange={handleNetworkChange}>
                                <SelectTrigger className='w-[140px] dark:border-white'>
                                    <SelectValue placeholder='Select a Network' />
                                </SelectTrigger>
                                <SelectContent className='dark:border-white'>
                                    <SelectGroup>
                                        <SelectLabel className='-ml-5'>Select a Network</SelectLabel>
                                        <SelectItem value='mainnet-beta'>Mainnet Beta</SelectItem>
                                        <SelectItem value='testnet'>Testnet</SelectItem>
                                        <SelectItem value='devnet'>Devnet</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    <div className='flex space-x-2 justify-between items-center ml-2'>
                        <ModeToggle />
                        <ResponsiveNavbar />
                    </div>

                </nav>
            </div>
        </Suspense>
    )
}
