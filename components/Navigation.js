'use client'
import Link from 'next/link';
import { UserButton, useUser} from '@clerk/nextjs';
import { Icon } from '@iconify/react';


export default function Navigation({ isOpen, setIsOpen }) {
  const { user } = useUser()

  return (
    <nav className="bg-white z-10 text-black p-4 fixed top-0 left-0 right-0 border-b border-gray-100 shadow-sm">
      <div className="container mx-auto flex justify-between items-center">
      {!isOpen ? (
        <button className="text-xl font-bold" onClick={() => setIsOpen(true)}>
          <Icon icon="charm:menu-hamburger" style={{ fontSize: '22px' }} className='cursor-pointer text-[#2684ff]' />
        </button>): (
           <button className="text-xl font-bold" onClick={() => setIsOpen(false)}>
           <Icon icon="mingcute:close-line" style={{ fontSize: '22px' }} className='cursor-pointer text-[#2684ff]' />
         </button>
        )
        }
        <div className="flex items-center space-x-4 text-[#505f79]">
          {user ? (
            <>
              
              <Icon icon="iconamoon:notification-light" style={{ fontSize: '18px' }} className='opacity-70 hover:opacity-100 cursor-pointer transition-opacity' />
              <UserButton afterSignOutUrl="/sign-in" />
            </>
          ) : (
            <Link href="/sign-in">Sign In</Link>
          )}
        </div>
      </div>
    </nav>
  );
}