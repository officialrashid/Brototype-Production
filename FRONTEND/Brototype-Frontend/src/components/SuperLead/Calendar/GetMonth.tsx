// Month component
import React from "react";
import Day from "./Day";

interface MonthProps {
  month: any[][];
}

const Month: React.FC<MonthProps> = ({ month }) => {
console.log(month,"{}{}[[][][][[");

  
  return (
    <div className="flex-1 overflow-y-auto grid grid-cols-7 grid-rows-5">
      {month.map((row, i) => (
        <React.Fragment key={i}>
          {row.map((day, idx) => (
            <Day day={day} key={idx} rowIdx={i} />
          ))}
        </React.Fragment>
      ))}
    </div>
  );
}

export default Month;
