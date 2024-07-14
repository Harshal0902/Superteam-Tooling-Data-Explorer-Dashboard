import React, { Suspense } from 'react'
import NFTDetails from '@/components/nft/NFTDetails'

export default async function Page({ params }: { params: { nftaddress: string } }) {
    const nft_address = params.nftaddress

    return (
        <Suspense fallback='Loading...'>
            <NFTDetails nftAddress={nft_address} />
        </Suspense>
    )
}
