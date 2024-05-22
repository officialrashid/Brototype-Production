import { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts"
import { useSelector } from "react-redux";
import Api from "../../../utils/baseUrl/reviewBaseUrl";

const PerformanceGraph=({graphHeight})=>{
  //const advisorId: any = useSelector((state: RootState) => state?.advisor?.advisorData?.advisorId);
  const advisorId:any='612345678901234567890001'
   const [performanceData,setPerformanceData]=useState([])
   const [monthData,setMonthData]=useState([])
  console.log(advisorId,"lllllllll");
 useEffect(()=>{


    console.log('useEffect called in performcac');
    
      const performanceData=async()=>{

        try{
          const response=await Api.get(`/review/performance-graph/${advisorId}`)

          if(response.data.length){
            console.log(response.data,'response.data');

            const monthData=response?.data?.map((value:any)=>value.month)
            const reviewCountData=response?.data?.map((value:any)=>value.reviewCount)
            console.log(reviewCountData,'ddd');
            setPerformanceData(reviewCountData)
            console.log(monthData,'monthhh');
            
            setMonthData(monthData)

   
          }else{
            setPerformanceData([])
          }

        }
        catch(error){

        }
        
        

   


      }

        
      performanceData()


      

    },[])








    
  //  const  series= [{
  //       name: 'series1',
  //       data: performanceData
  //     }]
  //    const optionsss= {
  //     grid:{
  //       show:false

  //     },
       
  //       chart: {
        
  //         type: 'line',
  //         toolbar: {
  //           show: false,
  //         }
  //       },
  //       dataLabels: {
  //         enabled: false
  //       },
  //       stroke: {
  //         curve: 'smooth'
  //       },
  //       xaxis: {
  //         type: 'month',
  //         categories:[ '24-May', '24-Jun', '24-Jul', '24-Aug', '24-Sep', '24-Oct', '24-Nov', '24-Dec' ]

  //       },
  //       tooltip: {
  //         x: {
  //           format: 'dd/MM/yy HH:mm'
  //         },
   
  //       },
  //       colors:['#347dc1']
       

  //     }
    
  const series = [{
    name: 'reviews',
    data: performanceData
}];

const optionsss = {
    grid: {
        show: false
    },
    chart: {
        type: 'line',
        toolbar: {
            show: false
        }
    },
    dataLabels: {
        enabled: false
    },
    stroke: {
        curve: 'smooth'
    },
    xaxis: {
        type: 'month',
        categories: ['24-May', '24-Jun', '24-Jul', '24-Aug', '24-Sep', '24-Oct', '24-Nov', '24-Dec']
    },
    tooltip: {
        x: {
            format: 'dd/MM/yy HH:mm'
        }
    },
    colors: ['#347dc1'],
    yaxis: {
        tickAmount: 2, // Specify the number of ticks you want on the y-axis
        labels: {
            formatter: function (val) {
                return val.toFixed(0); // Ensure the label values are integers
            }
        },
        min: 0, // Set the minimum value of the y-axis
        max: 100, // Set the maximum value of the y-axis
    }
};

// Render the chart with the provided series and options
const chart = new ApexCharts(document.querySelector("#chart"), optionsss);
chart.render();

    
    
  

    return (
        <>
        <div>
            
        </div>
<ReactApexChart    series={series} type="area"   options={optionsss} height={graphHeight}/>


        
        </>
    )
}

export default PerformanceGraph