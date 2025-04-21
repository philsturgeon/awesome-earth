// app/page.tsx
'use client'
import Link from 'next/link'
import { useState } from 'react'
import { links } from './data/links'
import ReactMarkdown from 'react-markdown'
import Header from './components/Header'
import Image from 'next/image'

interface Link {
  name: string
  url: string
  description: string
}

interface Category {
  name: string
  links: Link[]
}

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('')

  const handleSearchQueryChange = (query: string) => {
    setSearchQuery(query)
  }

  const filterLinks = (links: Category[]) => {
    if (!searchQuery) {
      return links
    }

    const filteredLinks = links.map((category) => ({
      ...category,
      links: category.links.filter(
        (link) =>
          link.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          link.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }))

    return filteredLinks.filter((category) => category.links.length > 0)
  }

  const filteredLinks = filterLinks(links)

  return (
    <>
      <Header onSearchQueryChange={handleSearchQueryChange} />
      <main className='bg-transparent py-12 px-6 relative'>
        <div className='flex justify-center'>
          <Image
            src='/logo.png'
            width={500}
            height={500}
            alt='Picture of the author'
          />
        </div>
        <h1 className='text-center text-xl mb-10'>
          Awesome Earth is a set of resources, services, products and ideas you
          can use to improve your climate footprint.
        </h1>
        <div className='container mx-auto grid grid-cols-1 gap-8 pl-5 pr-5'>
          {filteredLinks.map((category) => (
            <div
              key={category.name}
              className='rounded-md shadow-lg relative mb-[50px] mt-5'
            >
              <div className='absolute -top-[60px] -left-10 w-[200px] h-[200px] rounded-full bg-gradient-to-r from-[#1E824C] to-[#3CB371] opacity-20 -z-10' />
              <div className='p-6 bg-white bg-opacity-50'>
                <h2 className='text-2xl font-bold'>{category.name}</h2>
              </div>
              <div className='grid grid-cols-1 gap-4 p-6 bg-white bg-opacity-50'>
                {category.links.map((link) => {
                  return (
                    <div key={link.name} className='linkDescription'>
                      <Link
                        className='text-[#1E824C] font-bold'
                        href={link.url}
                        style={{ marginRight: 'auto' }}
                        target='_blank'
                      >
                        <span>{link.name}</span>
                      </Link>
                      &nbsp; - &nbsp;
                      <span className='flex-1' style={{ width: '100%' }}>
                        <ReactMarkdown
                          components={{
                            a: ({ ...props }) => (
                              <a
                                href={props.href}
                                target='_blank'
                                rel='noopener noreferrer'
                                className='text-[#1E824C] underline'
                              >
                                {props.children}
                              </a>
                            )
                          }}
                        >
                          {link.description}
                        </ReactMarkdown>
                      </span>
                    </div>
                  )
                })}
              </div>
            </div>
          ))}
        </div>
      </main>
    </>
  )
}
