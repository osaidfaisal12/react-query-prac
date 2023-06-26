import Link from 'next/link'
import React from 'react'

const Navbar = () => {
  return (
    <nav className='w-full flex justify-center items-center py-4'>
        <div className='flex justify-between w-[900px] max-w-[900px]  items-center'>
        <Link href='/' className='text-[2rem] text-yellow-400 font-semibold'>Meals Inn</Link>
        <div className='flex justify-center items-center'>
            <div className='flex justify-center items-center gap-6'>
                <Link href='/meals' className='mx-2'>Meals</Link>
                <Link href='/savedMeals' className='mx-2'>Saved Meals</Link>
            </div>
        </div>
        </div>
    </nav>
  )
}

export default Navbar