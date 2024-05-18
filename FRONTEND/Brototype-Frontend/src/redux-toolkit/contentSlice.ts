import { createSlice } from "@reduxjs/toolkit";


const contentSlice=createSlice({
    name:'contentData',
    initialState:{
        contentData:[]
    },
    reducers:{
        getContentData:(state,action)=>{
            state.contentData=action.payload.map((data:any)=>{
                return {id:data._id,content:data.content,contentImage:data.contentImage}
            })
        },
        editContentData: (state, action) => {
            const index = state.contentData.findIndex((data) => data.id === action.payload._id);
            console.log(index, 'indexxxxxxx', state.contentData[index], action.payload._id);
        
            // Ensure index is found before modifying the state
            if (index !== -1) {
                console.log('insideeeee');
                
                state.contentData[index] = {
                    id: action.payload._id,
                    content: action.payload.content,
                    contentImage: action.payload.contentImage
                };
            }
        },
        deleteContentData:(state,action)=>{
            
            state.contentData=state.contentData.filter((data:any)=>{
                console.log(data.id,action.payload._id,'in actionn');
                
            return  data.id !== action.payload._id
                
            })

        },
        addContent:(state,action)=>{

            state.contentData.push({id:action.payload._id,content:action.payload.content,contentImage:action.payload.contentImage})
        }
    }
})

export const {getContentData,editContentData,deleteContentData,addContent} =contentSlice.actions
export default contentSlice.reducer