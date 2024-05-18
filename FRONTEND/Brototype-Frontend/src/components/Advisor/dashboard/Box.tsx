import ReactApexChart from "react-apexcharts"
import review from '../assets/images/profile.webp'
import { useEffect } from "react";
const Box=({coordinator})=>{
    const series = [80]; //70 percent
    const options = {
      labels: [], //label of this diagram
      plotOptions: {
        radialBar: {
          dataLabels: {
            name: {
              show: false, // Set to true if you want to display the category (name) labels
            },
            value: {
              show: false, // Set to true if you want to display the value labels
            },

          },
        },
        
       


      },
      chart:{
        offsetX:10,
        offsetY: 11
    },
    colors:['#347dc1']
    }
    useEffect(() => {
      
      return () => {
        
      };
    }, []);
    return (
        
        <>

<div className="border border-2px  m-2 mx-auto rounded-md  bg-white  shadow-lg " >
  <div className="flex m-2 ">
    <div> <span className="font-meduim font-roboto">Today's Task </span>
 <div className="mt-3">
   <span className="text-3xl font-medium">{coordinator?.todaysReview?coordinator.todaysReview:0}</span>
 </div>
    </div>
    <div className=" mt-4 ml-6 border-darkBlue w-20 h-20 rounded-full border-4 "  > 

    <svg height={54} width={65} className="ml-1 mt-1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M16 6C16 8.20914 14.2091 10 12 10C9.79086 10 8 8.20914 8 6C8 3.79086 9.79086 2 12 2C14.2091 2 16 3.79086 16 6Z" fill="#e5e7eb"></path> <path d="M15.6782 13.5028C15.2051 13.5085 14.7642 13.5258 14.3799 13.5774C13.737 13.6639 13.0334 13.8705 12.4519 14.4519C11.8705 15.0333 11.6639 15.737 11.5775 16.3799C11.4998 16.9576 11.4999 17.6635 11.5 18.414V18.586C11.4999 19.3365 11.4998 20.0424 11.5775 20.6201C11.6381 21.0712 11.7579 21.5522 12.0249 22C12.0166 22 12.0083 22 12 22C4 22 4 19.9853 4 17.5C4 15.0147 7.58172 13 12 13C13.3262 13 14.577 13.1815 15.6782 13.5028Z" fill="#e5e7eb"></path> <path fill-rule="evenodd" clip-rule="evenodd" d="M16.5 22C14.8501 22 14.0251 22 13.5126 21.4874C13 20.9749 13 20.1499 13 18.5C13 16.8501 13 16.0251 13.5126 15.5126C14.0251 15 14.8501 15 16.5 15C18.1499 15 18.9749 15 19.4874 15.5126C20 16.0251 20 16.8501 20 18.5C20 20.1499 20 20.9749 19.4874 21.4874C18.9749 22 18.1499 22 16.5 22ZM18.468 17.7458C18.6958 17.518 18.6958 17.1487 18.468 16.9209C18.2402 16.693 17.8709 16.693 17.6431 16.9209L15.7222 18.8417L15.3569 18.4764C15.1291 18.2486 14.7598 18.2486 14.532 18.4764C14.3042 18.7042 14.3042 19.0736 14.532 19.3014L15.3097 20.0791C15.5375 20.307 15.9069 20.307 16.1347 20.0791L18.468 17.7458Z" fill="#e5e7eb"></path> </g></svg>    
    </div>
  </div>
  

</div>


        </>



    )
}

export default Box