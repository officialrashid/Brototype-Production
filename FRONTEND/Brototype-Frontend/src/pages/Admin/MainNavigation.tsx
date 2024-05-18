
import logo from'../assets/images/logo-black.png'

const MainNavigation=()=>{

    let user=true
    return (
        <>
        <nav className=" border-gray-200 shadow-md fixed top-0 w-full z-30 bg-white ">
  <div className="max-w-screen-xl mx-auto m-4">
    <ul className="flex items-center justify-between">
      <li className="flex items-center">
        <a href="https://flowbite.com" className="flex items-center">
          <img src={logo} className="h-8" alt="Flowbite Logo" />
        </a>
      </li>
      {
        user?<li className="flex items-center gap-[vw]">
        <div className="w-10 h-10 rounded-full bg-gray-300 border-2 border-gray-400 hover:border-black flex items-center justify-center mr-4">
          <span className="text-2xl text-gray-500 hover:text-black ">R</span>
        </div>
        
        <button >
        <div className="border-solid border-t- border-t-8 border-x-transparent border-x-8 border-b-0  "></div>
        </button>
      </li>:" "
      }
      
    </ul>
  </div>
</nav>
        
        </>
    )
}

export default MainNavigation