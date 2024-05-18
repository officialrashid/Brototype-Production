const TodoModal = ({ isVisible, onclose }) => {
    if (!isVisible) return null
    return (
        <>
            <div className="fixed inset-0 bg-opacity-20 backdrop-blur-sm flex justify-center items-center   overflow-y-scroll overflow-hidden z-40">
                <div className="border border-2px rounded-md w-1/2 m-10 bg-white">
                    <div className="flex justify-between m-7 ml-6">
                        <div className="">
                            <span className="text-xl">New Task</span>
                        </div>
                        <div onClick={() => { onclose() }}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-7 h-7">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                    </div>
                    <div className="m-3 ml-6">
                        <div className="mt-2">
                            <div className="mb-2">
                                <span className="text-gray-500">Name</span>

                            </div>
                            <input type="text " className=" w-full mb-2 border border-2px py-4 px-2 rounded-md outline-black" placeholder="Enter your task...." />
                        </div>
                        <div className="mt-2">
                            <div className="mb-2">
                                <span className="text-gray-500">Practise area</span>
                            </div>
                            <input type="text " className=" w-full mb-2 border border-2px py-4  px-2 rounded-md outline-black" placeholder="Enter your task...." />
                        </div>
                        <div className="mt-2">
                            <div className="mb-2">
                                <span className="text-gray-500">Practise area</span>
                            </div>
                            <textarea name="" id="" rows={7} placeholder="Add description......" className="border w-full rounded-md outline-black px-2 py-2" ></textarea>
                        </div>
                        <div className="flex gap-2 justify-end mt-3" >

                            <div >
                                <button className="px-4 bg-black text-white rounded-md py-1" onClick={() => { onclose() }}>Cancel</button>
                            </div>
                            <div>
                                <button className="px-4 bg-black text-white rounded-md py-1">Submit</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default TodoModal