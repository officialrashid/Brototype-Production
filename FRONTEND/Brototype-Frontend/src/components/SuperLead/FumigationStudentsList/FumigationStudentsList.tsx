import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { getAllFumigationStudents, getPerPageFumiagtionStudents, getSuperleadHubLocation } from '../../../utils/methods/get';
import ActionModal from './ActionModal';

const FumigationStudentsList = () => {
    const superleadUniqueId: string = useSelector((state: any) => state?.superlead?.superleadData?.uniqueId) || localStorage.getItem("superleadUniqueId");
    const [fumigatioStudents, setFumigationStudents] = useState([])
    const [filteredData, setFilteredData] = useState([]);
    const [studentId, setStudentId] = useState("")
    const [modalActive, setModalActive] = useState(false)
    const [modalStatus, setModalStatus] = useState(false)
    const [reload, setReload] = useState(false)
    const [batch, setBatch] = useState("")
    const [selectedBatch, setSelectedBatch] = useState('All');
    const [selectedStatus, setSelectedStatus] = useState('All');
    const [selectedQualification, setSelectedQualification] = useState('All');
    const [isBothFiltersSet, setIsBothFiltersSet] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');
    const [perPage, setPerPage] = useState(10); // Default per page value
    const totalPages = 1000; // Update with the total number of pages
    const pageRange = 4;
    useEffect(() => {
        const fetchFumigationStudents = async () => {
            try {
                const hubLocationResponse = await getSuperleadHubLocation(superleadUniqueId)
                if (hubLocationResponse.status === true) {
                    const hubLocation = hubLocationResponse?.response?.hubLocation
                    const studentData = {
                          hubLocation,
                          currentPage
                    }
                    const response = await getAllFumigationStudents(studentData)
                    if (response.status === true) {
                        console.log(response?.students, "ppppppppppp");

                        setFumigationStudents(response?.students)
                    } else {
                        toast.error("fumigation students not found")
                    }

                } else {
                    toast.error("hub location not found")
                }

            } catch (error) {
                toast.error("Internal Server Error please try after some time")
            }
        }
        fetchFumigationStudents()
    }, [reload,currentPage])
    const handleActionChange = (studentId: string, batch: string) => {

        try {
            setStudentId(studentId)
            setBatch(batch)
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
    useEffect(() => {
        if (isBothFiltersSet) {
            filterData(selectedBatch, selectedQualification, selectedStatus);
        }
    }, [selectedBatch, selectedQualification, isBothFiltersSet, selectedStatus]);

    const handleBatchWiseFilter = (selectedBatch: React.SetStateAction<string>) => {
        setSelectedBatch(selectedBatch);
        setIsBothFiltersSet(true); // Reset flag when domain filter changes
    };
    const handleStatusWiseFilter = (selectedStatus: React.SetStateAction<string>) => {
        setSelectedStatus(selectedStatus);
        setIsBothFiltersSet(true); // Reset flag when domain filter changes
    };
    const handleQualificationWiseFilter = (selectedQualification: React.SetStateAction<string>) => {
        setSelectedQualification(selectedQualification);
        setIsBothFiltersSet(true); // Reset flag when domain filter changes
    };

    const filterData = (batch: string, qualification: string, status: string) => {
        let newData = fumigatioStudents;

        if (batch !== 'All') {
            newData = newData.filter(student => student?.batchName === batch);
        }

        if (status !== 'All') {
            newData = newData.filter(student => student?.status === status);
        }
        if (qualification !== 'All') {
            newData = newData.filter(student => student?.qualification === qualification);
        }

        setFilteredData(newData);
    };
    const handleSearchInputChange = (event: { target: { value: string; }; }) => {
        const query = event.target.value;
        setSearchQuery(query);

        // Create regular expression for case-insensitive search
        const regex = new RegExp(query, 'i');
        console.log(filteredData, "mnnbnnmbbmnmm");

        if (filteredData.length > 0) {

            console.log(filteredData, "{}{}{}{}{}{}");

            // Filter reviewer data based on the search query
            const filteredStudents = filteredData.filter(student => {
                // Test each property with the regular expression
                return (
                    regex.test(student.name) ||
                    regex.test(student.email) ||
                    regex.test(student.phone) ||
                    regex.test(student.qualification) ||
                    regex.test(student.prefferredLocation) ||
                    regex.test(student.batch) ||
                    regex.test(student.status)
                );
            });
            setFilteredData(filteredStudents);
        } else {
            const filteredStudents = fumigatioStudents.filter(student => {
                // Test each property with the regular expression
                return (
                    regex.test(student.name) ||
                    regex.test(student.email) ||
                    regex.test(student.phone) ||
                    regex.test(student.qualification) ||
                    regex.test(student.prefferredLocation) ||
                    regex.test(student.batch) ||
                    regex.test(student.status)
                );
            });
            setFilteredData(filteredStudents);
        }
        // Update state with filtered data

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
                const hubLocationResponse = await getSuperleadHubLocation(superleadUniqueId)
                if (hubLocationResponse.status === true) {
                    const hubLocation = hubLocationResponse?.response?.hubLocation
                const studentData = {
                    hubLocation,
                    selectedPerPage,
              }
                const response = await getPerPageFumiagtionStudents(studentData); // Assuming getPerPageStudents is an async function
                console.log(response,"resposn fumiaion prpAG");
                if(response?.status===true){
                    setFilteredData(response?.students)
                }
    
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
                        <h1 className='font-roboto m-5 ml-8 font-semibold mb-0'>Search Filter</h1>
                        <div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4 border-b dark:border-gray-700">
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
                                            onChange={(event) => handleBatchWiseFilter(event?.target?.value)} // Pass selected value to handleBatchWiseFilter
                                        >
                                            <option value="" disabled hidden className="text-sm font-roboto text-gray-500">Select a batch</option>
                                            <option value="All">All</option>
                                            <option value="BCE-76">BCE-76</option>
                                            <option value="BCE-77">BCE-77</option>
                                            <option value="BCE-55">BCE-55</option>
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
                                            onChange={(event) => handleQualificationWiseFilter(event?.target?.value)} // Pass selected value to handleBatchWiseFilter
                                        >
                                            <option value="" disabled hidden className="text-sm font-roboto text-gray-500">Select a qualification</option>
                                            <option value="All">All</option>
                                            <option value="+2">+2</option>
                                            <option value="UG">UG</option>
                                            <option value="PG">PG</option>
                                            <option value="PHD">PHD</option>
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
                                            <option value="Suspend">Suspend</option>
                                            <option value="Terminate">Terminate</option>
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
                                            <option value="2">2</option>
                                            <option value="3">3</option>
                                            <option value="20">40</option>
                                            <option value="20">50</option>
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
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-0 focus:border-Average block w-full pl-10 p-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-0 dark:focus:border-Average outline-none text-sm font-roboto" required="" 
                                            placeholder='Search...' 
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

                                    <button type="button" className="flex items-center justify-center flex-shrink-0 px-3 py-1.5 text-sm font-roboto font-medium  font-medium text-gray-900 bg-white border border-gray-200 rounded-lg focus:outline-none hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
                                        <svg className="w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" aria-hidden="true">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
                                        </svg>
                                        Export
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="overflow-x-auto mt-3">
                            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                                <thead className="text-xs font-roboto text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 ">
                                    <tr className=''>
                                        <th scope="col" className="px-4 py-3 item text-center">Name</th>
                                        <th scope="col" className="px-4 py-3 item text-center">Batch</th>
                                        <th scope="col" className="px-4 py-3 item text-center">Email</th>
                                        <th scope="col" className="px-4 py-3 item text-center">Phone</th>
                                        <th scope="col" className="px-4 py-3 item text-center">Qualification</th>
                                        <th scope="col" className="px-4 py-3 item text-center">PrefferredLocation</th>
                                        <th scope="col" className="px-4 py-3 item text-center">Status</th>
                                        <th scope="col" className="px-4 py-3 item text-center ">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredData.length > 0 ? (
                                        filteredData.map((student, index) => (
                                            <tr key={index} className="border-b dark:border-gray-700 item text-center">
                                                <td className="px-4 py-3 text-ms font-roboto">{student?.name}</td>
                                                <td className="px-4 py-3 text-ms font-roboto">{student?.batchName}</td>
                                                <td className="px-4 py-3 text-ms font-roboto">{student?.email}</td>
                                                <td className="px-4 py-3 text-sm font-roboto">{student?.phone}</td>
                                                <td className="px-4 py-3 text-sm font-roboto">{student?.qualification}</td>
                                                <td className="px-4 py-3 text-sm font-roboto">{student?.prefferredLocation}</td>
                                                <td className="px-4 py-3"><span className="font-roboto inline-flex items-center rounded-md bg-bgsuperLead px-2 py-1 text-xs font-medium text-dark-highBlue cursor-pointer mt-3 text-sm font-robtot">{student?.status}</span></td>


                                                <td className="px-4 py-3   ">
                                                    <button type='button' id="apple-imac-27-dropdown-button" data-dropdown-toggle="apple-imac-27-dropdown" className="inline-flex items-center p-0.5 text-sm font-medium text-center text-gray-500 hover:text-gray-800 rounded-lg focus:outline-none dark:text-gray-400 dark:hover:text-gray-100" onClick={() => handleActionChange(student?.studentId, student?.batchName)}>
                                                        {student?.studentId === studentId ? (
                                                            <ActionModal isVisible={modalActive} onClose={() => setModalActive(false)} studentId={studentId} batch={batch} changeModalStatus={changeModalStatus} />
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
                                        fumigatioStudents.map((student, index) => (
                                            <tr key={index} className="border-b dark:border-gray-700 item text-center">
                                                <td className="px-4 py-3 text-ms font-roboto">{student?.name}</td>
                                                <td className="px-4 py-3 text-ms font-roboto">{student?.batchName}</td>
                                                <td className="px-4 py-3 text-ms font-roboto">{student?.email}</td>
                                                <td className="px-4 py-3 text-sm font-roboto">{student?.phone}</td>
                                                <td className="px-4 py-3 text-sm font-roboto">{student?.qualification}</td>
                                                <td className="px-4 py-3 text-sm font-roboto">{student?.prefferredLocation}</td>
                                                <td className="px-4 py-3"><span className="font-roboto inline-flex items-center rounded-md bg-bgsuperLead px-2 py-1 text-xs font-medium text-dark-highBlue cursor-pointer mt-3 text-sm font-robtot">{student?.status}</span></td>


                                                <td className="px-4 py-3   ">
                                                    <button type='button' id="apple-imac-27-dropdown-button" data-dropdown-toggle="apple-imac-27-dropdown" className="inline-flex items-center p-0.5 text-sm font-medium text-center text-gray-500 hover:text-gray-800 rounded-lg focus:outline-none dark:text-gray-400 dark:hover:text-gray-100" onClick={() => handleActionChange(student?.studentId, student?.batchName)}>
                                                        {student?.studentId === studentId ? (
                                                            <ActionModal isVisible={modalActive} onClose={() => setModalActive(false)} studentId={studentId} batch={batch} changeModalStatus={changeModalStatus} />
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
            </section>

        </>
    );
}

export default FumigationStudentsList;
