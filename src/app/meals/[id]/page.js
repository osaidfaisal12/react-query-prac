'use client'


import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import Image from 'next/image'
import { useParams, useRouter } from 'next/navigation'
import React, { useEffect } from 'react'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import { Toaster, toast } from 'react-hot-toast'

export const getSingleMeal = async ({ queryKey }) => {
    const {data} = await axios.get(
        `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${queryKey[1]}`
    )
    return data?.meals?.[0] || []
}


const Page = () => {
    const [isSaved, setIsSaved] = React.useState(false)
    const router = useParams()

    const {
        data,
        isLoading,
        isError,
        error,
    } = useQuery(["singleMeal", router.id], getSingleMeal)

    useEffect(() => {
      if (localStorage.getItem('savedMeals')) {
        const savedMeals = JSON.parse(localStorage.getItem('savedMeals'))
        if (savedMeals.includes(router.id)) {
          setIsSaved(true)
        } else {
          setIsSaved(false)
        }
      } else {
        localStorage.setItem('savedMeals', JSON.stringify([]))
      }
    },[router.id])

    if(isLoading) return <h1>Loading...</h1>

    const savebuttonHandler = async() => {
      const savedMeals = JSON.parse(localStorage.getItem('savedMeals'))
      if (!isSaved){
        savedMeals.push(data.idMeal)
        localStorage.setItem('savedMeals', JSON.stringify(savedMeals))
        toast.success('Meal Saved Successfully')
        setIsSaved(true)
      } else {
        savedMeals.splice(savedMeals.indexOf(data.idMeal), 1)
        localStorage.setItem('savedMeals', JSON.stringify(savedMeals))
        setIsSaved(false)
        toast.error('Meal Removed Successfully')
      }
    }


  return (
    <div className="flex justify-center items-center flex-col w-full">
      <Toaster/>
      <Navbar />
      <div className="my-10 w-[900px] overflow-hidden flex flex-col">

        <div className='flex items-center gap-6'>
            <Image src={data?.strMealThumb} width={300} height={300} alt={data?.strMeal} />
            <div className='flex gap-4 flex-col'>
                <h1 className='text-slate-400 font-semibold text-[2rem]'>{data?.strMeal}</h1>
                <p className='text-slate-500'>Category: {data?.strCategory}</p>
                <p className='text-slate-500'>Area: {data?.strArea}</p>
                <p  className='text-slate-500'>Tags: {data?.strTags}</p>
                <button onClick={savebuttonHandler} className='font-semibold flex justify-center items-center gap-2 text-[1.25rem] bg-yellow-400 rounded-md text-white w-[120px] p-2 mt-4'><Image src='/heart.png' width={20} height={20} alt='heart' />{
                  isSaved ? 'Remove' : 'Save'
                }</button>
            </div>
        </div>
        {/* <IngredientTable data={data} /> */}
        <div className='my-10'>
        <h2 className='text-slate-400 font-semibold text-[2rem]'>Instructions</h2>

            {data?.strInstructions.split('.').filter((item) => item !== '').map((item, index) => (
                <p key={index} className=' text-slate-500'><span className='text-[0.75rem] font-semibold text-yellow-400 '>O</span> {item}.</p>
            )) }
        </div>
        </div>
      <Footer />
    </div>
  )
}

export default Page