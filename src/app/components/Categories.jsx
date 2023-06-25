import React from 'react'
import CategoryItem from './CategoryItem'

const Categories = (
    {
        categories,
        setSelectedCategory,
        selectedCategory,
        categoryIsLoading,
        categoryIsError,
        categoryError,
    }
) => {

    if(categoryIsLoading) return <div>Loading...</div>

    if(categoryIsError) return <div>Error : {categoryError.message}</div>

  return (
    <div className='flex gap-4 flex-wrap my-8'>
        {
            categories.map((item) => (
                <CategoryItem 
                key={item.idCategory}
                category={item}
                onClickHandler={() => setSelectedCategory(item.strCategory)}
                selectedCategory={selectedCategory}
                />
            ))
        }
    </div>
  )
}

export default Categories