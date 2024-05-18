import React from 'react';
import SuperLeadDetails from './superLeadDetails';
import BestEmployeeGraph from './BestEmployeeGraph';
import BestEmployees from './BestEmployees';

const SideSections = () => {
    return (
        <>
            <div className="  mt-0  mr-0   ">


                <div>
                    <SuperLeadDetails />
                </div>
                <div className="border m-4 ml-0 mt-7  rounded-md bg-white w-full  ">
                  
                  <div className="m-2 mb-0 ">
                      <span className="font-semibold font-roboto">Best 5 Reviewer</span>
                      <BestEmployeeGraph/>
                  </div>
                 <BestEmployees/>
            
                  </div>
              

            </div>
            




        </>
    );
}

export default SideSections;
