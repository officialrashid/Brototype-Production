

const Rating = () => {
    const reviewer = [
        { id: 1, Rating: 'Excellent', progress: 80, },
        { id: 2, Rating: 'Very Good', progress: 10 },
        { id: 3, Rating: 'Good', progress: 35, },
        { id: 4, Rating: 'Fair', progress: 45, },
        { id: 5, Rating: 'Poor', progress: 65, },
    ];
    return (
        <div className="w-22.5rem h-auto bg-white right-6  mt-34rem rounded-xl  border border-gray-300 hover hover:border-2 border-gray-300 absolute">
            <h1 className="ml-3 mt-3 text-sm font-poppins font-medium">Your Rating</h1>
            <div className="flex flex-row justify-between p- border-b ">
                <div className="w-28">
                
                    {reviewer.map((reviewer) => (
                        <div key={reviewer.id} className="flex items-center">
                            <p className="text-sm text-gray-400 font-roboto ml-3 mt-3">{reviewer.Rating}</p>
                        </div>
                    ))}
                </div>

                <div className="">
             
                    {reviewer.map((reviewer) => (
                        <div key={reviewer.id} className="w-48 flex">
                            <div className="w-36 bg-gray-200 rounded-full h-1.5 dark:bg-gray-700 mt-6  ">
                                <div
                                    className={`h-1.5 rounded-full ${reviewer.progress >= 80
                                        ? 'bg-green-400'
                                        : reviewer.progress >= 60
                                            ? 'bg-yellow-500'
                                            : reviewer.progress >= 40
                                                ? 'bg-orange-500'
                                                : reviewer.progress >= 20
                                                    ? 'bg-red-500'
                                                    : reviewer.progress >= 0 && reviewer.progress <= 19
                                                        ? 'bg-blue-500'
                                                        : ''
                                        }`}
                                    style={{ width: `${reviewer.progress}%` }}
                                ></div>

                            </div>
                            <span
                                className={`text-xs font-roboto ml-3 mt-3 ${reviewer.progress >= 80
                                    ? 'text-green-400'
                                    : reviewer.progress >= 60
                                        ? 'text-yellow-500'
                                        : reviewer.progress >= 40
                                            ? 'text-orange-500'
                                            : reviewer.progress >= 20
                                                ? 'text-red-500'
                                                : reviewer.progress >= 0 && reviewer.progress <= 19
                                                    ? 'text-blue-500'
                                                    : '' // Set a default color or leave empty if needed
                                    }`}
                            >
                                {reviewer.progress}%
                            </span>
                        </div>
                    ))}
                </div>


            </div>
        </div>
    );
}

export default Rating;
