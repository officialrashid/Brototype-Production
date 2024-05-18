import { useEffect } from "react"
import axios from "axios"
import { useDispatch, useSelector } from "react-redux";

const ModalTable=({isTableVisble,onTableClose})=>{

  const markData=useSelector(state=>state.batch.studentMark)
  
console.log(markData,"[[[[]]]]]]]]]]");

//   let dispatch=useDispatch()
//   let fumigationType:string
//   if(activeTab==1){
// fumigationType="Mock"
//   }else{
//     fumigationType="Final"
//   }

 let MarkRecord=useSelector(state=>state.batch.studentMark)
 let patternRecord
 let arrayRecord
 let oopRecord
 let commnRecord
 for(let data of markData ){
  if(data.examType==='Array'){
    arrayRecord =data
  }
  if(data.examType==='Pattern'){
    patternRecord =data
  }
  if(data.examType==='Oops'){
     oopRecord=data
  }
  if(data.examType==='Communication'){
    commnRecord=data
  }
 }


  console.log('table -modalllll');
  
  






    

     
     
  

    if(!isTableVisble) return null
    return (
        
        <>

        
        
        <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center   overflow-y-scroll  z-20 font-roboto">
  <div className="w-[600px] flex flex-col max-h-[80vh]  " >
   
    
    <div className="bg-white p-2 rounded-lg border border-gray-500 ">
    <div className="flex justify-end  px-7 py-2 ">
    <button className="text-xl text-gray-500 " onClick={() => onTableClose()}>
      X
    </button>
    
   </div>
        <div className="flex justify-center ">
            <span className="text-lg font-bold">  interview Marks</span>
        </div>
    <table className="w-full mt-10">
  <thead>
    <tr>
      <th className="border border-black py-4">Technicals</th>
      <th className="border border-black py-4">Marks</th>
    
    
    </tr>
  </thead>
  <tbody >
    <tr>
      <td className="border border-black py-4  ">Pattern </td>
      <td className="border border-black py-4 text-center">{arrayRecord?patternRecord?.mark+"/10":"-"} </td>
    </tr>
    <tr>
    <td className="border border-black py-4 ">Array </td>
    <td className="border border-black py-4 text-center">{arrayRecord?arrayRecord?.mark+"/10":"-"} </td>
     
    </tr>
    <tr>
    <td className="border border-black py-4 ">OOPs </td>
    <td className="border border-black py-4 text-center">{oopRecord?oopRecord?.mark+"/10":"-"} </td>
     
    </tr>
    <tr>
    <td className="border border-black py-4 ">Communication </td>
    <td className="border border-black py-4 text-center"> {commnRecord?commnRecord?.mark+"/10":"-"}</td>
     
    </tr>
    <tr>
    <td className="border border-black text-lg font-bold py-3 ">Total </td>
    <td className="border border-black text-lg font-bold py-3 text-center">{patternRecord&&arrayRecord&&commnRecord&&oopRecord?patternRecord?.mark+arrayRecord?.mark+oopRecord?.mark+commnRecord?.mark+"/40":"-"}</td>
     
    </tr>
  </tbody>
</table>
   
    </div>
  </div>
</div>


        </>
    )
}

export default ModalTable