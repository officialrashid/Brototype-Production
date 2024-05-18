// SubTask.js
import React, { useState, useEffect } from 'react';
import TaskModal from './TaskModal';
import { getPersonalWorkout, getProfile, getTechnicalWorkout, getUpdateTask, getmiscellaneousWorkout } from '../../../utils/methods/get';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

const SubTask = ({ weekName, taskNumber, showStatus }: { weekName: string, taskNumber: Number, showStatus: Function }) => {
  let questionCount = 0;
  const [PersonalWorkouts, setPersonalWorkouts] = useState([]);
  const [personalWorkoutsNestedQuestion, setPersonalWorkoutsNestedQuestion] = useState([]);
  const [TechnicalWorkouts, setTechnicalWorkouts] = useState([]);
  const [technicalWorkoutsNestedQuestion, setTechnicalWorkoutsNestedQuestion] = useState([]);
  const [MiscellaneousWorkouts, setMiscellaneousWorkouts] = useState([]);
  const [MiscellaneousWorkoutssNestedQuestion, setMiscellaneousWorkoutsNestedQuestion] = useState([]);
  const [activeModal, setActiveModal] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState<{ Number: number; question: string } | null>(null);
  const [mainQuestionNumber, setMainQuestionNumber] = useState(0);
  const [modalType, setModalType] = useState("");
  const [noTaskMessage,setNoTaskMessage] = useState("")
  const [answerCount, setAnswerCount] = useState<any[]>([]);
  const [mainQuestion,setMainQuestion] = useState("")
  let personalWorkoutsArray;
  let technicalWorkoutsArray;
  let miscellaneousWorkoutsArray;
  let domain: string;
  const studentId: any = useSelector((state: any) => state?.student?.studentData?.studentId);

  useEffect(() => {
    const fetchTasks = async () => {
      if (taskNumber === 1) {
        const personalWorkout = await getPersonalWorkout(weekName);
        setPersonalWorkouts(personalWorkout?.response?.personalWorkouts);
        setPersonalWorkoutsNestedQuestion(personalWorkout?.response?.personalWorkoutNestedQuestions);
      }
      if (taskNumber === 2) {
        const response = await getProfile(studentId);
        if (response?.data?.status) {
          const [profileData] = response?.data?.response;
          const fullDomainName = profileData.domain;
          console.log(fullDomainName,"fullDomainNameeeeeeee");
          
          if (!fullDomainName) {
            console.log("keriyanuuuuuuuuuuuu dommnn");
            
            setNoTaskMessage("No workouts available.beacause your techLead not update task")
            toast.warn("Your Domain Not Found. Please Update Your Profile");
          } else {
             domain = fullDomainName.replace(/developer$/i, '');
             console.log(domain,"seconddomain log");
             
            if (!domain) {
              console.log("keriii != vllllll");
              
              setNoTaskMessage("Your Domain Not Found. Please Update Your Profile")
              toast.warn("Some Issue In Task Fetch. Please Try After Some Time");
            } else {
              const data = {
                domain,
                weekName
              };
              const response = await getTechnicalWorkout(data)
              console.log(response,"responseee in  get technical wprkoutsss");
              
              if(response.status===true){
                console.log("response il keri taaaa666666");
                
                setTechnicalWorkouts(response.response[0].technicalWorkouts);
                setTechnicalWorkoutsNestedQuestion(response.response[0].technicalWorkoutNestedQuestions);
             
              }else{
                setNoTaskMessage("No workouts available.beacause your techLead not update task")
              }
   
            }
          }
        } else {
          console.error("Failed to get profile data:", response?.data?.message);
        }
      }
      if (taskNumber === 3) {
        const miscellaneousWorkout = await getmiscellaneousWorkout(weekName);
        setMiscellaneousWorkouts(miscellaneousWorkout?.response?.miscellaneousWorkouts);
        setMiscellaneousWorkoutsNestedQuestion(miscellaneousWorkout?.response?.miscellaneousWorkoutNestedQuestions);
      }
    }
    fetchTasks()
  }, [studentId, taskNumber, weekName,activeModal]);

  const openModal = (questions: any, questionNumber: React.SetStateAction<number>, question:string ,modalType: string) => {
    console.log(questionNumber,"This is add question NUmber");
    
    if (questions.length > 0) {
      setSelectedQuestion(questions);
      setMainQuestionNumber(questionNumber);
      setMainQuestion(question);
      setModalType(modalType);
      setActiveModal(true);
    }
  };

  useEffect(() => {
    const fetchUpdateTask = async () => {
      try {
        const response = await getUpdateTask(studentId);
        personalWorkoutsArray = response.response[0].personalWorkouts;
        technicalWorkoutsArray = response.response[0].technicalWorkouts;
        miscellaneousWorkoutsArray = response.response[0].miscellaneousWorkouts;

        if (taskNumber === 1) {
          setAnswerCount(personalWorkoutsArray);
        } else if (taskNumber === 2) {
          setAnswerCount(technicalWorkoutsArray);
        } else if (taskNumber === 3) {
          setAnswerCount(miscellaneousWorkoutsArray)
        }

      } catch (err) {
        console.error("Error fetching update task:", err);
      }
    };

    fetchUpdateTask();
  }, [studentId, taskNumber, activeModal]);

  const questionCountChange = () => {
     questionCount ++;
  
     if(taskNumber===1){
      if(PersonalWorkouts.length === questionCount){
        showStatus()
       }
     }  if(taskNumber === 2){
         if(TechnicalWorkouts.length === questionCount){
          showStatus()
         }
     }  if(taskNumber === 3){
      if(MiscellaneousWorkouts.length === questionCount){
        showStatus()
       }
     }
    
  }


  const renderWorkouts = (workouts: any[], nestedQuestions: any[], taskType: string) => {


    if (!Array.isArray(workouts)) {
      return <p className='text-center font-roboto text-red-700'>No workouts available.beacause your techLead not update task</p>;
    }
    if(noTaskMessage){
      return <p className='text-center font-roboto text-red-700'>{noTaskMessage}</p>;
    }
return (
  <div>
    {workouts.map((question) => {

      
      const currentNestedQuestions = nestedQuestions.filter(nested => nested.mainQuestionNumber === question.Number);

      const currentAnswers = answerCount.filter(answer => answer.mainQuestionNumber === question.Number && weekName === answer.week);

      // Check if currentAnswers is not empty and if the first element has questionNumbersAndAnswers property
      const answersLength = currentAnswers.length > 0 && currentAnswers[0].questionNumbersAndAnswers ? currentAnswers[0].questionNumbersAndAnswers.length : 0;
     

      const currentNestedQuestionCount = currentNestedQuestions.length;

      if (currentNestedQuestionCount === answersLength && answersLength !== 0) {

        questionCountChange();
      }


      return (
        <div key={question.Number} className="border border-2px m-9 border-b rounded-md shadow-xl data-collapse=collapse-1 font-roboto">
          <div className="m-7 border border-1px rounded-md shadow-xl border-black">
            <div className="flex justify-between m-2 items-center py-2">
              <div>
                <span className='font-roboto"'>
                  {question.Number}. {question.question}
                </span>
              </div>
              <div>
                {currentNestedQuestionCount === answersLength ? (
                  <button className={`bg-blue-700 rounded-md px-3 py-1 text-white`} onClick={() => openModal(currentNestedQuestions, question.Number,question.question,'Edit')}>
                    Edit
                  </button>
                ) : (
                  <button className={`bg-red-700 rounded-md px-3 py-1 text-white`} onClick={() => openModal(currentNestedQuestions, question.Number,question.question,'Complete')}>
                    Complete
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      );
    })}

    <TaskModal isVisible={activeModal} onclose={() => setActiveModal(false)} questions={selectedQuestion ? [selectedQuestion] : []} mainQuestionNumber={mainQuestionNumber} mainQuestion={mainQuestion} weekName={weekName} taskNumber={taskNumber} modalType={modalType} taskType={taskType} />

  </div>
);

  };

  return (
    <div>
      {taskNumber === 1 && renderWorkouts(PersonalWorkouts, personalWorkoutsNestedQuestion, 'personal')}
      {taskNumber === 2 && renderWorkouts(TechnicalWorkouts, technicalWorkoutsNestedQuestion, 'technical')}
      {taskNumber === 3 && renderWorkouts(MiscellaneousWorkouts, MiscellaneousWorkoutssNestedQuestion, 'miscellaneous')}
    </div>
  );
};

export default SubTask;
