
import Enqueries from './Enqueries';

const Details = () => {

  return (
    <div className=" h-auto mt-20rem grid grid-cols-1">
      <div className=" w-full h-fit flex justify-center items-center">
        <div className="triangle"></div>
      </div>
      <div className='bg-gray-200 h-96 w-62rem ml-56 '>

        <div className='w-full h-8rem flex gap-4' >
          <div className='w-3/5'>
            <button className="bg-black text-white rounded-full px-4 py-2 hover:bg-gray-700 focus:outline-none focus:ring focus:ring-offset-2 focus:ring-black ml-8rem mt-3 shadow-xl flex items-center space-x-2 border-2 border-white">
              {/* <img src="" alt="" className="w-6 h-6 " /> */}
              Whay join us...?
            </button>
            <p className='font-semibold text-2xl mt-8 ml-32 font-roboto'>Great students deserve the best jobs</p>
            <div>
              <p className='text-sm mt-24 ml-32 font-roboto'>Brototype Makes it happen.....</p>
            </div>
          </div>
          <div className='w-8rem h-8rem  '>
            <div className='small-traingle'></div>
            <div className='bg-white h-16 w-8rem shadow-2xl'>
              <p className='ml-10 font-roboto'>2000+</p>
              <p className='text-sm ml-3 font-roboto'>students studeied</p>
            </div>
            <div className='small-traingle-rotate'></div>
          </div>
          <div className='w-8rem h-8rem '>
            <div className='small-traingle'></div>
            <div className='bg-white h-16 w-8rem shadow-2xl'>
              <p className='ml-10 font-roboto'>1000+</p>
              <p className='text-sm ml-5 font-roboto'>students placed</p>
            </div>
            <div className='small-traingle-rotate'></div>
          </div>
        </div>

        <div className=' w-full h-8rem flex gap-4' style={{ position: 'relative', top: '-20px' }}>
          <div className='w-8rem h-8rem ml-42.5rem '>
            <div className='small-traingle'></div>
            <div className='bg-white h-16 w-8rem shadow-2xl'>
              <p className='ml-12 font-roboto'>70%</p>
              <p className='text-xs ml-2 font-roboto '>students studeied non-it <br /><p className='ml-8'>background</p></p>
            </div>
            <div className='small-traingle-rotate'></div>
          </div>
          <div className='w-8rem h-8rem'>
            <div className='small-traingle'></div>
            <div className='bg-white h-16 w-8rem shadow-2xl'>
              <p className='ml-12 font-roboto'>100+</p>
              <p className='text-xs ml-2 font-roboto'>students having 5-stars <br /><p className='ml-5'>on Leet-code</p></p>
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
