
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

const WeeklySummary = () => {
  const data = {
    labels: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri','Sat'],
    datasets: [
      {
        label: 'Failed',
        data: [10, 20, 30, 40, 50, 60,20],
        backgroundColor: '#FE4560',
        borderRadius: {
          topLeft:10,
          topRight:10,
          bottomRight:10,
          bottomLeft:10,

        }, // Set border radius for rounded corners
        borderSkipped:false,
        borderWidth:2,
        borderColor:'white'
      },
      {
        label: 'Pending',
        data: [15, 25, 35, 45, 55, 65,20],
        backgroundColor: '#FEAF1A',
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
      {
        label: 'Completed',
        data: [20, 30, 40, 50, 60, 70,20],
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