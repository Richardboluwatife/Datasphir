// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react'
// import { assets } from '../../assets/assets'


function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  

  return (
    <div className='flex w-full justify-between fixed'>
      <nav className="relative top-0 w-screen p-2 flex justify-around items-center opacity-90 bg-white shadow-md z-10">
     <div className="flex xs:ml-[-7%] lg:ml-[6%] flex-wrap items-center">
      <a href="/">
      {/* <img src={assets.logo} alt=""/> */}
      </a>
    </div>
    <div className={`w-full block flex-grow lg:flex lg:items-center lg:ml-[35%] lg:w-auto ${isOpen ? "block" : "hidden"}`}>
    <ul className={`w-full block flex-grow lg:flex lg:items-center lg:w-auto`}>
      <li className=" mt-4 lg:inline-block lg:mt-0 mr-16 hover:transform hover:-translate-y-1 transition ease-in-out duration-150">
        <a href="#pg-1" className=" font-sans text-center block text-gray-600 hover:text-black hover:border-b-2 hover:border-orange-500">
          Home
        </a>
      </li>
      <li className="hover:transform mt-4 lg:inline-block lg:mt-0 mr-16 hover:-translate-y-1 transition ease-in-out duration-150">
        <a href="#pg-2" className="font-sans text-center block text-gray-600 hover:text-black hover:border-b-2 hover:border-orange-500">
          About
        </a>
      </li>
      <li className="hover:transform mt-4 lg:inline-block lg:mt-0 mr-16 hover:-translate-y-1 transition ease-in-out duration-150">
        <a href="#contact" className="font-sans text-center block text-gray-600 hover:text-black hover:border-b-2 hover:border-orange-500">
          Contact
        </a>
      </li>
      <li className="hover:transform mt-4 lg:inline-block lg:mt-0 mr-16 hover:-translate-y-1 transition ease-in-out duration-150">
              <a href="Signup-Login" className="font-sans text-center block text-orange-500 border border-orange-500 px-8 py-2 rounded 
            hover:shadow-lg hover:bg-orange-500 hover:text-white">
          Get Started
        </a>
      </li>
    </ul>
    </div>
          <button
         onClick={() => setIsOpen(!isOpen)}
         className="flex hover:bg-orange-500 transition lg:hidden ease-in-out duration-150 items-center px-3 py-2 rounded text-black-500"
       >
         <svg
           className={`fill-current h-4 w-4 ${isOpen ? "hidden" : "block"}`}
           viewBox="0 0 17 17"
           xmlns="http://www.w3.org/2000/svg"
         >
           <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
         </svg>
         <svg
           className={`fill-current h-4 w-4 ${isOpen ? "block" : "hidden"}`}
           viewBox="0 0 20 20"
           xmlns="http://www.w3.org/2000/svg"
         >
           <path d="M10 8.586L2.929 1.515 1.515 2.929 8.586 10l-7.071 7.071 1.414 1.414L10 11.414l7.071 7.071 1.414-1.414L11.414 10l7.071-7.071-1.414-1.414L10 8.586z" />
         </svg>
       </button>
  </nav>
    </div>
  )
}
// const [isOpen, setIsOpen] = useState(false);

//  return (
//    <nav className="flex items-center justify-between flex-wrap p-6">
//      <div className="flex items-center flex-shrink-0 text-white mr-6 lg:mr-72">
//        <img src={assets.logo} className="w-100 h-10 mr-2" alt="Logo" />
//      </div>
//      <div className="block lg:hidden">
//        <button
//          onClick={() => setIsOpen(!isOpen)}
//          className="flex items-center px-3 py-2 rounded text-black-500 hover:text-black-400"
//        >
//          <svg
//            className={`fill-current h-3 w-3 ${isOpen ? "hidden" : "block"}`}
//            viewBox="0 0 20 20"
//            xmlns="http://www.w3.org/2000/svg"
//          >
//            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
//          </svg>
//          <svg
//            className={`fill-current h-3 w-3 ${isOpen ? "block" : "hidden"}`}
//            viewBox="0 0 20 20"
//            xmlns="http://www.w3.org/2000/svg"
//          >
//            <path d="M10 8.586L2.929 1.515 1.515 2.929 8.586 10l-7.071 7.071 1.414 1.414L10 11.414l7.071 7.071 1.414-1.414L11.414 10l7.071-7.071-1.414-1.414L10 8.586z" />
//          </svg>
//        </button>
//      </div>
//      <div
//        className={`w-full block flex-grow lg:flex lg:items-center lg:w-auto ${isOpen ? "block" : "hidden"}`}
//      >
//        <div className="text-sm lg:flex-grow">
//          <a href="#" className="block mt-4 lg:inline-block lg:mt-0 text-white-200 mr-4">
//            First Link
//          </a>
//          <a href="#" className="block mt-4 lg:inline-block lg:mt-0 text-white-200 mr-4">
//            Second Link
//          </a>
//          <a href="#" className="block mt-4 lg:inline-block lg:mt-0 text-white-200 mr-4">
//            Third Link
//          </a>
//          <a href="#" className="block mt-4 lg:inline-block lg:mt-0 text-white-200 mr-4">
//            Fourth Link
//          </a>
//        </div>
//        <div>
//          <button className="inline-flex items-center bg-amber-500 border-0 py-2 px-4 text-white">
//            Click Me
//          </button>
//        </div>
//      </div>
//    </nav>
//  );
// }
export default Navbar