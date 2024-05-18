import React from 'react';
import Advisor from '../../Advisor /advisors/Advisor';

const BestEmployees = () => {
    const bestEmployees = [
        { Name: "Yen", Role: "Advisor", Performance: "Good", profile: '/profile.jpeg' },
        { Name: "Adeela", Role: "Advisor", Performance: "Average", profile: '/profile.jpeg' },
        { Name: "Blessy", Role: "Advisor", Performance: "Poor", profile: '/profile.jpeg' },
        { Name: "Kiran", Role: "Advisor", Performance: "Outstanding", profile: '/profile.jpeg' },
        { Name: "Kiran", Role: "Advisor", Performance: "Outstanding", profile: '/profile.jpeg' },
        { Name: "Kiran", Role: "Advisor", Performance: "Outstanding", profile: '/profile.jpeg' }
    ];

    return (
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr className='text-sm font-roboto'>
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
                {bestEmployees.map((advisor, index) => (
                    <tr key={index} className="bg-white  dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                        <td className="flex items-center px-6 py-4 whitespace-nowrap">
                            <img className="w-8 h-8 rounded-full" src={advisor.profile} alt={advisor.Name} />
                            <div className="ps-3">
                                <div className=" text-sm font-roboto">{advisor.Name}</div>
                            </div>
                        </td>
                        <td className="px-6 py-4 text-sm font-roboto item text-center">
                            {advisor.Role}
                        </td>
                        <td className="px-6 py-4 text-sm font-roboto item text-center">
                            <span className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset cursor-pointer ${advisor.Performance === 'Good' ? 'bg-green-50 text-Good ring-Good' :
                                    advisor.Performance === 'Average' ? 'bg-blue-50 text-Average ring-Average' :
                                        advisor.Performance === 'Poor' ? 'bg-blue-10 text-Poor ring-Poor' :
                                            advisor.Performance === 'Outstanding' ? 'bg-gray-50 text-Outstanding ring-Outstanding' :
                                                ''
                                }`}>
                                {advisor.Performance}
                            </span>

                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

export default BestEmployees;
