import React from 'react'
import { NavLinks } from '../constants'

const NavBar = ({ location, setLocation }) => {
  return (
    <div className='fixed bottom-0 left-0 w-screen h-24 bg-white flex flex-row shadow-[0_-20px_30px_-10px_rgba(0,0,0,0.1)] z-50'>
      {NavLinks.map((link, i) => (
        <div key={link + i} className='text-primary flex-1 h-full flex items-center justify-center'>
          <button onClick={() => setLocation(link.title)} key={link + i} className={`${location == link.title ? 'bg-primary/15' : ''} flex flex-row items-center justify-center h-min px-8 py-4 rounded-full gap-4 ease-in-out duration-500`}>
            <img src={link.icon} alt={link.title + " icon"} className='h-10 w-10' />
            <div className={`${location == link.title ? 'w-32' : 'w-0'} font-bold leading-none text-base overflow-hidden ease-in-out duration-500`}>
              {link.title}
            </div>
          </button>
        </div>
      ))}
    </div>
  )
}

export default NavBar