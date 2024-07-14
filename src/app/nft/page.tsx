'use client'

import React, { Suspense } from 'react'
import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Form, FormControl, FormField, FormItem, FormMessage, FormLabel, FormDescription } from '@/components/ui/form'
// import { Area, AreaChart, CartesianGrid, XAxis } from 'recharts'
// import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart'
// import { chartData } from '@/data/nft'
import Image from 'next/image'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'

const FormSchema = z.object({
    nft_address: z.string({
        required_error: 'NFT address is required.',
    }).min(8, {
        message: 'Enter a valid NFT address.',
    })
})

// const chartConfig = {
//     desktop: {
//         label: 'Desktop',
//         color: 'green',
//     },
//     mobile: {
//         label: 'Mobile',
//         color: 'red',
//     },
// } satisfies ChartConfig


export default function Page() {
    const router = useRouter();

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            nft_address: '',
        }
    })

    async function onSubmit(data: z.infer<typeof FormSchema>) {
        router.push(`/nft/${data.nft_address}`);
    }

    return (
        <Suspense fallback={'Loading...'}>
            <MaxWidthWrapper className='py-4'>
                <div className='py-2'>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col md:flex-row space-y-2 md:space-y-0 space-x-0 md:space-x-3 w-full'>
                            <FormField
                                control={form.control}
                                name='nft_address'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <Input {...field} className='w-full md:w-[46.5vw] dark:border-white' placeholder='NFT address' />
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

                <div className='py-2 grid md:grid-cols-2 gap-4'>
                    <Card className='dark:border-white'>
                        <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                            <CardTitle className='text-xl tracking-wide font-semibold'>Market Cap</CardTitle>
                        </CardHeader>
                        <CardContent className='flex flex-col md:flex-row space-y-2 md:space-y-0 md:justify-between'>
                            <div>
                                <div className='text-2xl font-bold'>$409,197,750</div>
                                <p className='text-xs text-muted-foreground'>+5.0% from last 24h</p>
                            </div>
                            {/* <div className='w-full'>
                            <ChartContainer config={chartConfig}>
                                <AreaChart
                                    accessibilityLayer
                                    data={chartData}
                                    margin={{
                                        left: 12,
                                        right: 12,
                                    }}
                                >
                                    <CartesianGrid vertical={false} />
                                    <XAxis
                                        dataKey='month'
                                        tickLine={false}
                                        axisLine={false}
                                        tickMargin={8}
                                        tickFormatter={(value) => value.slice(0, 3)}
                                    />
                                    <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
                                    <defs>
                                        <linearGradient id='fillDesktop' x1='0' y1='0' x2='0' y2='1'>
                                            <stop
                                                offset='5%'
                                                stopColor='var(--color-desktop)'
                                                stopOpacity={0.8}
                                            />
                                            <stop
                                                offset='95%'
                                                stopColor='var(--color-desktop)'
                                                stopOpacity={0.1}
                                            />
                                        </linearGradient>
                                        <linearGradient id='fillMobile' x1='0' y1='0' x2='0' y2='1'>
                                            <stop
                                                offset='5%'
                                                stopColor='var(--color-mobile)'
                                                stopOpacity={0.8}
                                            />
                                            <stop
                                                offset='95%'
                                                stopColor='var(--color-mobile)'
                                                stopOpacity={0.1}
                                            />
                                        </linearGradient>
                                    </defs>
                                    <Area
                                        dataKey='mobile'
                                        type='natural'
                                        fill='url(#fillMobile)'
                                        fillOpacity={0.4}
                                        stroke='var(--color-mobile)'
                                        stackId='a'
                                    />
                                    <Area
                                        dataKey='desktop'
                                        type='natural'
                                        fill='url(#fillDesktop)'
                                        fillOpacity={0.4}
                                        stroke='var(--color-desktop)'
                                        stackId='a'
                                    />
                                </AreaChart>
                            </ChartContainer>
                        </div> */}
                        </CardContent>
                    </Card>

                    <Card className='dark:border-white'>
                        <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                            <CardTitle className='text-xl tracking-wide font-semibold'>24h Trading Volume</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className='text-2xl font-bold'>$2,115,192</div>
                            <p className='text-xs text-muted-foreground'>-29.5% from last 24h</p>
                        </CardContent>
                    </Card>
                </div>

                <div className='py-2 grid md:grid-cols-2 gap-4'>
                    <Card className='dark:border-white'>
                        <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                            <CardTitle className='text-xl tracking-wide font-semibold'>Trending</CardTitle>
                        </CardHeader>
                        <CardContent className='flex flex-col space-y-2'>
                            <div className='flex flex-row items-center justify-between'>
                                <div className='flex flex-row space-x-2'>
                                    <div>
                                        <Image src='/assets/nft/retardio-cousin.webp' width={30} height={30} alt='SOL' className='mr-2 rounded-full' />
                                    </div>
                                    <div>Retardio Cousins</div>
                                </div>
                                <div>
                                    19.93 SOL
                                </div>
                            </div>
                            <div className='flex flex-row items-center justify-between'>
                                <div className='flex flex-row space-x-2'>
                                    <div>
                                        <Image src='/assets/nft/send-it.webp' width={30} height={30} alt='SOL' className='mr-2 rounded-full' />
                                    </div>
                                    <div>Send it</div>
                                </div>
                                <div>
                                    0.10 SOL
                                </div>
                            </div>
                            <div className='flex flex-row items-center justify-between'>
                                <div className='flex flex-row space-x-2'>
                                    <div>
                                        <Image src='/assets/nft/mad-lads.webp' width={30} height={30} alt='SOL' className='mr-2 rounded-full' />
                                    </div>
                                    <div>Mad Lads</div>
                                </div>
                                <div>
                                    73.49 SOL
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className='dark:border-white'>
                        <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                            <CardTitle className='text-xl tracking-wide font-semibold'>Largest Gainers</CardTitle>
                        </CardHeader>
                        <CardContent className='flex flex-col space-y-2'>
                            <div className='flex flex-row items-center justify-between'>
                                <div className='flex flex-row space-x-2'>
                                    <div>
                                        <Image src='/assets/nft/remixilated-sol-babies.webp' width={30} height={30} alt='SOL' className='mr-2 rounded-full' />
                                    </div>
                                    <div>Remixilated Sol Babies</div>
                                </div>
                                <div>
                                    1.45 SOL
                                </div>
                            </div>
                            <div className='flex flex-row items-center justify-between'>
                                <div className='flex flex-row space-x-2'>
                                    <div>
                                        <Image src='/assets/nft/helions.webp' width={30} height={30} alt='SOL' className='mr-2 rounded-full' />
                                    </div>
                                    <div>Helions</div>
                                </div>
                                <div>
                                    0.69 SOL
                                </div>
                            </div>
                            <div className='flex flex-row items-center justify-between'>
                                <div className='flex flex-row space-x-2'>
                                    <div>
                                        <Image src='/assets/nft/okay-bears.webp' width={30} height={30} alt='SOL' className='mr-2 rounded-full' />
                                    </div>
                                    <div>Okay Bears</div>
                                </div>
                                <div>
                                    2.84 SOL
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </MaxWidthWrapper>
        </Suspense>
    )
}
