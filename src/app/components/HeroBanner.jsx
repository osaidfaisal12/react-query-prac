import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const HeroBanner = () => {
  return (
    <div className='flex justify-center my-10 items-center w-full'>
        <div  className='flex items-center w-[900px] gap-6'>
            <div className='flex flex-col gap-6 w-[50%]'>
                <h2 className='text-[3rem] font-bold '>Find The Perfect <span className='text-yellow-400'>Meal Recipe</span> For You</h2>
                <div className='flex items-center gap-4'>
                    <Link href='/meals' className='bg-yellow-400 p-4 rounded-lg font-semibold'>Explore meals</Link>
                    <Link href='/savedMeals' className='bg-gray-800 p-4 rounded-lg font-semibold'>Saved meals</Link>
                </div>
            </div>
            <div className='flex justify-center relative h-[550px] items-center w-[400px]'>
                <Image src='/hero.jpg' fill alt='alt' />
            </div>
        </div>
    </div>
  )
}

export default HeroBanner