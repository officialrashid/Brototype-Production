import ReactApexChart from "react-apexcharts"
import { useSelector } from "react-redux";

const PerformanceGraph=({graphHeight})=>{
  const advisorId: any = useSelector((state: RootState) => state?.advisor?.advisorData?.advisorId);
  console.log(advisorId,"lllllllll");
  
   const  series= [{
        name: 'series1',
        data: [31, 40, 28, 51, 42, 109, 100]
      }]
     const optionsss= {
      grid:{
        show:false

      },
       
        chart: {
        
          type: 'line',
          toolbar: {
            show: false,
          }
        },
        dataLabels: {
          enabled: false
        },
        stroke: {
          curve: 'smooth'
        },
        xaxis: {
          type: 'datetime',
          categories: ["2018-09-19T00:00:00.000Z", "2018-09-19T01:30:00.000Z", "2018-09-19T02:30:00.000Z", "2018-09-19T03:30:00.000Z", "2018-09-19T04:30:00.000Z", "2018-09-19T05:30:00.000Z", "2018-09-19T06:30:00.000Z"]
        },
        tooltip: {
          x: {
            format: 'dd/MM/yy HH:mm'
          },
   
        },
        colors:['#347dc1']
       

      }
    
    
    
  

    return (
        <>
        <div>
            
        </div>
<ReactApexChart    series={series} type="area"   options={optionsss} height={graphHeight}/>


        
        </>
    )
}

export default PerformanceGraph