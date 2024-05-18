import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import { useSelector } from "react-redux";
import { getHubWiseStudentsDetails, getReviewCountAnalyze } from "../../../utils/methods/get";

const BestReviewersGraph = () => {
    const [series, setSeries] = useState<number[]>([]);
    const superleadUniqueId: string = useSelector((state: any) => state?.superlead?.superleadData?.uniqueId) || localStorage.getItem("superleadUniqueId");
    const [analyzeDetails, setAnalyzeDetails] = useState("");

    useEffect(() => {
        const fetchHubWiseStudentDetails = async () => {
            try {
                const response = await getHubWiseStudentsDetails(superleadUniqueId);
                console.log(response, "response inside sections");
                if (response.status === true) {
                    setAnalyzeDetails(response);
                }
            } catch (err) {
                // Handle the error message
            }
        }
        fetchHubWiseStudentDetails();
    }, []);

    useEffect(() => {
        const fetchReviewCountAnalyze = async () => {
            try {
                const response = await getReviewCountAnalyze();
                console.log(response, "response in frontend for analyze graphs");
                if (response?.status === true) {
                    let Outstanding = 0;
                    let Good = 0;
                    let Average = 0;
                    let Poor = 0;

                    response?.response?.forEach((data: any) => {
                        if (data.count >= 150) {
                            Outstanding++;
                        } else if (data.count >= 100 && data.count <= 150) {
                            Good++;
                        } else if (data.count >= 50 && data.count <= 100) {
                            Average++;
                        } else if (data.count >= 0 && data.count <= 50) {
                            Poor++;
                        }
                    });

                    setSeries([Good, Average, Poor, Outstanding]);
                }
            } catch (error) {
                // Handle error
            }
        };
        fetchReviewCountAnalyze();
    }, []);
    const [options] = useState({
        chart: {
            width: 380,
            type: 'donut',
        },
        dataLabels: {
            enabled: false,
        },
        responsive: [{
            breakpoint: 480,
            options: {
                chart: {
                    width: 200
                },
                legend: {
                    show: false
                }
            }
        }],
        legend: {
            show: false,
        },
        labels: ['Good', 'Average', 'Poor', 'Outstanding'], // Change series names
        fill: {
            colors: ['#70DD38', '#8082FF', '#03c3ec','#8492A3']
        },
        stroke: {

            width: 8,

        },
        plotOptions: {
            pie: {
                donut: {
                    labels: {
                        show: true,
                        name: {
                            show: true,
                            fontSize: 12,
                            offsetY: 3
                        },
                        value: {
                            show: true,
                            fontSize: 15,
                            offsetY: 3
                        }
                    }
                }
            }
        }
    });

    return (
        <div>
            <div className="chart-wrap ">
                <div id="chart" className="flex flex-row justify-between  ">
                    <div className="m-2 mt-5">
                        <span className="text-2xl font-roboto ">{analyzeDetails.reviewersCount??0}</span><br></br>
                        <span className="text-sm font-roboto text-gray-500">Reviewers</span>
                    </div>
                    <ReactApexChart options={options} series={series} type="donut" width={180} />
                </div>
            </div>
        </div>
    );
}

export default BestReviewersGraph;
