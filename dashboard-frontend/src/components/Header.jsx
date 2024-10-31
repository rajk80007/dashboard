import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <>
        <nav className="bg-black text-white flex w-screen mx-auto p-4 rounded-sm">
        <h1 className='text-xl w-1/2'>
            <Link to='/'>
            Dashboard Analytics
            </Link>
            </h1>

            <ul className='flex w-full'>
                <li className='text-center text-lg hover:text-[#413a3a] cursor-pointer hover:bg-[#f7d2cf] px-4 py-2 rounded '>
                    <Link to='/'>Home</Link>

                </li>
            </ul>

        </nav>
    </>
  )
}

export default Header