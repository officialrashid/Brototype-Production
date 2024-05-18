
import { useState } from 'react'
// import logo from '../../Advisor /assets/images/logo-black.png'
import Nav from '../Nav/Nav'
import OptionsModal from './OptionsModal'
import { useSelector } from 'react-redux'
const Navigation = () => {
  const superleadId:any = useSelector((state: any) => state?.superlead?.superleadData?.superleadId);
  const [optionsModal, setOptionsModal] = useState(false)
  const [studentId, setStudentId] = useState("")
  const [modalStatus, setModalStatus] = useState(false)
  const [reload, setReload] = useState(false)
  let user = true
  const changeModalStatus = () => {
    if (modalStatus) {
      setOptionsModal(false)
      setModalStatus(false)
      setReload((prevState) => !prevState);
    } else {
      setModalStatus(true)
      setReload((prevState) => !prevState);
    }
  }

  const handleActionChange = (studentId: string) => {

    try {
      setStudentId(studentId)
      setOptionsModal(true)
      setModalStatus(true)
      setReload(false)
    } catch (error) {

    }
  }
  return (
    <>
      <nav className=" border-b border-gray-300 fixed top-0 w-full z-30 bg-white" onClick={() => changeModalStatus()}>
        <div className="max-w-screen-xl mx-auto m-4">
          <ul className="flex items-center justify-between">
            <li className="flex items-center">
              <a href="https://flowbite.com" className="flex items-center">
                {/* <img src={logo} className="h-8" alt="Flowbite Logo" /> */}
              </a>
            </li>
            {
              user ? <li className="flex items-center gap-[vw]">
                <div className="w-10 h-10 rounded-full bg-gray-300 border-2 border-gray-400 hover:border-black flex items-center justify-center mr-4">
                  <span className="text-2xl text-gray-500 hover:text-black ">R</span>
                </div>
                {optionsModal ? (
                  <button className='' onClick={() => handleActionChange(superleadId)}>
                    <div className="border-solid border-t- border-t-8 border-x-transparent border-x-8 border-b-0 rotate-icon"></div>
                  </button>
                ) : (
                  // Render another icon or content when optionsModal is false
                  <button className='' onClick={() => handleActionChange(superleadId)}>
                    <div className="border-solid border-b- border-b-8 border-x-transparent border-x-8 border-t-0 rotate-icon"></div>
                  </button>
                )}

              </li> : " "
            }

          </ul>

        </div>

      </nav>
       <Nav />
      <OptionsModal isVisible={optionsModal} onClose={() => setOptionsModal(false)}  />
    </>
  )
}

export default Navigation