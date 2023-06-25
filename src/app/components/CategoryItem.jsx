import React from 'react'

const CategoryItem = ({
    category,
    onClickHandler,
    selectedCategory,
}) => {
    const isSelected = selectedCategory === category.strCategory

  return (
    <button onClick={onClickHandler} className={`bg-slate-700 p-4 border-2  rounded-md text-white ${isSelected ? 'border-yellow-400' : 'border-transparent'}`}>{category.strCategory}</button>
  )
}

export default CategoryItem