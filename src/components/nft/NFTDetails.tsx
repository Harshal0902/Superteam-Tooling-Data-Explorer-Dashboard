"use client"

import React, { useEffect, useState, Suspense } from 'react'
import MaxWidthWrapper from '../MaxWidthWrapper'
import InformationCard from '../InformationCard'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useRouter, useSearchParams } from 'next/navigation'
import { Card, CardHeader, CardContent } from '../ui/card'
import Image from 'next/image'
import { Loader2 } from 'lucide-react'

const FormSchema = z.object({
    nft_address: z.string({
        required_error: 'NFT address is required.',
    }).min(8, {
        message: 'Enter a valid NFT address.',
    })
})

interface NFTDetailsProps {
    nftAddress: string;
}

interface NFTData {
    imageUrl: string;
    name: string;
    description: string;
    attributes: Record<string, string>;
    collection: {
        name: string;
        family: string;
    };
    creators: Array<{ address: string; verified: boolean; share: number }>;
    externalUrl: string;
    symbol: string;
    updateAuthority: string;
}

export default function NFTDetails({ nftAddress }: NFTDetailsProps) {
    const [nftData, setNftData] = useState<NFTData | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const router = useRouter();
    const searchParams = useSearchParams();

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            nft_address: '',
        }
    })

    async function onSubmit(data: z.infer<typeof FormSchema>) {
        router.push(`/nft/${data.nft_address}`);
    }

    useEffect(() => {
        const fetchNFTDetails = async () => {
            setLoading(true);
            setError(null);

            try {
                const shyft_api_key = process.env.NEXT_PUBLIC_SHYFT_API_KEY!;
                const myHeaders = new Headers();
                myHeaders.append('x-api-key', shyft_api_key);

                const requestOptions: RequestInit = {
                    method: 'GET',
                    headers: myHeaders,
                    redirect: 'follow'
                };

                const mode = searchParams.get('mode') || 'mainnet-beta';
                const network = ['devnet', 'testnet', 'mainnet-beta'].includes(mode) ? mode : 'mainnet-beta';

                let response = await fetch(`https://api.shyft.to/sol/v1/nft/read?network=${network}&token_address=${nftAddress}&refresh=true&token_record=true`, requestOptions);
                let result = await response.json();

                if (!response.ok) {
                    response = await fetch(`https://api.shyft.to/sol/v1/nft/compressed/read?network=${network}&nft_address=${nftAddress}`, requestOptions);
                    result = await response.json();
                }

                if (response.ok && result.success) {
                    setNftData({
                        imageUrl: result.result.image_uri,
                        name: result.result.name,
                        description: result.result.description,
                        attributes: result.result.attributes,
                        collection: result.result.collection,
                        creators: result.result.creators,
                        externalUrl: result.result.external_url,
                        symbol: result.result.symbol,
                        updateAuthority: result.result.update_authority,
                    });
                } else {
                    setError('No data available');
                }
            } catch (error) {
                setError('Error fetching data');
            } finally {
                setLoading(false);
            }
        };

        fetchNFTDetails();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [nftAddress, searchParams]);

    if (loading) {
        return <div className='w-full flex flex-row items-center justify-center py-16'>
            <Loader2 size={24} className='mr-2 animate-spin' />
            <p className='text-xl'>Loading...</p>
        </div>;
    }

    if (error) {
        return <div className='w-full flex items-center justify-center'>
            <InformationCard message='No data available for this NFT address' />
        </div>;
    }

    if (!nftData) {
        return <div className='w-full flex items-center justify-center'>
            <InformationCard message='No data available for this NFT address' />
        </div>;
    }

    return (
        <Suspense fallback={<div className='w-full flex items-center justify-center'><Loader2 size={24} className='mr-2 animate-spin' /><p className='text-xl'>Loading...</p></div>}>
            <MaxWidthWrapper className='py-4'>
                <div className='w-full py-4'>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col md:flex-row md:flex-1 space-y-2 md:space-y-0 space-x-0 md:space-x-3 w-full'>
                            <FormField
                                control={form.control}
                                name='nft_address'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <Input {...field} className='w-full md:w-[50vw] dark:border-white' placeholder='NFT address' />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <Button type='submit' className='text-white md:px-12'>
                                Submit
                            </Button>
                        </form>
                    </Form>
                </div>
                <Card className='dark:border-white'>
                    <CardHeader>
                        <h2 className='text-2xl font-bold text-center'>{nftData.name}</h2>
                    </CardHeader>
                    <CardContent>
                        <div className='flex flex-col md:flex-row space-y-2 md:space-y-0 space-x-0 md:space-x-10 md:items-center md:justify-center w-full'>
                            <div className='flex flex-col items-center justify-center'>
                                <Image src={nftData.imageUrl} alt={nftData.name} width={300} height={300} className='rounded-md' />
                                <div className='bg-white rounded-xl py-2 px-4 -mt-5'>
                                    <div className='text-black text-xl'>{nftData.name}</div>
                                </div>
                            </div>
                            <div>
                                <div className='text-xl'>NFT Details</div>
                                <div className='flex flex-col md:flex-row space-y-2 md:space-y-0 space-x-0 md:space-x-10 md:items-center md:justify-center w-full'>
                                    <div className='flex flex-col space-y-2 md:max-w-[22rem]'>
                                        <div className='flex flex-row space-x-1 flex-wrap'>
                                            <strong>Description</strong>{nftData.description}
                                        </div>
                                        <div className='flex flex-row space-x-1 flex-wrap'>
                                            <strong>External link</strong>: <a href={nftData.externalUrl} target='_blank' rel='noopener noreferrer' className='text-blue-500 underline'>{nftData.externalUrl}</a>
                                        </div>
                                        <div className='flex flex-row space-x-1 flex-wrap'>
                                            <strong>Collection</strong>: {nftData.collection.name} ({nftData.collection.family})
                                        </div>
                                        <div className='flex flex-row space-x-1 flex-wrap'>
                                            <strong>Symbol</strong>: {nftData.symbol}
                                        </div>
                                        <div className='flex flex-row space-x-1 flex-wrap'>
                                            <strong>Update Authority:</strong>{nftData.updateAuthority}
                                        </div>
                                    </div>
                                    <div className='flex flex-col space-y-2'>
                                        <div className='flex flex-col space-y-1'>
                                            <strong>Attributes:</strong>
                                            <ul className='list-disc list-inside'>
                                                {Object.entries(nftData.attributes).map(([key, value]) => (
                                                    <li key={key}><strong>{key}:</strong> {value}</li>
                                                ))}
                                            </ul>
                                        </div>
                                        <div className='flex flex-col space-y-1'>
                                            <strong>Creators:</strong>
                                            <ul className='list-disc list-inside'>
                                                {nftData.creators.map((creator, index) => (
                                                    <li key={index}>{creator.address} (Share: {creator.share}%, Verified: {creator.verified ? 'Yes' : 'No'})</li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </MaxWidthWrapper>
        </Suspense>
    );
}
