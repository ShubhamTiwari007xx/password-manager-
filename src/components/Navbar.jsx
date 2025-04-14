import React from 'react'

const Navbar = () => {
  return (
    <nav className=" flex justify-between items-center h-16">
        <div className="logo font-bold text-white px-4 text-3xl ">
        <span className=" text-violet-700">&lt; </span>
        <lord-icon className ='top-1'
    src="https://cdn.lordicon.com/iuvnsegf.json"
    trigger="hover"
    style={{ width: "28px" }}>
</lord-icon>
        Passify
        <span className=" text-violet-700">/&gt; </span>
        </div>

   <button className="text-white font-semibold cursor-pointer
   ">
    <img className=' px-2  mt-2 mx-10 w-11 rounded-full'  src="/icons/github.png" alt='github'></img>Github
   </button>


    </nav>
  )
}

export default Navbar
