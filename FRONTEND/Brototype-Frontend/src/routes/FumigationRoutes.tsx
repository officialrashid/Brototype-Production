

import { BrowserRouter, Routes, Route, Link, useNavigate, useParams } from 'react-router-dom'
import { useState } from 'react'
import HomeNav from '../components/Fumigation/Home-nav.tsx'
import Batch from '../components/Fumigation/Batch.tsx'
import Record from '../components/Fumigation/Record.tsx'
import Invigilator from '../components/Fumigation/Invigilator.tsx'
import BatchRecord from '../components/Fumigation/Batch-student.tsx'
import MainNav from '../components/Fumigation/Main-Nav.tsx'
import Navigation from '../components/Fumigation/Navigation-bar.tsx'
function FumigationRoutes() {




  //const { tab } = useParams();
  const [activeTab, setActiveTab] = useState(1);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  }

  return (
    <>
        {/* <BrowserRouter> */}
        <Navigation />
          <MainNav />
 
          <Routes>
            <Route path='/home' element={<HomeNav />}></Route>
            <Route path='/batch' element={<Batch />}></Route>
            <Route path='/fumigation-record' element={<Record />}></Route>
            <Route path='/current-invigilators' element={<Invigilator />}></Route>
            <Route path='/pending-students' element={<Record />}></Route>
            <Route path='/view-batch/:id/' element={<BatchRecord />}></Route>
           
          </Routes>

        {/* </BrowserRouter> */}






    </>
  )
}

export default FumigationRoutes




