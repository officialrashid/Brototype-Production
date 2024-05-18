
import { useEffect, useState } from "react";
import ReactApexChart from 'react-apexcharts'
import { getAllPerformance } from "../../../utils/methods/get";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux-toolkit/store";

const StudentGraph = () => {
  const [studentDetails, setStudentDetails] = useState("")
  const studentId: any = useSelector((state: RootState) => state?.student?.studentData?.studentId);
  const batchId:any = useSelector((state: RootState) => state?.student?.studentData?.batchId);
  useEffect(() => {

    const fetchAllPerformance = async () => {
      try {
        const data = {
          batchId,
          studentId,
        };
        const response = await getAllPerformance(data)
        console.log(response, "responseeee fectttttttttt");

        setStudentDetails(response.data)

      } catch (err) {
        return { status: false, message: "not get details" }
      }
    }
    fetchAllPerformance()
  }, [])
  const [state, setState] = useState({
    series: [
      {
        name: 'Completed',
        data: [31, 40, 28, 51, 42, 109, 100],

      },
      {
        name: 'Not Completed',
        data: [11, 32, 45, 32, 34, 52, 41],

      },

    ],
    options: {
      chart: {
        height: 350,
        type: 'area',
        toolbar: {
          show: false,
          offsetX: 0,
          offsetY: 0,
          tools: {
            zoom: '',
            zoomin: false,
            zoomout: false,
            download: false,
            selection: false,
            pan: false,
            reset: ''
          }
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: 'smooth',
        width: 2,
      },
      xaxis: {
        type: 'Day',
        categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      },
      tooltip: {
        x: {
          format: 'dd/MM/yy HH:mm',
        },
      },
      colors: ['#00ff00', '#ff0000'],
    },
  });
  return (
    <>
      <div className="flex h-16rem">
        <div className="grid grid-rows-2 grid-flow-col gap-2 w-80 h-72 mt-3 ml-5 ">
          <div className="bg-white shadow-xl rounded-xl border border-gray-300 hover hover:border-2 border-gray-300">
            <div className="bg-custom-background w-12 h-10 ml-8 mt-5 rounded-md shadow-sm flex ">
              <img src="/success.png" alt="" className="h-10 ml-1 " />
              <h1 className="font-roboto text-2xl ml-8 font-medium mt-1 ">{studentDetails?.weekCompleted ?? 0}</h1>
            </div>

            <h1 className="font-roboto text-sm ml-4 font-medium mt-7 text-gray-400 absolute">Total Week Completed</h1>
            <img src="/success.png" alt="" className="h-16 w-16 ml-20 relative mt-2 mt-0 opacity-5" />
          </div>
          <div className="bg-white shadow-xl rounded-xl border border-gray-300 hover hover:border-2 border-gray-300">
            <div className="bg-custom-background w-12 h-10 ml-8 mt-5 rounded-md shadow-sm flex ">
              <img src="weekPerformance.png" alt="" className="h-10 ml-1 " />
              <h1 className="font-roboto text-2xl ml-8 font-medium mt-1 ">{studentDetails?.lastWeekToatalMark ?? 0}</h1>
            </div>

            <h1 className="font-roboto text-sm ml-4 font-medium mt-7 text-gray-400 absolute">Weekly Performance</h1>
            <img src="/weekPerformance.png" alt="" className="h-16 w-16 ml-20 relative mt-2 mt-0 opacity-5" />
          </div>
          <div className="bg-white shadow-xl rounded-xl border border-gray-300 hover hover:border-2 border-gray-300">
            <div className="bg-custom-background w-12 h-10 ml-8 mt-5 rounded-md shadow-sm flex ">
              <img src="/performance (1).png" alt="" className="h-10 ml-1 " />
              <h1 className="font-roboto text-2xl ml-6 font-medium mt-1">
                {studentDetails?.overallPerformance > 0 ?
                  `${parseInt(studentDetails?.overallPerformance, 10) ?? 0}%` :
                  '0%'
                }
              </h1>

            </div>

            <h1 className="font-roboto text-sm ml-4 font-medium mt-7 text-gray-400 absolute">Overall Performance</h1>
            <img src="/performance (1).png" alt="" className="h-16 w-16 ml-20 relative mt-2 mt-0 opacity-5" />
          </div>
          <div className="bg-white shadow-xl rounded-xl border border-gray-300 hover hover:border-2 border-gray-300">
            <div className="bg-custom-background w-12 h-10 ml-8 mt-5 rounded-md shadow-sm flex ">
              <img src="/failure.png" alt="" className="h-10 ml-1 " />
              <h1 className="font-roboto text-2xl ml-8 font-medium mt-1 ">{studentDetails?.repeatCount ?? 0}</h1>
            </div>

            <h1 className="font-roboto text-sm ml-4 font-medium mt-7 text-gray-400 absolute">Total Repeat</h1>
            <img src="/failure.png" alt="" className="h-16 w-16 ml-20 relative mt-2 mt-0 opacity-5" />
          </div>

        </div>
        <div className="w-25.2rem h-72 bg-white ml-3 mb-48rem mt-3 rounded-xl shadow-xl border border-gray-300 hover hover:border-2 border-gray-300">

          <ReactApexChart options={state?.options} series={state?.series} type="area" height={280} />
        </div>

      </div>
    </>
  );
}

export default StudentGraph;

