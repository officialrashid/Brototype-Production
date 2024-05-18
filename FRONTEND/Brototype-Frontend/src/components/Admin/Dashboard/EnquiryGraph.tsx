import { useEffect } from "react"
import ReactApexChart from "react-apexcharts"

const EnquiryGraph=()=>{


  useEffect(()=>{

    // [
    //   {
    //     '$group': {
    //       '_id': {
    //         '$dateToString': {
    //           'format': '%Y-%m', 
    //           'date': '$createdAt'
    //         }
    //       }, 
    //       'enquiryCount': {
    //         '$sum': 1
    //       }
    //     }
    //   }, {
    //     '$project': {
    //       '_id': 0, 
    //       'month': {
    //         '$concat': [
    //           {
    //             '$substr': [
    //               '$_id', 2, 2
    //             ]
    //           }, '-', {
    //             '$switch': {
    //               'branches': [
    //                 {
    //                   'case': {
    //                     '$eq': [
    //                       {
    //                         '$substr': [
    //                           '$_id', 5, 2
    //                         ]
    //                       }, '01'
    //                     ]
    //                   }, 
    //                   'then': 'jan'
    //                 }, {
    //                   'case': {
    //                     '$eq': [
    //                       {
    //                         '$substr': [
    //                           '$_id', 5, 2
    //                         ]
    //                       }, '02'
    //                     ]
    //                   }, 
    //                   'then': 'Feb'
    //                 }, {
    //                   'case': {
    //                     '$eq': [
    //                       {
    //                         '$substr': [
    //                           '$_id', 5, 2
    //                         ]
    //                       }, '03'
    //                     ]
    //                   }, 
    //                   'then': 'Mar'
    //                 }, {
    //                   'case': {
    //                     '$eq': [
    //                       {
    //                         '$substr': [
    //                           '$_id', 5, 2
    //                         ]
    //                       }, '04'
    //                     ]
    //                   }, 
    //                   'then': 'Apr'
    //                 }, {
    //                   'case': {
    //                     '$eq': [
    //                       {
    //                         '$substr': [
    //                           '$_id', 5, 2
    //                         ]
    //                       }, '05'
    //                     ]
    //                   }, 
    //                   'then': 'May'
    //                 }, {
    //                   'case': {
    //                     '$eq': [
    //                       {
    //                         '$substr': [
    //                           '$_id', 5, 2
    //                         ]
    //                       }, '06'
    //                     ]
    //                   }, 
    //                   'then': 'june'
    //                 }, {
    //                   'case': {
    //                     '$eq': [
    //                       {
    //                         '$substr': [
    //                           '$_id', 5, 2
    //                         ]
    //                       }, '07'
    //                     ]
    //                   }, 
    //                   'then': 'july'
    //                 }, {
    //                   'case': {
    //                     '$eq': [
    //                       {
    //                         '$substr': [
    //                           '$_id', 5, 2
    //                         ]
    //                       }, '08'
    //                     ]
    //                   }, 
    //                   'then': 'Aug'
    //                 }, {
    //                   'case': {
    //                     '$eq': [
    //                       {
    //                         '$substr': [
    //                           '$_id', 5, 2
    //                         ]
    //                       }, '09'
    //                     ]
    //                   }, 
    //                   'then': 'sept'
    //                 }, {
    //                   'case': {
    //                     '$eq': [
    //                       {
    //                         '$substr': [
    //                           '$_id', 5, 2
    //                         ]
    //                       }, '10'
    //                     ]
    //                   }, 
    //                   'then': 'oct'
    //                 }, {
    //                   'case': {
    //                     '$eq': [
    //                       {
    //                         '$substr': [
    //                           '$_id', 5, 2
    //                         ]
    //                       }, '11'
    //                     ]
    //                   }, 
    //                   'then': 'Nov'
    //                 }, {
    //                   'case': {
    //                     '$eq': [
    //                       {
    //                         '$substr': [
    //                           '$_id', 5, 2
    //                         ]
    //                       }, '12'
    //                     ]
    //                   }, 
    //                   'then': 'Dec'
    //                 }
    //               ], 
    //               'default': ' '
    //             }
    //           }
    //         ]
    //       }, 
    //       'enquiryCount': 1
    //     }
    //   }
    // ]


    console.log('new performance graph useEffect called');
    

  },[])
    const  series= [{
        name: 'series1',
        data: [31,40,28]
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
          type: 'month',
          categories: ['Jan','Feb','Mar','Apr','May','June','July','Aug','sept','oct','Nov','Dec']
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
        
        <ReactApexChart    series={series} type="area"   options={options} height={350}/>
        </>
    )
}


export default EnquiryGraph