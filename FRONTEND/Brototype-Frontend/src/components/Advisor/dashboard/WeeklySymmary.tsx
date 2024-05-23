
import ReactApexChart   from 'react-apexcharts'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  BarElement,

} from 'chart.js'
import { Chart } from 'react-chartjs-2'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  BarElement
)


import {  Bar} from 'react-chartjs-2'
import { useEffect, useState } from 'react'
import Api from '../../../utils/baseUrl/reviewBaseUrl'
import { useSelector } from 'react-redux'

const WeeklySummary = () => {
  //const advisorId:any = useSelector((state: RootState) => state?.advisor?.advisorData?.advisorId)
  const advisorId:any='612345678901234567890001'
   const [summaryData,setSummaryData]=useState([])
   useEffect(()=>{


    console.log('useEffect called in perfo');
    
      const weeklySummaryData=async()=>{

        try{
          const response=await Api.get(`/review-service/weekly-summary-graph/${advisorId}`)

          if(response.data.length){
          

            const data=response?.data?.map((value:any)=>value.count)

            setSummaryData(data)

              
            
          }else{
            setSummaryData([])
          }

        }
        catch(error){

        }
        
        

   


      }

        
      weeklySummaryData()


      

    },[])

  
  const data = {
    labels: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri','Sat'],
    datasets: [
      // {
      //   label: 'Failed',
      //   data: [],
      //   backgroundColor: '#FE4560',
      //   borderRadius: {
      //     topLeft:10,
      //     topRight:10,
      //     bottomRight:10,
      //     bottomLeft:10,

      //   }, // Set border radius for rounded corners
      //   borderSkipped:false,
      //   borderWidth:2,
      //   borderColor:'white'
      // },
      // {
      //   label: 'Pending',
      //   data: [],
      //   backgroundColor: '#FEAF1A',
      //   borderRadius: {
      //     topLeft:10,
      //     topRight:10,
      //     bottomRight:10,
      //     bottomLeft:10,

      //   },
      //   borderSkipped:false,
      //   borderWidth:2,
      //   borderColor:'white'
      // },
      {
        label: 'Completed',
        data: summaryData,
        backgroundColor: '#00E396',
        borderRadius: {
          topLeft:10,
          topRight:10,
          bottomRight:10,
          bottomLeft:10,

        },
        borderSkipped:false,
        borderWidth:2,
        borderColor:'white'
      },
    ],
  };;

  const options = {
    barPercentage:0.2,
    borderRadius:{
      topLeft:10,
      bottomLeft:10,
      topRight:10,
      bottomRight:10

    },
    scales: {
      x: {
        stacked: true, // Enable stacking for the x-axis
        
        grid: {
          display: false,
        
        },
        border: {
          display: false
        }
      },
      y: {
        stacked: true,
       
        grid: {
          display: false,
        
        },
        border: {
          display: false
        },
        ticks: {
          stepSize: 2 // Set the step size for the y-axis
      }
      },
      
    
   
    }
  }


  return (
    <div>
      <Bar data={data} options={options}  height={75} />

     
    </div>
  );
};



export default WeeklySummary