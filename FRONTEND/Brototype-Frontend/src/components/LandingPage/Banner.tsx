
import 'tailwindcss/tailwind.css';
import VideoIcon from "../../../public/video project.png";
import PracticalIcon from "../../../public/coding practocal icon.svg"
import { motion } from "framer-motion";
const Banner = () => {
  const isSmDevice = window.matchMedia('(max-width: 768px)').matches;

  const sentenceVariants = {
    initial: {
      opacity: 0,
      y: 40,
    },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 4,
      },
    },
  };

  return (
    <div className="grid grid-rows-1 sm:grid-rows-3 grid-flow-col gap-4 shadow-md ml-auto relative">
      <motion.div
        className={`bg-black h-0 w-full sm:w-24rem md:w-32rem lg:w-48 xl:w-24rem 2xl:w-24rem absolute top-0 left-16rem bg-black-700 rounded-sm mt-10rem ${isSmDevice ? 'md:w-full' : ''}`}
        initial="initial"
        animate="animate"
      >
        <motion.p
          className="italic text-black text-3xl mb-2"
          variants={sentenceVariants}
        >
          “if you want something
        </motion.p>
        <motion.p
          className="italic text-black text-3xl ml-3rem mb-2"
          variants={sentenceVariants}
        >
          you never had,
        </motion.p>
        <motion.p
          className="italic text-black text-3xl mb-2"
          variants={sentenceVariants}
        >
          you have to do something
        </motion.p>
        <motion.p
          className="italic text-black text-3xl ml-3rem mb-2"
          variants={sentenceVariants}
        >
          you’ve never done.”</motion.p>

        <div>
          <button className="bg-black text-white rounded-full px-4 py-2 hover:bg-red-700 focus:outline-none focus:ring focus:ring-offset-2 focus:ring-black ml-4.5rem mt-3 shadow-xl flex items-center space-x-2 border-2 border-white">
            <img src={VideoIcon} alt="" className="w-6 h-auto mr-3" />
            What is brototype?
          </button>
        </div>
      </motion.div>

      <div className="row-span-3 bg-white-700 h-38rem l relative">
        <motion.div
          className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 ${isSmDevice ? 'grid-cols-1' : ''}`}
          initial={{ y: 0, }}
          animate={{ y: [0, -5, 0]}}
          transition={{ duration: 1, repeat: Infinity }}
        >
          <div className="h-24rem w-full sm:w-24rem md:w-24rem lg:w-24rem xl:w-24rem 2xl:w-24rem absolute top-0 right-16rem bg-black-700 rounded-sm mt-16">
            <img src="/Landing image.jpeg " alt="Image 1" className="h-full w-full object-cover max-w-full" />
          </div>
        </motion.div>
      </div>

      {/* The following empty div will be at the top of the parent div */}
      <motion.div
        className={`bg-gray-200 h-0 absolute top-0 left-20rem w-48rem h-10rem mt-32.3125rem rounded-xl shadow-xl border border-gray-300 ${isSmDevice ? 'w-full' : ''}`}
        initial={{ x: -500 }} // Initial position, moves to the left
        animate={{ x: 0,transition:{duration:2} }}
      //whileHover={{rotate:180}}// Moves to the left when removed
    >
      <p className="text-gray-800 text-xl italic font-semibold  mt-5 ml-3 px-6 ">If you have the courage and the commitment to learn coding,</p>
      <p className="text-gray-800 text-2xl italic font-semibold  mt-1 ml-3 px-10rem "> then Brocamp will empower you.</p>
      <div className='flex flex-wrap'>
        <div className='w-auto ml-44'>
        <img src={PracticalIcon} alt="" className=" h-auto  mt-3 px-3"/>
        </div>
      <p className="text-gray-800 text-sm italic font-semibold  mt-5">We are provided 80% practical training</p>
      </div>

    </motion.div>
    </div>
  );
}

export default Banner;
<script>
  
</script>