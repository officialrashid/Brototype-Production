import ToDoCalender from "./TodoCalender"
const ToDoProfile = () => {

  return (
    <>
      <div className=" w-2/5   m-4 ">
        <div className="border border-2px  bg-white  rounded-lg h-fit mb-8">
          <div className="flex m-6 gap-8 ">
            <div className="border px-10 py-5 rounded-md">
            </div>
            <div>
              <div>
                <span className="font-bold">
                  Hi John,
                </span>
              </div>
              <div className="text-sm ">
                <span>
                  You have already 2 tasks pending.One is high priority and other two 2 have low peiority.Already completed task 3 tasks today.
                </span>
              </div>
            </div>
          </div>
        </div>
        <ToDoCalender />
      </div>
    </>
  )
}

export default ToDoProfile