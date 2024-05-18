import * as echarts from 'echarts'
import { useEffect } from 'react'

const Enquiry=()=>{

    useEffect(()=>{

        const chart=echarts.init( document.getElementById('myChart'))
        const options = {
            // your ECharts options here
            xAxis: {
              type: 'category',
              data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'jun', 'july','Aug','Sept','Oct','Nov','Dec'],
              show:false,
              splitLine: {
                show: false 
              }
            },
            yAxis: {
              type: 'value',
              show:false,
              splitLine: {
                show: false  
              }
            },

            tooltip: { 
                backgroundColor: '#fff', // Background color of the tooltip
                textStyle: {
                  color: '#000000', // Text color of the tooltip
                  fontSize: 12
                },
                borderColor:'#fff'
              
               
              },
            series: [{
              data: [820, 932, 901, 934, 1290, 1330, 1320,1234,132,1433,1934,0],
              type: 'bar',
      
              barWidth: 5, 
              itemStyle: {
                
                normal: {
                  barBorderRadius: [4, 4, 4, 4] 
                }
              },
      backgroundStyle: {
        color: 'rgba(180, 180, 180, 0.2)'
      },

            },
           
        
        
        ],
            grid:{
                width:140,
                height:70,
                left:'20%',
                right:'%',
                bottom:'%',
                top:'5%'
                
            },
            
          };

          chart.setOption(options)
          

          return ()=>{ chart.dispose()}

        

    },[])
    return (
        <>
<div className="border border bg-white rounded-md  h-32  w-68 ml-2 shadow-xl">
  <div className="m-4 mt-0 mb-0 flex  justify-between">
    <div>
      <div className='mt-2'>
        <span className=" text-xl">Enquiries</span>
      </div>
    <div>
          <span className="text-4xl text-gray-600">125</span>
    </div>
     <div className="bg-green-200 flex justify-center items-center w-fit rounded-full mt-3">
          <span className="text-xs px-2 py-0.5 ">+ 25%</span>
    </div>

    </div>
    <div className='mt-6 ml-10'>
    <div id="myChart" style={{ width: '200%', height: '400px', }} className='w-fit'></div>

    </div>
   
  </div>

</div>


        </>
    )
}


export default Enquiry