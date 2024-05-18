import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { navigationData } from "../../redux-toolkit/controlSlice"


const SideNav = () => {



  const dispatch = useDispatch()
  const navigate = useNavigate()
  let tab = useSelector(state => state.navigation.controlData)
  const [activeTab, setActiveTab] = useState(tab)

  console.log(tab, 'tab');
  useEffect(() => {

    console.log('callled use effectt');

    handleTabClick(tab)

  }, [activeTab])

  const handleTabClick = (tabIndex: any) => {
    dispatch(navigationData(tabIndex))


    console.log(' clicked handle tab');


    if (tab == 1) {
      setActiveTab(tabIndex)
      navigate('/admin/dashboard')
    }
    if (tab == 2) {
      console.log('chatttttttt');

      navigate('/admin/chat/')
    }


    if (tab == 3) {
      navigate('/admin/content/')
    }
    if (tab == 4) {
      navigate('/admin/academic-counsellors/')
    }
    if (tab == 5) {
      navigate('/admin/branches/')
    }
    if (tab == 6) {
      navigate('/admin/enquiries/')
    }
    if (tab == 7) {
      navigate('/admin/courses/')
    }
    if (tab == 8) {
      navigate('/admin/company-data/')
    }
    if (tab == 9) {
      navigate('/admin/log-out/')
    }

  }
  return (
    <>
      <div className="border m-2 ml-0 mt-0 shadow-xl  rounded-xl  w-44 flex flex-col items-center justify-center bg-white  ">

        <div className="border  px-4 py-4 mt-6 mb-6 rounded-xl flex justify-center">
          <div>
            <span className="font-extrabold text-5xl">Br</span>
          </div>

        </div>

        <div onClick={() => { setActiveTab(1), handleTabClick(1) }} className={activeTab === 1 ? 'border shadow-lg w-fit border-gray-300 py-3 px-2 m-2 rounded-xl cursor-pointer bg-black' : 'border shadow-lg w-fit border-gray-300 py-3 px-2 m-2 rounded-xl cursor-pointer '} >
          <div>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="gray" className="w-8 h-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25V6ZM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18v-2.25Z" />
            </svg>

          </div>

        </div>
        <div>
          <span className="text-sm font-light text-gray-500">Dashboard</span>
        </div>
        <div onClick={() => { setActiveTab(2), handleTabClick(2) }} className={activeTab === 2 ? 'border shadow-lg w-fit border-gray-300 py-3 px-2 m-2 rounded-xl cursor-pointer bg-black' : 'border shadow-lg w-fit border-gray-300 py-3 px-2 m-2 rounded-xl cursor-pointer '}>
          <div >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="gray" className="w-8 h-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 0 1-.825-.242m9.345-8.334a2.126 2.126 0 0 0-.476-.095 48.64 48.64 0 0 0-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0 0 11.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155" />
            </svg>

          </div>

        </div>
        <div>
          <span className="text-sm font-light text-gray-500"> Chat</span>
        </div>
        <div onClick={() => { setActiveTab(3), handleTabClick(3) }} className={activeTab === 3 ? 'border shadow-lg w-fit border-gray-300 py-3 px-2 m-2 rounded-xl cursor-pointer bg-black' : 'border shadow-lg w-fit border-gray-300 py-3 px-2 m-2 rounded-xl cursor-pointer '}>
          <div >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="gray" className="w-8 h-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
            </svg>

          </div>


        </div>
        <div>
          <span className="text-sm font-light text-gray-500">Content</span>
        </div>
        <div onClick={() => { setActiveTab(4), handleTabClick(4) }} className={activeTab === 4 ? 'border shadow-lg w-fit border-gray-300 py-3 px-2 m-2 rounded-xl cursor-pointer bg-black' : 'border shadow-lg w-fit border-gray-300 py-3 px-2 m-2 rounded-xl cursor-pointer '}>
          <div>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="gray" className="w-8 h-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M18 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM3 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 9.374 21c-2.331 0-4.512-.645-6.374-1.766Z" />
            </svg>

          </div>


        </div>
        <div>
          <span className="text-sm font-light text-gray-500">Counsellors</span>
        </div>
        <div onClick={() => { setActiveTab(5), handleTabClick(5) }} className={activeTab === 5 ? 'border shadow-lg w-fit border-gray-300 py-3 px-2 m-2 rounded-xl cursor-pointer bg-black' : 'border shadow-lg w-fit border-gray-300 py-3 px-2 m-2 rounded-xl cursor-pointer '
        }
        >
          <div>
            <svg onClick={() => { setActiveTab(5), handleTabClick(5) }} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="gray" className="w-8 h-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9 4.5v15m6-15v15m-10.875 0h15.75c.621 0 1.125-.504 1.125-1.125V5.625c0-.621-.504-1.125-1.125-1.125H4.125C3.504 4.5 3 5.004 3 5.625v12.75c0 .621.504 1.125 1.125 1.125Z" />
            </svg>

          </div>


        </div>
        <div>
          <span className="text-sm font-light text-gray-500">Branches</span>
        </div>
        <div onClick={() => { setActiveTab(6), handleTabClick(6) }} className={activeTab === 6 ? 'border shadow-lg w-fit border-gray-300 py-3 px-2 m-2 rounded-xl cursor-pointer bg-black' : 'border shadow-lg w-fit border-gray-300 py-3 px-2 m-2 rounded-xl cursor-pointer '}>
          <div>
            <svg onClick={() => { handleTabClick(6) }} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="gray" className="w-8 h-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 0 1 0 3.75H5.625a1.875 1.875 0 0 1 0-3.75Z" />
            </svg>

          </div>


        </div>
        <div>
          <span className="text-sm font-light text-gray-500">Enquiries</span>
        </div>
        <div onClick={() => { setActiveTab(7), handleTabClick(7) }} className={activeTab === 7 ? 'border shadow-lg w-fit border-gray-300 py-3 px-2 m-2 rounded-xl cursor-pointer bg-black' : 'border shadow-lg w-fit border-gray-300 py-3 px-2 m-2 rounded-xl cursor-pointer '}>
          <div>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="gray" className="w-8 h-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 6.878V6a2.25 2.25 0 0 1 2.25-2.25h7.5A2.25 2.25 0 0 1 18 6v.878m-12 0c.235-.083.487-.128.75-.128h10.5c.263 0 .515.045.75.128m-12 0A2.25 2.25 0 0 0 4.5 9v.878m13.5-3A2.25 2.25 0 0 1 19.5 9v.878m0 0a2.246 2.246 0 0 0-.75-.128H5.25c-.263 0-.515.045-.75.128m15 0A2.25 2.25 0 0 1 21 12v6a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 18v-6c0-.98.626-1.813 1.5-2.122" />
            </svg>

          </div>


        </div>
        <div>
          <span className="text-sm font-light text-gray-500">Courses</span>
        </div>
        <div onClick={() => { setActiveTab(8), handleTabClick(8) }} className={activeTab === 8 ? 'border shadow-lg w-fit border-gray-300 py-3 px-2 m-2 rounded-xl cursor-pointer bg-black' : 'border shadow-lg w-fit border-gray-300 py-3 px-2 m-2 rounded-xl cursor-pointer '}>
          <div>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="gray" className="w-8 h-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0ZM3.75 12h.007v.008H3.75V12Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm-.375 5.25h.007v.008H3.75v-.008Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
            </svg>


          </div>
        </div>

        <div>
          <span className="text-sm font-light text-gray-500">Data</span>
        </div>
        <div onClick={() => { setActiveTab(9), handleTabClick(9) }} className={activeTab === 9 ? 'border shadow-lg w-fit border-gray-300 py-3 px-2 m-2 rounded-xl cursor-pointer bg-black' : 'border shadow-lg w-fit border-gray-300 py-3 px-2 m-2 rounded-xl cursor-pointer '}>
          <div>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="gray" className="w-8 h-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9" />
            </svg>

          </div>
        </div>

        <div>
          <span className="text-sm font-light text-gray-500">Log out</span>
        </div>

      </div>

    </>
  )
}

export default SideNav