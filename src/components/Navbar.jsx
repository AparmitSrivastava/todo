import React from 'react'

const Navbar = () => {
  return (
    <nav className='flex justify-between bg-blue-900 text-white py-2 px-2'>
      <div className='logo '>
        <span className='font-bold text-xl '>TaskMan</span>
        </div> 
      <ul className='flex gap-10 '>
        <li className='cursor-pointer hover:font-bold transition-all duration-300 p-1'>Home</li>
        <li className='cursor-pointer hover:font-bold transition-all duration-300 p-1'>Your Tasks</li>
        <li className='cursor-pointer hover:font-bold transition-all duration-300 p-1'>Contact us</li>
      </ul>
    </nav>
  )
}

export default Navbar
