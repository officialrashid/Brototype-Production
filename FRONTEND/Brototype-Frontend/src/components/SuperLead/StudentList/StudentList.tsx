import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getPerPageStudents, getStudentStatus, getStudents } from '../../../utils/methods/get';
import ActionModal from './ActionModal';
import { tree } from 'd3';
import AddStudentsModal from './AddStudentsModal';

const StudentList = () => {

    const [studentsData, setStudentsData] = useState([]);
    const [modalActive, setModalActive] = useState(false)
    const [studentId, setStudentId] = useState("")
    const [modalStatus, setModalStatus] = useState(false)
    const [reload, setReload] = useState(false)
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredData, setFilteredData] = useState([]);
    const [addStudents, setAddStudents] = useState(false)
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedDomain, setSelectedDomain] = useState('All');
    const [selectedBatch, setSelectedBatch] = useState('All');
    const [selectedWeek, setSelectedWeek] = useState('All');
    const [selectedStatus, setSelectedStatus] = useState('All');
    const [isBothFiltersSet, setIsBothFiltersSet] = useState(false);
    const [perPage, setPerPage] = useState(10); // Default per page value
    const totalPages = 1000; // Update with the total number of pages
    const pageRange = 4;
    const superleadUniqueId: string = useSelector((state: any) => state?.superlead?.superleadData?.uniqueId) || localStorage.getItem("superleadUniqueId");
    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = {
                    superleadUniqueId,
                    currentPage
                };
    
                const response = await getStudents(data);
                const studentStatus = await getStudentStatus(data);
    
                console.log(response, "student response in current page");
                console.log(studentStatus, "student status response in current page");
    
                if (response.status === true && studentStatus.status === true) {
                    const combinedData = [];
    
                    // Create a map of student data for quick lookup
                    const studentDataMap = {};
                    response.response.students.forEach((student) => {
                        studentDataMap[student.studentId] = {
                            imageUrl: student.imageUrl,
                            currentWeek: student.lastWeek,
                            domain: student.domain
                        };
                    });
    
                    // Combine student data with their statuses
                    studentStatus.response.response.forEach((status) => {
                        const studentId = status.studentId;
                        const studentData = studentDataMap[studentId];
    
                        // If student data exists, use it; otherwise, use default values
                        const imageUrl = studentData ? studentData.imageUrl : 'https://demos.themeselection.com/sneat-bootstrap-html-admin-template/assets/img/avatars/1.png';
                        const currentWeek = studentData ? studentData.currentWeek : 0;
                        const domain = studentData ? studentData.domain : 'Not Update';
    
                        combinedData.push({
                            studentId: studentId,
                            imageUrl: imageUrl,
                            currentWeek: currentWeek,
                            domain: domain,
                            firstName: status.name || 'Unknown',
                            batch: status.batch || 'Unknown',
                            isStatus: status.isStatus
                        });
                    });
    
                    console.log(combinedData, "This is the combined student data");
    
                    setStudentsData(combinedData);
                }
            } catch (error) {
                console.error(error);
                // Handle errors
            }
        };
    
        fetchData();
    }, [superleadUniqueId, currentPage, getStudents, getStudentStatus,onclose,reload]);


    const handleActionChange = (studentId: string) => {

        try {
            setStudentId(studentId)
            setModalActive(true)
            setModalStatus(true)
            setReload(false)
        } catch (error) {

        }
    }
    const changeModalStatus = () => {
        if (modalStatus) {
            setModalActive(false)
            setModalStatus(false)
            setReload((prevState) => !prevState);
        } else {
            setModalStatus(true)
            setReload((prevState) => !prevState);
        }
    }
    const handleSearchInputChange = (event: { target: { value: string; }; }) => {
        const query = event.target.value;
        setSearchQuery(query);

        // Create regular expression for case-insensitive search
        const regex = new RegExp(query, 'i');


        if (filteredData.length > 0) {

            console.log(filteredData, "{}{}{}{}{}{}");

            // Filter student data based on the search query
            const filteredStudents = filteredData.filter(student => {
                // Test each property with the regular expression
                return (
                    regex.test(student.firstName) ||
                    regex.test(student.lastName) ||
                    regex.test(student.batch) ||
                    regex.test(student.domain) ||
                    regex.test(student.currentWeek.toString()) ||
                    regex.test(student.isStatus)
                );
            });
            setFilteredData(filteredStudents);
        } else {
            const filteredStudents = studentsData.filter(student => {
                // Test each property with the regular expression
                return (
                    regex.test(student.firstName) ||
                    regex.test(student.lastName) ||
                    regex.test(student.batch) ||
                    regex.test(student.domain) ||
                    regex.test(student.currentWeek.toString()) ||
                    regex.test(student.isStatus)
                );
            });
            setFilteredData(filteredStudents);
        }
        // Update state with filtered data

    };

    useEffect(() => {
        if (isBothFiltersSet) {
            filterData(selectedDomain, selectedBatch, selectedWeek, selectedStatus);
        }
    }, [selectedDomain, selectedBatch, isBothFiltersSet, selectedWeek, selectedStatus]);

    const handleStatusWiseFilter = (selectedStatus: React.SetStateAction<string>) => {
        setSelectedStatus(selectedStatus);
        setIsBothFiltersSet(true); // Reset flag when domain filter changes
    };
    const handleWeekWiseFilter = (selectedWeek: React.SetStateAction<string>) => {
        setSelectedWeek(selectedWeek);
        setIsBothFiltersSet(true); // Reset flag when domain filter changes
    };
    const handleDomainWiseFilter = (selectedDomain: React.SetStateAction<string>) => {
        setSelectedDomain(selectedDomain);
        setIsBothFiltersSet(true); // Reset flag when domain filter changes
    };

    const handleBatchWiseFilter = (selectedBatch: React.SetStateAction<string>) => {
        setSelectedBatch(selectedBatch);
        setIsBothFiltersSet(true); // Set flag when batch filter changes
    };

    const filterData = (domain: string, batch: string, week: string, status: string) => {
        let newData = studentsData;

        if (domain !== 'All') {
            newData = newData.filter(student => student?.domain === domain);
        }

        if (batch !== 'All') {
            newData = newData.filter(student => student?.batch === batch);
        }
        if (week !== 'All') {
            newData = newData.filter(student => student?.currentWeek === week);
        }
        if (status !== 'All') {
            newData = newData.filter(student => student?.isStatus === status);
        }

        setFilteredData(newData);
    };
    const goToPage = (page: React.SetStateAction<number>) => {
        setCurrentPage(page);
    };

    const renderPageNumbers = () => {
        const pageNumbers = [];
        const startPage = Math.max(1, currentPage - pageRange);
        const endPage = Math.min(totalPages, currentPage + pageRange);

        for (let i = startPage; i <= endPage; i++) {
            pageNumbers.push(
                <li key={i}>
                    <button
                        onClick={() => goToPage(i)}
                        className={`flex items-center justify-center text-sm py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white ${currentPage === i ? 'font-semibold text-gray-900 dark:text-white' : ''}`}
                    >
                        {i}
                    </button>
                </li>
            );
        }

        return pageNumbers;
    };

    const handlePerPageChange = async (event: React.ChangeEvent<HTMLSelectElement>) => {
        try {
            const selectedPerPage = parseInt(event.target.value);
            setPerPage(selectedPerPage);
    
            // You can perform additional actions here, such as making an API call with the selected perPage value
            if (selectedPerPage) {
                const data = {
                    superleadUniqueId,
                    perPage: selectedPerPage // Fixed syntax error here
                };
                const statusData = {
                    superleadUniqueId,
                    currentPage
                }
                const response = await getPerPageStudents(data); // Assuming getPerPageStudents is an async function
                const studentStatus = await getStudentStatus(statusData);
                console.log(response);
                console.log(studentStatus);
                if (response.status === true && studentStatus.status === true) {
                    const combinedData: any = [];

                    response.response.students.forEach((student: { studentId: any; firstName: any; lastName: any; batch: any; domain: any; imageUrl: any; }) => {
                        const matchedStatus = studentStatus.response.response.find((status: { studentId: any; }) => status.studentId === student.studentId);
                        const matchedWeek = response.response.studentCurrentWeek.find((week: { studentId: any; }) => week.studentId === student.studentId);

                        if (matchedStatus && matchedWeek) {
                            combinedData.push({
                                studentId: student.studentId,
                                imageUrl: student.imageUrl,
                                firstName: student.firstName,
                                lastName: student.lastName,
                                batch: student.batch,
                                domain: student.domain,
                                currentWeek: matchedWeek.currentWeek,
                                isStatus: matchedStatus.isStatus
                            });
                        }
                    });

                    setFilteredData(combinedData);
                }
            }
        } catch (error) {
            console.error(error);
            // Handle error
        }
    };
    


    return (
        <>
            <section className=" p-3 sm:p-5 mt-36 w-full " onClick={() => changeModalStatus()}>
                <div className="mx-auto max-w-screen-xl px-4 lg:px-12 ">

                    <div className="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden ">
                        <h1 className='font-roboto m-5 ml-8 font-semibold mb-0 '>Search Filter</h1>
                        <div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4 border-b dark:border-gray-700 ">

                            <div className="w-full md:w-1/2 m-3 ">

                                {/* <span  className="text-sm font-roboto text-gray-500">Select Batch</span> */}
                                <form className="flex items-center">
                                    <label htmlFor="simple-search" className="sr-only">Search</label>
                                    <div className="relative w-full">
                                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                            {/* <p className='text-sm font-roboto text-gray-500'>Select Batch</p> */}
                                        </div>
                                        <select
                                            id="simple-search"
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-xs font-roboto rounded-md focus:ring-0 focus:border-Average block w-full pl-1 p-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-0 dark:focus:border-Average outline-none"
                                            defaultValue=""
                                            onChange={(event) => handleBatchWiseFilter(event?.target?.value)} // Pass selected value to handleBatchWiseFilter
                                        >
                                            <option value="" disabled hidden className="text-sm font-roboto text-gray-500">Select a batch</option>
                                            <option value="All">All</option>
                                            <option value="BCE-55">BCE-55</option>
                                            <option value="BCE-66">BCE-66</option>
                                            <option value="BCK-88">BCE-88</option>
                                        </select>

                                    </div>
                                </form>
                            </div>



                            <div className="w-full md:w-1/2 m-3">
                                <form className="flex items-center">
                                    <label htmlFor="simple-search" className="sr-only">Search</label>
                                    <div className="relative w-full">
                                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                            {/* <p className='text-sm font-roboto text-gray-500'>Select Batch</p> */}
                                        </div>
                                        <select
                                            id="simple-search"
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-xs font-roboto rounded-md focus:ring-0 focus:border-Average block w-full pl-1 p-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-0 dark:focus:border-Average outline-none"
                                            defaultValue=""
                                            onChange={(event) => handleDomainWiseFilter(event?.target?.value)} // Pass selected value to handleBatchWiseFilter
                                        >
                                            <option value="" disabled hidden className="text-sm font-roboto text-gray-500">Select a domain</option>
                                            <option value="All">All</option>
                                            <option value="Mern Stack developer">Mern Stack developer</option>
                                            <option value="BCK-66">BCE-66</option>
                                            <option value="BCK-88">BCE-88</option>
                                        </select>

                                    </div>
                                </form>
                            </div>
                            <div className="w-full md:w-1/2 m-3">
                                <form className="flex items-center">
                                    <label htmlFor="simple-search" className="sr-only">Search</label>
                                    <div className="relative w-full">
                                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                            {/* <p className='text-sm font-roboto text-gray-500'>Select Batch</p> */}
                                        </div>
                                        <select
                                            id="simple-search"
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-xs font-roboto rounded-md focus:ring-0 focus:border-Average block w-full pl-1 p-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-0 dark:focus:border-Average outline-none"
                                            defaultValue=""
                                            onChange={(event) => handleWeekWiseFilter(event?.target?.value)} // Pass selected value to handleBatchWiseFilter
                                        >
                                            <option value="" disabled hidden className="text-xs font-roboto font-roboto text-gray-500">Select a week</option>
                                            <option value="All">All</option>
                                            <option value="week1">week1</option>
                                            <option value="week2">week2</option>
                                            <option value="week3">week3</option>
                                            <option value="week4">week4</option>
                                            <option value="week5">week5</option>
                                            <option value="week6">week6</option>
                                        </select>

                                    </div>
                                </form>
                            </div>
                            <div className="w-full md:w-1/2 m-3">
                                <form className="flex items-center">
                                    <label htmlFor="simple-search" className="sr-only">Search</label>
                                    <div className="relative w-full">
                                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                            {/* <p className='text-sm font-roboto text-gray-500'>Select Batch</p> */}
                                        </div>
                                        <select
                                            id="simple-search"
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-xs font-roboto rounded-md focus:ring-0 focus:border-Average block w-full pl-1 p-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-0 dark:focus:border-Average outline-none"
                                            defaultValue=""
                                            onChange={(event) => handleStatusWiseFilter(event?.target?.value)} // Pass selected value to handleBatchWiseFilter
                                        >
                                            <option value="" disabled hidden className="text-sm font-roboto text-gray-500">Select a status</option>
                                            <option value="All">All</option>
                                            <option value="Active">Active</option>
                                            <option value="Placed">Placed</option>
                                            <option value="Terminate">Terminate</option>
                                            <option value="Suspend">Suspend</option>
                                            <option value="Quit">Quit</option>
                                        </select>

                                    </div>
                                </form>
                            </div>

                        </div>
                        <div className="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-between md:space-x-3 flex-shrink-0 m-7 mb-2 mt-3  mr-4 ">
                            <div className="w-full md:w-10">
                                <form className="flex items-center">
                                    <label htmlFor="simple-search" className="sr-only">Items per page</label>
                                    <div className="relative w-full">
                                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                            <p className='text-sm font-roboto'>{perPage}</p>
                                        </div>
                                        <select
                                            id="simple-search"
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-0 focus:border-Average block w-full pl-10 p-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-0 dark:focus:border-Average outline-none"
                                            value={perPage}
                                            onChange={handlePerPageChange}
                                        >
                                            <option value="All">All</option>
                                            <option value="5">5</option>
                                            <option value="6">6</option>
                                            {/* Add more options as needed */}
                                        </select>
                                    </div>
                                </form>
                            </div>

                            <div className="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0 mt-3">
                                <div className="w-full md:w-2/6">
                                    <form className="flex items-center">
                                        <label htmlFor="simple-search" className="sr-only">Search</label>
                                        <div className="relative w-full">
                                            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                                <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                                    <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd" />
                                                </svg>
                                            </div>
                                            <input
                                                type="text"
                                                id="simple-search"
                                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-0 focus:border-Average block w-full pl-10 p-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-0 dark:focus:border-Average outline-none text-sm font-roboto" required placeholder='Search...'
                                                value={searchQuery}
                                                onChange={handleSearchInputChange}
                                            />
                                        </div>


                                    </form>
                                </div>
                                <div className="flex items-center space-x-3 w-full md:w-auto">
                                    <button id="actionsDropdownButton" data-dropdown-toggle="actionsDropdown" className="w-full md:w-auto flex items-center justify-center py-1.5 px-4 text-sm font-roboto font-medium text-gray-900 focus:outline-none bg-white rounded-md border border-gray-200 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700" type="button">
                                        <svg className="-ml-1 mr-1.5 w-5 h-5 " fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                            <path clip-rule="evenodd" fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                                        </svg>
                                        Actions
                                    </button>
                                    <div id="actionsDropdown" className="hidden z-10 w-44 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600">
                                        <ul className="py-1 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="actionsDropdownButton">
                                            <li>
                                                <a href="#" className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Mass Edit</a>
                                            </li>
                                        </ul>
                                        <div className="py-1">
                                            <a href="#" className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Delete all</a>
                                        </div>
                                    </div>

                                    <button type="button" className="flex items-center justify-center flex-shrink-0 px-3  py-1.5 text-sm font-roboto font-medium  font-medium text-gray-900 bg-Average border border-gray-200 rounded-lg focus:outline-none hover:bg-purple-500 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 text-white"
                                        onClick={() => { setAddStudents(true) }}
                                    >
                                        <svg className="w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" aria-hidden="true">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
                                        </svg>
                                        Add Students
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="overflow-x-auto mt-3">
                            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                                <thead className="text-xs font-roboto text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 ">
                                    <tr className=''>
                                        <th scope="col" className="px-4 py-3 ">Name</th>
                                        <th scope="col" className="px-4 py-3 item text-center">Batch</th>
                                        <th scope="col" className="px-4 py-3 item text-center">Domain</th>
                                        <th scope="col" className="px-4 py-3 item text-center">Current Week</th>
                                        <th scope="col" className="px-4 py-3 item text-center">Status</th>
                                        <th scope="col" className="px-4 py-3 item text-center ">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredData.length > 0 ? (
                                        filteredData.map((student, index) => (
                                            <tr key={index} className="border-b dark:border-gray-700 item text-center">
                                                <th scope="row" className="flex items-center px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white text-sm font-roboto">
                                                    <img src={student?.imageUrl} alt="" className="w-auto h-8 mr-3 rounded-full" />
                                                    {student?.firstName} {student?.lastName}
                                                </th>
                                                <td className="px-4 py-3 text-ms font-roboto">{student?.batch}</td>
                                                <td className="px-4 py-3 text-sm font-roboto">{student?.domain}</td>
                                                <td key={index} className="px-4 py-3 text-sm font-roboto">{student.currentWeek}</td>
                                                {student.isStatus === "Active" ? (
                                                    <td className="px-4 py-3" key={index}>
                                                        <span className="font-roboto inline-flex items-center rounded-md bg-bgsuperLead px-2 py-1 text-xs font-medium text-dark-highBlue cursor-pointer mt-3 text-sm font-robtot">Active</span>
                                                    </td>
                                                ) : student.isStatus === "Terminate" ? (
                                                    <td className="px-4 py-3" key={index}>
                                                        <span className="focus:outline-none text-red-500 hover:text-white bg-red-100 px-2 py-1 hover:bg-red-500 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-xs  mb-2 font-roboto dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-purple-900">Terminate</span>
                                                    </td>
                                                ) : student.isStatus === "Suspend" ? (
                                                    <td className="px-4 py-3" key={index}>
                                                        <span className="inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset cursor-pointer bg-gray-10 text-Outstanding ring-Outstanding font-roboto text-xs">Suspend</span>
                                                    </td>
                                                ) : student.isStatus === "Quit" ? (
                                                    <td className="px-4 py-3" key={index}>
                                                        <span className="focus:outline-none text-red-500 hover:text-white bg-red-100 px-2 py-1 hover:bg-red-500 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-xs  mb-2 font-roboto dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-purple-900">Quit</span>
                                                    </td>
                                                ) : student.isStatus === "Placed" ? (
                                                    <td className="px-4 py-3" key={index}>
                                                        <span className="inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset cursor-pointer bg-blue-10 text-Poor ring-Poor font-roboto">Placed</span>
                                                    </td>
                                                ) : null}
                                                <td className="px-4 py-3">
                                                    <button type='button' id="apple-imac-27-dropdown-button" data-dropdown-toggle="apple-imac-27-dropdown" className="inline-flex items-center p-0.5 text-sm font-medium text-center text-gray-500 hover:text-gray-800 rounded-lg focus:outline-none dark:text-gray-400 dark:hover:text-gray-100" onClick={() => handleActionChange(student?.studentId)}>
                                                        {student.studentId === studentId ? (
                                                            <ActionModal isVisible={modalActive} onClose={() => setModalActive(false)} studentId={studentId} changeModalStatus={changeModalStatus} />
                                                        ) : null}
                                                        <svg className="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
                                                        </svg>
                                                    </button>
                                                    <div id="apple-imac-27-dropdown" className="hidden z-10 w-44 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600">
                                                        <ul className="py-1 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="apple-imac-27-dropdown-button">
                                                            <li>
                                                                <a href="#" className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Show</a>
                                                            </li>
                                                            <li>
                                                                <a href="#" className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Edit</a>
                                                            </li>
                                                        </ul>
                                                        <div className="py-1">
                                                            <a href="#" className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Delete</a>
                                                        </div>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        studentsData.map((student, index) => (
                                            <tr key={index} className="border-b dark:border-gray-700 item text-center">
                                                <th scope="row" className="flex items-center px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white text-sm font-roboto">
                                                    <img src={student?.imageUrl} alt="" className="w-auto h-8 mr-3 rounded-full" />
                                                    {student?.firstName} {student?.lastName}
                                                </th>
                                                <td className="px-4 py-3 text-ms font-roboto">{student?.batch}</td>
                                                <td className="px-4 py-3 text-sm font-roboto">{student?.domain}</td>
                                                <td key={index} className="px-4 py-3 text-sm font-roboto">{student.currentWeek}</td>
                                                {student?.isStatus === "Active" ? (
                                                    <td className="px-4 py-3" key={index}>
                                                        <span className="font-roboto inline-flex items-center rounded-md bg-bgsuperLead px-2 py-1 text-xs font-medium text-dark-highBlue cursor-pointer mt-3 text-sm font-robtot">Active</span>
                                                    </td>
                                                ) : student?.isStatus === "Terminate" ? (
                                                    <td className="px-4 py-3" key={index}>
                                                        <span className="focus:outline-none text-red-500 hover:text-white bg-red-100 px-2 py-1 hover:bg-red-500 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-xs  mb-2 font-roboto dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-purple-900">Terminate</span>
                                                    </td>
                                                ) : student?.isStatus === "Suspend" ? (
                                                    <td className="px-4 py-3" key={index}>
                                                        <span className="inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset cursor-pointer bg-gray-10 text-Outstanding ring-Outstanding font-roboto text-xs">Suspend</span>
                                                    </td>
                                                ) : student?.isStatus === "Quit" ? (
                                                    <td className="px-4 py-3" key={index}>
                                                        <span className="focus:outline-none text-red-500 hover:text-white bg-red-100 px-2 py-1 hover:bg-red-500 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-xs  mb-2 font-roboto dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-purple-900">Quit</span>
                                                    </td>
                                                ) : student?.isStatus === "Placed" ? (
                                                    <td className="px-4 py-3" key={index}>
                                                        <span className="inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset cursor-pointer bg-blue-10 text-Poor ring-Poor font-roboto">Placed</span>
                                                    </td>
                                                ) : null}
                                                <td className="px-4 py-3">
                                                    <button type='button' id="apple-imac-27-dropdown-button" data-dropdown-toggle="apple-imac-27-dropdown" className="inline-flex items-center p-0.5 text-sm font-medium text-center text-gray-500 hover:text-gray-800 rounded-lg focus:outline-none dark:text-gray-400 dark:hover:text-gray-100" onClick={() => handleActionChange(student?.studentId)}>
                                                        {student.studentId === studentId ? (
                                                            <ActionModal isVisible={modalActive} onClose={() => setModalActive(false)} studentId={studentId} changeModalStatus={changeModalStatus} />
                                                        ) : null}
                                                        <svg className="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
                                                        </svg>
                                                    </button>
                                                    <div id="apple-imac-27-dropdown" className="hidden z-10 w-44 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600">
                                                        <ul className="py-1 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="apple-imac-27-dropdown-button">
                                                            <li>
                                                                <a href="#" className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Show</a>
                                                            </li>
                                                            <li>
                                                                <a href="#" className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Edit</a>
                                                            </li>
                                                        </ul>
                                                        <div className="py-1">
                                                            <a href="#" className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Delete</a>
                                                        </div>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>

                            </table>
                        </div>
                        <nav className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-3 md:space-y-0 p-4" aria-label="Table navigation">
                            {/* Showing current page range */}
                            <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
                                Showing
                                <span className="font-semibold text-gray-900 dark:text-white">{(currentPage - 1) * 10 + 1}-{currentPage * 10}</span>
                                {/* Assuming each page shows 10 items, update as needed */}
                                of
                                <span className="font-semibold text-gray-900 dark:text-white">1000</span> {/* Total number of items */}
                            </span>
                            <ul className="inline-flex items-stretch -space-x-px">
                                <li>
                                    <button onClick={() => goToPage(Math.max(1, currentPage - 1))} className="flex items-center justify-center h-full py-1.5 px-3 ml-0 text-gray-500 bg-white rounded-l-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                                        <span className="sr-only">Previous</span>
                                        {/* Your SVG icon for Previous */}
                                    </button>
                                </li>
                                {/* Render page numbers dynamically */}
                                {renderPageNumbers()}
                                <li>
                                    <button onClick={() => goToPage(Math.min(totalPages, currentPage + 1))} className="flex items-center justify-center h-full py-1.5 px-3 leading-tight text-gray-500 bg-white rounded-r-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                                        <span className="sr-only">Next</span>
                                        {/* Your SVG icon for Next */}
                                    </button>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </section >
            <AddStudentsModal isVisible={addStudents} onClose={() => { setAddStudents(false) }} changeModalStatus={changeModalStatus} />
        </>
    );
}

export default StudentList;
