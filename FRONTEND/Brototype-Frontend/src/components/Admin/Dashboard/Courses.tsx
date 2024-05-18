
import { useEffect } from "react";
import * as echarts from 'echarts'


const Courses=()=>{
    useEffect(()=>{

        const chart=echarts.init( document.getElementById('myChart2'))
     
   
          const options = {
            tooltip: {
              trigger: 'item'
            },
            series: [
              {
                name: 'courses',
                type: 'pie',
                radius: ['70%', '80%'],
                avoidLabelOverlap: false,
                label: {
                  show: false,
                  position: 'center'
                },
                emphasis: {
                  label: {
                    show: true,
                    fontSize: 10,
                    fontWeight: 'bold'
                  }
                },
                labelLine: {
                  show: false
                },
                data: [
                  { value: 4, name: 'web  devlopment' , itemStyle: { color: 'rgba(180, 180, 180, 0.2)' }}, 
                  { value: 5, name: 'mobile app',  itemStyle: { color: 'rgba(84, 112, 198)' }},
                  { value: 6, name: 'AI' , itemStyle: { color: 'rgba(39, 189, 253)' }},
                  { value: 2, name: 'Cyber security', itemStyle: {  color: 'rgba(44, 123, 229)'  } },
                  { value: 4, name: 'Devops', itemStyle: { color:'rgba(115, 211, 254)'  } }
                ]
              }
            ]
          }
        
          chart.setOption(options)

          return ()=>{ chart.dispose()}

        

    },[])

    return (
        <>
        <div className="border border bg-white rounded-md ml-2 h-32  shadow-xl w-fit">
  <div className="m-4 mt-0 mb-0 flex  justify-between">
    <div>
      <div className='mt-2'>
        <span className=" text-xl">Courses</span>
      </div>
    <div>
          <span className="text-4xl text-gray-600">30</span>
    </div>
     <div className="bg-green-200 flex justify-center items-center w-fit rounded-full mt-3">
          <span className="text-xs px-2 py-0.5 ">+ 25%</span>
    </div>

    </div>
    <div className='mt-6 ml-10'>
    <div id="myChart2" style={{ width: '350%', height: '100px', padding:'0px', marginLeft:'45px'}} className='w-fit'></div>

    </div>
   
  </div>

</div>



        
        </>
    )
}

export default Courses