'use client';
import Link from 'next/link';
import '../app/globals.css';
import { usePathname,useRouter } from 'next/navigation';
import React from 'react';
import { BsBug } from 'react-icons/bs';
import { Router } from 'next/router';

const AppBar = () => {
  const router= useRouter();
  const currentRoute = usePathname();
  const links = [
    { label: 'Dashboard', href: '/dashboard' },
    { label: 'Bugs', href: '/bugs' },
  ];
  

  return (
    <div className="flex justify-between border-b mb-5 px-5 h-14 items-center bg-black">
      <div className="flex items-center space-x-5">
        <Link href="/dashboard">
          <BsBug className="text-white" size={26} />
        </Link>
        <ul className="flex space-x-5">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`${
                link.href === currentRoute ? '' : 'text-gray-500'
              } hover:text-white transition`}
            >
              {link.label}
            </Link>
          ))}
        </ul>
      </div>
      <div>
        <button onClick={ ()=>{ 
          localStorage.removeItem('token');
          router.push("/signin")
        }} className="text-white hover:text-gray-300 transition">Sign Out</button>
      </div>
    </div>
  );
};

export default AppBar;
