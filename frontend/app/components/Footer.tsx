// app/components/Footer.tsx
import { GlobeIcon } from './icons'

export default function Footer() {
  return (
    <footer className='bg-[#1E824C] text-white py-6 px-6 relative'>
      <div className='container mx-auto flex items-center justify-center'>
        <div className='flex items-center gap-2 z-10'>
          <GlobeIcon className='h-6 w-6' />
          <span>Awesome Earth</span>
        </div>
      </div>
      <div className='absolute bottom-0 right-0 w-[200px] h-[200px] rounded-full bg-gradient-to-r from-[#1E824C] to-[#3CB371] opacity-20 -z-10' />
      <div className='absolute bottom-0 left-0 w-[150px] h-[150px] rounded-full bg-gradient-to-r from-[#3CB371] to-[#00FA9A] opacity-20 -z-10' />
    </footer>
  )
}
