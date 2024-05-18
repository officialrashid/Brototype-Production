import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { getBestReviewers } from '../../../utils/methods/get';

const BestReviewers = () => {
    const [bestReviewers, setBestReviewers] = useState([])
    const bestEmployees = [
        { Name: "Yen", Role: "Advisor", Performance: "Good", profile: '/profile.jpeg' },
        { Name: "Adeela", Role: "Advisor", Performance: "Average", profile: '/profile.jpeg' },
        { Name: "Blessy", Role: "Advisor", Performance: "Poor", profile: '/profile.jpeg' },
        { Name: "Kiran", Role: "Advisor", Performance: "Outstanding", profile: '/profile.jpeg' }
    ];
    useEffect(() => {
        const fetchBestReviewers = async () => {
            try {
                const response = await getBestReviewers()
                console.log(response, "response on best five reviers");
                if (response.status === true) {
                    setBestReviewers(response?.response)
                }
            } catch (err) {
                toast.error("Internal Server Error")
            }
        }
        fetchBestReviewers()
    }, [])
    return (
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr className='text-sm font-roboto '>
                    <th scope="col" className="px-6 py-3">
                        Name
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Role
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Performe
                    </th>
                </tr>
            </thead>
            <tbody>
                {bestReviewers.map((reviewer, index) => (
                  <tr className="bg-white  dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 ">
                  <td className="flex items-center px-6 py-4 overflow-hidden  whitespace-normal" >
                   
                      <img className="w-8 h-8 rounded-full" src={reviewer.profile} alt=""/>
           
                      <div className="ps-3 ">
                          <div className="text-sm font-roboto" >
                       <span>{reviewer.firstName} {reviewer.lastName}</span>
                          </div>
                      </div>
                  </td>


                        <td className="px-6 py-4 text-sm font-roboto item text-center">
                            {reviewer.count}
                        </td>
                        <td className="px-6 py-4 text-sm font-roboto item text-center">
                            <span className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset cursor-pointer 
                            ${reviewer.count >= 150 ? 'bg-gray-50 text-Outstanding ring-Outstanding' :
                                    (reviewer.count >= 100 && reviewer.count <= 150) ? 'bg-green-50 text-Good ring-Good' :
                                        (reviewer.count >= 50 && reviewer.count < 100) ? 'bg-blue-50 text-Average ring-Average' :
                                            'bg--50 text-Poor ring-Poor'}`}>

                                {reviewer.count >= 150 ? 'Outstanding' :
                                    (reviewer.count >= 100 && reviewer.count <= 150) ? 'Good' :
                                        (reviewer.count >= 50 && reviewer.count < 100) ? 'Average' :
                                            'Poor'}
                            </span>

                        </td>

                    </tr>
                ))}
            </tbody>
        </table>
    );
}

export default BestReviewers;
