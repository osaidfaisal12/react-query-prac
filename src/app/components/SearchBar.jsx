import React from 'react'

const SearchBar = ({searchText, setSearchText}) => {
  return (
    <div className=''>
        <input type="text" value={searchText}
        className='bg-slate-600 p-4 w-[400px] focus:border-2 focus:border-yellow-400 rounded-lg' 
        onChange={(e) => setSearchText(e.target.value)}
        placeholder="Search..." />
    </div>
  )
}

export default SearchBar