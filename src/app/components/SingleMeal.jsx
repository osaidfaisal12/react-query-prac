import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const SingleMeal = ({meal}) => {
  return (
    <Link href={`/meals/${meal.idMeal}`} className='bg-slate-800 p-4 rounded-lg flex mb-4 justify-start items-center gap-2 flex-col'>
        <Image priority src={meal.strMealThumb} alt={meal.strMeal} width={250} height={250} />
        <h3 className='text-white max-w-[250px]'>{meal.strMeal}</h3>
    </Link>
  )
}

export default SingleMeal