import React from 'react';


const AdvisorReviewTarget = () => {
    const bestEmployees = [
        { No: 1, Name: "Yen", ReviewCount: 100, profile: '/profile.jpeg' },
        { No: 2, Name: "Adeela", ReviewCount: 150, profile: '/profile.jpeg' },
        { No: 3, Name: "Blessy", ReviewCount: 180, profile: '/profile.jpeg' },
        { No: 4, Name: "Kiran", ReviewCount: 75, profile: '/profile.jpeg' },
        { No: 5, Name: "Kiran", ReviewCount: 20, profile: '/profile.jpeg' }
    ];

    return (
        <>
        <table className="w-full  text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-sm  bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr className='text-sm font-roboto '>
                    <th scope="col" className="px-2 py-2 ">
                        No
                    </th>
                    <th scope="col" className="px-10 py-6">
                        Name
                    </th>
                    <th scope="col" className="px-10 py-6 text item-center">
                        Review Count
                    </th>
                    <th scope="col" className="px-20 py-3">
                        Analyze
                    </th>
                </tr>
            </thead>
            <tbody>
                {bestEmployees.map((advisor, index) => {
                    const ReviewTargetRatio = (advisor.ReviewCount / 200) * 100;
                    return (
                        <tr key={index} className="bg-white dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                            <td className="px-2 py-2 text-sm font-roboto item text-center">
                                {advisor.No}
                            </td>
                            <td className="flex items-center px-8 py-6 whitespace-nowrap">
                                <img className="w-8 h-8 rounded-full" src={advisor.profile} alt={advisor.Name} />
                                <div className="ps-3">
                                    <div className="text-sm font-roboto">{advisor.Name}</div>
                                </div>
                            </td>
                            <td className="px-2 py-2 text-sm font-roboto item text-center">
                                {advisor.ReviewCount}
                            </td>
                            <td className="px-6 py-4 text-sm font-roboto item text-center">
                                <div className="flex items-center">
                                   
                                        <div key={index} className="w-48 flex">
                                            <div className="w-36 bg-gray-200 rounded-full h-1.5 dark:bg-gray-700 mt-5">
                                                <div
                                                    className={`h-1.5 rounded-full ${ReviewTargetRatio >= 80
                                                        ? 'bg-Good'
                                                        : ReviewTargetRatio >= 60
                                                            ? 'bg-Average'
                                                            : ReviewTargetRatio >= 40
                                                                ? 'bg-Poor'
                                                                : ReviewTargetRatio >= 20
                                                                    ? 'bg-yellow-500'
                                                                    : ReviewTargetRatio >= 0 && ReviewTargetRatio <= 19
                                                                        ? 'bg-red-600'
                                                                        : ''
                                                        }`}
                                                    style={{ width: `${ReviewTargetRatio}%` }}
                                                ></div>
                                            </div>
                                            <span
                                                className={`text-xs font-roboto ml-3 mt-4 ${ReviewTargetRatio >= 80
                                                    ? 'text-Good'
                                                    : ReviewTargetRatio >= 60
                                                        ? 'text-Average'
                                                        : ReviewTargetRatio >= 40
                                                            ? 'text-Poor'
                                                            : ReviewTargetRatio >= 20
                                                                ? 'text-orange-500'
                                                                : ReviewTargetRatio >= 0 && ReviewTargetRatio <= 19
                                                                    ? 'text-red-500'
                                                                    : '' // Set a default color or leave empty if needed
                                                    }`}
                                            >
                                                {ReviewTargetRatio}%
                                            </span>
                                        </div>
                                    </div>
                        
                           
                            </td>
                        </tr>
                    );
                })}
            </tbody>

        </table>

       </>
    );
}

export default AdvisorReviewTarget;
