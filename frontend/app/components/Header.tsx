// app/components/Header.tsx
'use client'
import { useState } from 'react'
import { GlobeIcon, SearchIcon } from './icons'

interface HeaderProps {
  onSearchQueryChange: (query: string) => void
}

export default function Header({ onSearchQueryChange }: HeaderProps) {
  const [searchQuery, setSearchQuery] = useState('')

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value
    setSearchQuery(query)
    onSearchQueryChange(query)
  }

  return (
    <header className='bg-[#1E824C] text-white py-4 px-6 flex flex-wrap justify-center sm:items-center sm:justify-between relative'>
      <div className='flex items-center gap-2 z-10'>
        <GlobeIcon className='h-8 w-8' />
        <h1 className='text-2xl font-bold'>Awesome Earth</h1>
      </div>
      <div className='relative z-10'>
        <input
          className='bg-white text-gray-900 rounded-md px-4 py-2 pr-10 w-[350px] mt-5 sm:mt-0'
          placeholder='Search for climate solutions...'
          type='text'
          value={searchQuery}
          onChange={handleSearch}
        />
        <SearchIcon className='absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500 mt-[10px] sm:mt-0' />
      </div>
      <div className='absolute top-0 right-0 w-[300px] h-[300px] rounded-full bg-gradient-to-r from-[#1E824C] to-[#3CB371] opacity-20 -z-10' />
      <div className='absolute top-0 left-0 w-[250px] h-[250px] rounded-full bg-gradient-to-r from-[#3CB371] to-[#00FA9A] opacity-20 -z-10' />
      <div className='absolute top-0 right-[500px] w-[200px] h-[200px] rounded-full bg-gradient-to-r from-[#00FA9A] to-[#1E824C] opacity-20 -z-10' />
    </header>
  )
}
