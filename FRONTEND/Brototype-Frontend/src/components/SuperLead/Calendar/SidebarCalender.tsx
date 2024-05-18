import React from 'react';
import CreateEventButton from './createEventButton';
import SmallCalender from './smallCalender';
import Labels from './Labels';

const SidebarCalender = () => {
    return (
        <aside className='border p-5 w-64 '>
            
            <CreateEventButton/>
            <SmallCalender/>
            <Labels/>
        </aside>
    );
}

export default SidebarCalender;
