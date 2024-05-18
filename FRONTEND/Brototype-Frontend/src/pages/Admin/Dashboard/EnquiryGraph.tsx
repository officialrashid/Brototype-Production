import ReactApexChart from "react-apexcharts"

const EnquiryGraph=()=>{
    const  series= [{
        name: 'series1',
        data: [31, 40, 28, 51, 42, 109, 100]
      }]
     const options= {
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
        colors:['#000000']
       

      }


    return (
        <>
        
        <ReactApexChart  series={series} type="area"   options={options} height={350}/>
        </>
    )
}


export default EnquiryGraph