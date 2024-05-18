import { useContext } from "react";
import GlobalContext from "../../../context/GlobalContext";
import dayjs from "dayjs";

const Calendar = () => {
  const { monthIndex, setMonthIndex } = useContext(GlobalContext);

  const handlePrevMonth = () => {
    setMonthIndex(monthIndex - 1);
  };

  const handleNextMonth = () => {
    setMonthIndex(monthIndex + 1);
  };

  const handleReset = () => {
    setMonthIndex(
      monthIndex === dayjs().month() ? monthIndex + Math.random() : dayjs().month()
    );
  };

  return (
    <header className="px-4 py-2 flex items-center">
      <img src="/logo (1).png" alt="calendar" className="mr-2 w-7 h-7" />
      <h1 className="mr-10 font-roboto font-medium">Calendar</h1>
      <button className="border rounded py-1 px-4 mr-5 font-roboto" onClick={handleReset}>
        Today
      </button>
      <button onClick={handlePrevMonth}>
        <span className="material-icons-outlined cursor-pointer text-gray-600 mx-2">
          chevron_left
        </span>
      </button>
      <button onClick={handleNextMonth}>
        <span className="material-icons-outlined cursor-pointer text-gray-600 mx-2">
          chevron_right
        </span>
      </button>
      <h2 className="ml-4 text-xl text-gray-500 font-roboto">
        {dayjs(new Date(dayjs().year(), monthIndex)).format("MMMM YYYY")}
      </h2>
    </header>
  );
};

export default Calendar;
