import { createSlice } from "@reduxjs/toolkit";


const branchSlice=createSlice({
    name:'branchData',
    initialState:{
        branchData:[]
    },
    reducers:{
        getBranchData:(state,action)=>{
            state.branchData=action.payload.map((data: { _id: any; branchLocation: any; })=>{
                return {id:data._id,branchName:data.branchLocation}
            })
        },
        editBranchData:(state,action)=>{
            const index=state.branchData.findIndex(data=> data?.id===action.payload.id)
            state.branchData[index]={
                id:action.payload.id,
                branchName:action.payload.branchLocation
            }

        },
        deleteBranchData:(state,action)=>{
            state.branchData=state.branchData.filter((branch)=>{
                return branch.id !==action.payload.id
            })

        },
        addBranch:(state,action)=>{
            state.branchData.push({id:action.payload._id,branchName:action.payload.branchLocation})
        }
    }
})

export const {getBranchData,editBranchData,deleteBranchData,addBranch} =branchSlice.actions
export default branchSlice.reducer