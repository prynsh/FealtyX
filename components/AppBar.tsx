'use client';
import Link from 'next/link'
import '../app/globals.css';
import { usePathname } from 'next/navigation'
import React from 'react'
import { BsBug } from "react-icons/bs";




const AppBar = () => {
    const currentRoute = usePathname();
    const links=[
        {label: "Dashboard" ,href:'/'},
        {label: "Bugs" ,href:'/bugs'}
        
    ]
    return (
    
    <div className='flex space-x-5 border-b mb-5 px-5 h-14 items-center bg-black'>
      <Link href={"/"}><BsBug className='text-white 'size={26}/></Link>
      <ul className='flex  space-x-5 '>
        {links.map(link=><Link key={link.href} 
        href={link.href} className={`${link.href=== currentRoute ?'': 'text-gray-500'}  hover:text-white transition`}> {link.label} </Link>)}
        
      </ul>
    </div>
  )
}

export default AppBar
