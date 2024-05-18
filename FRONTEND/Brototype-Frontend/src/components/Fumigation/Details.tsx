import React from 'react';
import Enqueries from './Enquiries';
const Details = () => {
  return (
    <div className=" h-auto mt-20rem grid grid-cols-1">
      <div className=" w-full h-fit flex justify-center items-center">
        <div className="triangle"></div>
      </div>
      <div className='bg-custom-domain h-96 w-62rem ml-56 '>

        <div className='w-full h-8rem flex gap-4' >
          <div className='w-3/5'>
            <button className="bg-black text-white rounded-full px-4 py-2 hover:bg-red-700 focus:outline-none focus:ring focus:ring-offset-2 focus:ring-black ml-8rem mt-3 shadow-xl flex items-center space-x-2 border-2 border-white">
              {/* <img src="" alt="" className="w-6 h-6 " /> */}
              Why join us...?
            </button>
            <p className='font-semibold text-2xl mt-8 ml-32'>Great students deserve the best jobs</p>
            <div>
              <p className='text-sm mt-24 ml-32'>Brototype Makes it happen.....</p>
            </div>
          </div>
          <div className='w-8rem h-8rem  '>
            <div className='small-traingle'></div>
            <div className='bg-white h-16 w-8rem shadow-2xl'>
              <p className='ml-10'>2000+</p>
              <p className='text-sm ml-1'>students studeied</p>
            </div>
            <div className='small-traingle-rotate'></div>
          </div>
          <div className='w-8rem h-8rem '>
            <div className='small-traingle'></div>
            <div className='bg-white h-16 w-8rem shadow-2xl'>
              <p className='ml-10'>1000+</p>
              <p className='text-sm ml-2'>students placed</p>
            </div>
            <div className='small-traingle-rotate'></div>
          </div>
        </div>

        <div className=' w-full h-8rem flex gap-4' style={{ position: 'relative', top: '-20px' }}>
          <div className='w-8rem h-8rem ml-42.5rem '>
            <div className='small-traingle'></div>
            <div className='bg-white h-16 w-8rem shadow-2xl'>
              <p className='ml-12'>70%</p>
              <p className='text-xs ml-2'>students studeied non-it background</p>
            </div>
            <div className='small-traingle-rotate'></div>
          </div>
          <div className='w-8rem h-8rem'>
            <div className='small-traingle'></div>
            <div className='bg-white h-16 w-8rem shadow-2xl'>
              <p className='ml-12'>100+</p>
              <p className='text-xs ml-2'>students having 5-stars on Leet-code</p>
            </div>
            <div className='small-traingle-rotate'></div>
          </div>
        </div>
      </div>
      <Enqueries />
    </div>
  )
}

export default Details;