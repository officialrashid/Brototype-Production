import { useEffect, useState } from "react";
import { getCourseCompletion } from "../../../utils/methods/get";
import ApexCharts from 'react-apexcharts';
import { setStudentData } from "../../../redux-toolkit/studentReducer"
import { useSelector } from "react-redux";
import { RootState } from "../../../redux-toolkit/store";
import { useNavigate } from "react-router-dom";
const CourseCompletionGraph = () => {
    const [courseCompletion, setCourseCompletion] = useState(0);
    const navigate = useNavigate()
    const studentId:any = useSelector((state: RootState) => state?.student?.studentData?.studentId);
    const batchId:any = useSelector((state: RootState) => state?.student?.studentData?.batchId);
    useEffect(() => {
        const fetchCourseCompletion = async () => {
            
           
            const data = {
                batchId,
                studentId,
            };

            try {
                const response = await getCourseCompletion(data);
                const percentage = parseInt(response.response.percentageCompleted);
                if(percentage > 0){
                    setCourseCompletion(percentage);
                }else{
                    setCourseCompletion(0) 
                }
      
            } catch (error) {
                console.error('Error fetching course completion:', error);
            }
        };

        fetchCourseCompletion();
    }, []); // Empty dependency array to run the effect only once on component mount

    const chartOptions = {
        series: [courseCompletion ?? 0], // Using nullish coalescing operator for conditional rendering
        chart: {
            height: 230,
            type: 'radialBar',
            offsetY: -5,
        },
        plotOptions: {
            radialBar: {
                startAngle: -135,
                endAngle: 135,
                dataLabels: {
                    name: {
                        fontSize: '16px',
                        color: undefined,
                        offsetY: 120,
                    },
                    value: {
                        offsetY: 76,
                        fontSize: '13px',
                        color: '#715DA6',
                        formatter: function (val) {
                            return val + '%';
                        },
                    },
                },
            },
        },
        fill: {
            type: 'gradient',
            gradient: {
                shade: 'dark',
                shadeIntensity: 0.15,
                inverseColors: false,
                opacityFrom: 1,
                opacityTo: 1,
                stops: [0, 50, 65, 91],
                colorStops: [{
                    offset: 0,
                    color: '#715DA6'
                }]
            },
        },
        stroke: {
            dashArray: 1,
        },
        labels: ['']
    };

    return (
        <div className="w-22.5rem h-auto bg-white right-6 mb-48rem mt-20.6rem rounded-xl shadow-xl border border-gray-300 hover hover:border-2 border-gray-300 absolute">
            <ApexCharts options={chartOptions} series={chartOptions.series} type="radialBar" height={230} />
            <h1 className="text-sm font-roboto ml-28 ">Course Completion Ratio</h1>
        </div>
    );
}

export default CourseCompletionGraph;
