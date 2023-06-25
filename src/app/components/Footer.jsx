
import React from 'react'

const Footer = () => {
  return (
    <footer className='flex w-full py-4 flex-col gap-4 items-center justify-center bg-gray-900'>
        <h1 className='text-[2rem] font-semibold text-yellow-400'>Meals Inn</h1>
        <div>
        <p className='text-md text-gray-500'>Find the perfect meal recipe for you </p>
        <p className='text-sm text-gray-500'>© 2023 Meals Inn. All rights reserved.</p>
        </div>
    </footer>
  )
}

export default Footer