import { useState, useEffect } from 'react';
import SubTask from './SubTask';
import { useLocation } from 'react-router-dom';
import { getPersonalWorkout, getProfile, getTechnicalWorkout, getUpdateTask, getmiscellaneousWorkout } from '../../../utils/methods/get';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { count } from 'd3';

const StudentTask = () => {
  const [PersonalWorkouts, setPersonalWorkouts] = useState([]);
  const [personalWorkoutsNestedQuestion, setPersonalWorkoutsNestedQuestion] = useState([]);

  const [TechnicalWorkouts, setTechnicalWorkouts] = useState([]);
  const [technicalWorkoutsNestedQuestion, setTechnicalWorkoutsNestedQuestion] = useState([]);

  const [MiscellaneousWorkouts, setMiscellaneousWorkouts] = useState([]);
  const [MiscellaneousWorkoutssNestedQuestion, setMiscellaneousWorkoutsNestedQuestion] = useState([]);

  const [personalWorkoutCompleted, setpersonalWorkoutCompleted] = useState(false);
  const [technicalWorkoutCompleted, setTechnicalWorkoutCompleted] = useState(false);
  const [miscellaneousWorkoutCompleted, setMiscellaneousWorkoutCompleted] = useState(false);
  const studentId: any = useSelector((state: any) => state?.student?.studentData?.studentId);
  const [activeSubTask, setActiveSubTask] = useState(0);
  const [showPersonalWorkoutStatus, setShowPersonalWorkoutStatus] = useState(false);
  const [showTechnicalWorkoutStatus, setShowTechnicalWorkoutStatus] = useState(false);
  const [showMiscellaneousWorkoutStatus, setShowMiscellaneousWorkoutStatus] = useState(false);

  let studentPersonalTaskUpdateCount = 0;
  let studentTechnicalTaskUpdateCount = 0;
  let studentMiscellaneousTaskUpdateCount = 0;
  const location = useLocation();
  const weekName = location.state && location.state.weekName;

  useEffect(() => {
    const fetchTasks = async () => {
      if (weekName) {
        const personalWorkout = await getPersonalWorkout(weekName);
      
        
        setPersonalWorkouts(personalWorkout?.response?.personalWorkouts);
        setPersonalWorkoutsNestedQuestion(personalWorkout?.response?.personalWorkoutNestedQuestions);
      }

      if (weekName) {
        const response = await getProfile(studentId);
        if (response?.data?.status) {
          const [profileData] = response?.data?.response;
          const fullDomainName = profileData.domain;
          if (!fullDomainName) {
            toast.warn("Your Domain Not Found. Please Update Your Profile");
          } else {
            const domain = fullDomainName.replace(/developer$/i, '');
            if (!domain) {
              toast.warn("Some Issue In Task Fetch. Please Try After Some Time");
            } else {
              const data = {
                domain,
                weekName
              };
              const response = await getTechnicalWorkout(data);
              setTechnicalWorkouts(response.response[0].technicalWorkouts);
              setTechnicalWorkoutsNestedQuestion(response.response[0].technicalWorkoutNestedQuestions);
            }
          }
        } else {
          console.error("Failed to get profile data:", response?.data?.message);
        }
      }

      if (weekName) {
        const miscellaneousWorkout = await getmiscellaneousWorkout(weekName);
        setMiscellaneousWorkouts(miscellaneousWorkout?.response?.miscellaneousWorkouts);
        setMiscellaneousWorkoutsNestedQuestion(miscellaneousWorkout?.response?.miscellaneousWorkoutNestedQuestions);
      }
    };
    fetchTasks();
  }, []);
  let studentUpdateTaskount=0;
  useEffect(() => {
    const fetchUpdateTask = async () => {
      try {
        const response = await getUpdateTask(studentId);

       const personalWorkoutsArray = await response.response[0]?.personalWorkouts || [];
        let totalQuestionNumbersAndAnswersLength = 0;
  
        await personalWorkoutsArray.forEach((personalWorkout: { week: string, questionNumbersAndAnswers: { length: number }[] }) => {
      

          if (personalWorkout.week === weekName) {
             studentPersonalTaskUpdateCount++;
            
            const questionNumbersAndAnswersArray =  personalWorkout?.questionNumbersAndAnswers || [];
            const questionNumbersAndAnswersLength = questionNumbersAndAnswersArray.length;
            totalQuestionNumbersAndAnswersLength += questionNumbersAndAnswersLength;
          }
        });
  
        const technicalWorkoutsArray = await response.response[0]?.technicalWorkouts || [];
        let totalTechnicalQuestionNumbersAndAnswersLength = 0;
  
        await technicalWorkoutsArray.forEach(async (technicalWorkout: { week: string, questionNumbersAndAnswers: { length: number }[] }) => {
          if (technicalWorkout.week === weekName) {
            studentTechnicalTaskUpdateCount++
            const questionNumbersAndAnswersArray = technicalWorkout?.questionNumbersAndAnswers || [];
            const questionNumbersAndAnswersLength =questionNumbersAndAnswersArray.length;
            totalTechnicalQuestionNumbersAndAnswersLength += questionNumbersAndAnswersLength;
          }
        });
  
        const miscellaneousWorkoutsArray = await response.response[0]?.miscellaneousWorkouts || [];
        let totalMiscellaneousQuestionNumbersAndAnswersLength = 0;
  
        await miscellaneousWorkoutsArray.forEach((miscellaneousWorkout: { week: string, questionNumbersAndAnswers: { length: number }[] }) => {
          if (miscellaneousWorkout.week === weekName) {
            studentMiscellaneousTaskUpdateCount++
            const questionNumbersAndAnswersArray = miscellaneousWorkout?.questionNumbersAndAnswers || [];
            const questionNumbersAndAnswersLength = questionNumbersAndAnswersArray.length;
            totalMiscellaneousQuestionNumbersAndAnswersLength += questionNumbersAndAnswersLength;
          }
        });
  
   


    
        if (
          PersonalWorkouts.length === studentPersonalTaskUpdateCount &&
          PersonalWorkouts.length !== 0 &&
          response.response[0]?.personalWorkouts.length !== 0 &&
          personalWorkoutsNestedQuestion.length === totalQuestionNumbersAndAnswersLength &&
          personalWorkoutsNestedQuestion.length !== 0 &&
          totalQuestionNumbersAndAnswersLength !== 0
        ) {

          
          setpersonalWorkoutCompleted(true);
        }
  
        if (
          MiscellaneousWorkouts.length === studentMiscellaneousTaskUpdateCount&&
          MiscellaneousWorkouts.length !== 0 &&
          response.response[0]?.miscellaneousWorkouts.length !== 0 &&
          MiscellaneousWorkoutssNestedQuestion.length === totalMiscellaneousQuestionNumbersAndAnswersLength &&
          MiscellaneousWorkoutssNestedQuestion.length !== 0 &&
          totalMiscellaneousQuestionNumbersAndAnswersLength !== 0
        ) {

          setMiscellaneousWorkoutCompleted(true);
        }
  
        if (
          TechnicalWorkouts.length === studentTechnicalTaskUpdateCount &&
          TechnicalWorkouts.length !== 0 &&
          response.response[0]?.technicalWorkouts.length !== 0 &&
          technicalWorkoutsNestedQuestion.length === totalTechnicalQuestionNumbersAndAnswersLength &&
          technicalWorkoutsNestedQuestion.length !== 0 &&
          totalTechnicalQuestionNumbersAndAnswersLength !== 0
        ) {

          setTechnicalWorkoutCompleted(true);
        }
      } catch (err) {
        console.error("Error fetching update task:", err);
      }
    };
  
    fetchUpdateTask();
  }, [PersonalWorkouts, TechnicalWorkouts, MiscellaneousWorkouts,personalWorkoutsNestedQuestion,MiscellaneousWorkoutssNestedQuestion,technicalWorkoutsNestedQuestion]);
  

  const handleShowPersonalWorkoutStatus = () => setShowPersonalWorkoutStatus(true);
  const handleShowTechnicalWorkoutStatus = () => setShowTechnicalWorkoutStatus(true);
  const handleShowMiscellaneousWorkoutStatus = () => setShowMiscellaneousWorkoutStatus(true);

  return (
    <>
      <h1 className='text-white'>hello</h1>
      <div className="m-4 bg-white  border border-gray-300 rounded-md shadow-lg personal-workout relative">
        <div className="flex justify-between items-center m-4 ">
          <div>
            <span className="font-bold font-roboto">Personal workouts</span>
          </div>
          <div className="flex gap-3">
            {showPersonalWorkoutStatus || personalWorkoutCompleted ? (
              <div>
                <img src="/check.png" alt="" className='w-9 h-9' />
              </div>
            ) : (
              <div>
                <svg
                  className="h-8 w-8 text-red-500"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="10" />
                  <line x1="15" y1="9" x2="9" y2="15" />
                  <line x1="9" y1="9" x2="15" y2="15" />
                </svg>
              </div>
            )}

            <div className="data-collapse-target=collapse-1">
              <svg
                className="w-8 h-8"
                onClick={() => {
                  setActiveSubTask(1);
                }}
                viewBox="0 0 32 32"
                xmlns="http://www.w3.org/2000/svg"
              >
                <title />
                <g data-name="Layer 2" id="Layer_2">
                  <path d="M16,1A15,15,0,1,1,1,16,15,15,0,0,1,16,1Zm0,28A13,13,0,1,0,3,16,13,13,0,0,0,16,29Z" />
                  <path d="M10.41,12.13,16,17.71l5.59-5.58a1,1,0,0,1,1.41,0h0a1,1,0,0,1,0,1.41L16.64,19.9a.91.91,0,0,1-1.28,0L9,13.54a1,1,0,0,1,0-1.41H9A1,1,0,0,1,10.41,12.13Z" />
                </g>
              </svg>
            </div>
          </div>
        </div>
      </div>
      {activeSubTask === 1 ? <SubTask weekName={weekName} taskNumber={activeSubTask} showStatus={handleShowPersonalWorkoutStatus} /> : ''}

      <div className="m-4 bg-white mt-2 border border-gray-300 rounded-md shadow-lg ">
        <div className="flex justify-between items-center m-4">
          <div> <span className="font-bold font-roboto">Technical Workouts</span> </div>
          <div className="flex gap-3">
            {showTechnicalWorkoutStatus || technicalWorkoutCompleted ? (
              <div>
                <img src="/check.png" alt="" className='w-9 h-9' />
              </div>
            ) : (
              <div>
                <svg
                  className="h-8 w-8 text-red-500"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="10" />
                  <line x1="15" y1="9" x2="9" y2="15" />
                  <line x1="9" y1="9" x2="15" y2="15" />
                </svg>
              </div>
            )}

            <div className="data-collapse-target=collapse-1">
              <svg onClick={() => { setActiveSubTask(2) }} className="w-8 h-8" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><title /><g data-name="Layer 2" id="Layer_2"><path d="M16,1A15,15,0,1,1,1,16,15,15,0,0,1,16,1Zm0,28A13,13,0,1,0,3,16,13,13,0,0,0,16,29Z" /><path d="M10.41,12.13,16,17.71l5.59-5.58a1,1,0,0,1,1.41,0h0a1,1,0,0,1,0,1.41L16.64,19.9a.91.91,0,0,1-1.28,0L9,13.54a1,1,0,0,1,0-1.41H9A1,1,0,0,1,10.41,12.13Z" /></g></svg>
            </div>
          </div>
        </div>
      </div>
      {activeSubTask === 2 ? <SubTask weekName={weekName} taskNumber={activeSubTask} showStatus={handleShowTechnicalWorkoutStatus} /> : ''}

      <div className="m-4 bg-white mt-2 border border-gray-300 rounded-md shadow-lg ">
        <div className="flex justify-between items-center m-4">
          <div> <span className="font-bold font-roboto">Miscellaneous Workouts</span> </div>
          <div className="flex gap-3">
            {showMiscellaneousWorkoutStatus || miscellaneousWorkoutCompleted ? (
              <div>
                <img src="/check.png" alt="" className='w-9 h-9' />
              </div>
            ) : (
              <div>
                <svg
                  className="h-8 w-8 text-red-500"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="10" />
                  <line x1="15" y1="9" x2="9" y2="15" />
                  <line x1="9" y1="9" x2="15" y2="15" />
                </svg>
              </div>
            )}

            <div className="data-collapse-target=collapse-1">
              <svg onClick={() => { setActiveSubTask(3) }} className="w-8 h-8" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><title /><g data-name="Layer 2" id="Layer_2"><path d="M16,1A15,15,0,1,1,1,16,15,15,0,0,1,16,1Zm0,28A13,13,0,1,0,3,16,13,13,0,0,0,16,29Z" /><path d="M10.41,12.13,16,17.71l5.59-5.58a1,1,0,0,1,1.41,0h0a1,1,0,0,1,0,1.41L16.64,19.9a.91.91,0,0,1-1.28,0L9,13.54a1,1,0,0,1,0-1.41H9A1,1,0,0,1,10.41,12.13Z" /></g></svg>
            </div>
          </div>
        </div>
      </div>
      {activeSubTask === 3 ? <SubTask weekName={weekName} taskNumber={activeSubTask} showStatus={handleShowMiscellaneousWorkoutStatus} /> : ''}
      <p className='text-white'>View Task</p>
    </>
  );
};

export default StudentTask;
