import React, { useContext } from 'react';
import GlobalContext from '../../../context/GlobalContext';

const CreateEventButton = () => {
    const {setShowEventModal} = useContext(GlobalContext)
    return (
        <button onClick={()=>setShowEventModal(true)} className='border p-2 rounded-full flex items-center shadow-md hover:shadow-2xl ml-9 '>
            <img src="/plus.svg" alt="create_event" className='w-7 h-7' />
            <span className='pl-5 pr-7'>Create</span>
        </button>
    );
}

export default CreateEventButton;
