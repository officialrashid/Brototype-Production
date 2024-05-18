import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getStudentsAndPlacedStudents } from '../../../utils/methods/get';
import { Bar } from 'react-chartjs-2';

const Graph = () => {
  const superleadUniqueId: string = useSelector((state: any) => state?.superlead?.superleadData?.uniqueId) || localStorage.getItem("superleadUniqueId");
  const [activeStudents, setActiveStudents] = useState<number[]>([]);
  const [placedStudents, setPlacedStudents] = useState<number[]>([]);

  useEffect(() => {
    const fetchStudentsAndPlacedStudentsData = async () => {
      try {
        const response = await getStudentsAndPlacedStudents(superleadUniqueId);
        if (response?.status === true) {
          const activeStudentsData:any = [];
          const placedStudentsData:any = [];
          response.countsArray.forEach((data: any, index: number) => {
            const monthIndex = index < 9 ? `0${index + 1}` : `${index + 1}`;
            if (data.month === monthIndex) {
              activeStudentsData.push(data.activeCount);
              placedStudentsData.push(data.placedCount);
            }
          });
          setActiveStudents(activeStudentsData);
          setPlacedStudents(placedStudentsData);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchStudentsAndPlacedStudentsData();
  }, [superleadUniqueId]);

  const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul','Aug','Sep','Oct','Nov','Dec'],
    datasets: [
      {
        label: 'Students',
        data: activeStudents,
        backgroundColor: '#03c3ec',
        borderRadius: 20,
        borderSkipped: false,
        borderWidth: 2,
        borderColor: 'white'
      },
      {
        label: 'Placed',
        data: placedStudents,
        backgroundColor: '#8082FF',
        borderRadius: 20,
        borderSkipped: false,
        borderWidth: 2,
        borderColor: 'white'
      }
    ]
  };

  const options = {
    barPercentage: 0.3,
    borderRadius: {
      topLeft: 10,
      bottomLeft: 10,
      topRight: 10,
      bottomRight: 10
    },
    scales: {
      x: {
        stacked: true,
        grid: {
          display: false
        },
        border: {
          display: false
        }
      },
      y: {
        stacked: true,
        grid: {
          display: false
        },
        border: {
          display: false
        }
      }
    }
  };

  return (
    <div className="m-4 mt-0  mr-0 ">
      <Bar data={data} options={options} height={120} />
    </div>
  );
};

export default Graph;
