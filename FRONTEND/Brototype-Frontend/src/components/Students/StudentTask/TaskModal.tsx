import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { updateMiscellaneousWorkout, updatePersonalWorkout, updateTechnicalWorkout } from '../../../utils/methods/post';
import { toast } from 'react-toastify';
import { getEditTaskDetails } from '../../../utils/methods/get';
import * as Yup from 'yup';
import { RootState } from '../../../redux-toolkit/store';

interface TaskModalProps {
  isVisible: boolean;
  onclose: () => void;
  questions: any[] | null;
  mainQuestionNumber: number;
  weekName: string;
  taskNumber: number;
  modalType: string;
  taskType: string;
  mainQuestion:string
}

interface FormValues {
  answers: Record<string, any>;
}

const ErrorText: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <p className="text-sm font-roboto text-red-700 mt-3 ml-3">
    {children}
  </p>
);

const TaskModal: React.FC<TaskModalProps> = ({ isVisible, onclose, questions, mainQuestionNumber, mainQuestion, weekName, taskNumber, modalType, taskType }) => {
  if (!isVisible || !questions || questions.length === 0) return null;
console.log(questions,"modalQuestionsss,this is questionsssssssssss=======+++++()()()()=-----");
console.log(mainQuestionNumber,"modal MainQuestions");
console.log(mainQuestion,"*********((((((********{}******)))))");

  const [editData, setEditData] = useState([]);
  const [nestedQuestion,setNestedQuestion] = useState("")
  const studentId: any = useSelector((state: any) => state?.student?.studentData?.studentId);
  const batchId: any = useSelector((state: RootState) => state?.student?.studentData?.batchId);

  useEffect(() => {
    const fetchEditTaskDetails = async () => {
      try {
        if (modalType === 'Edit') {
          console.log(questions,"questionssssssss");
          
          const data = {
            studentId,
            mainQuestionNumber,
            taskType,
            weekName,
          };
          console.log(
            studentId,
            mainQuestionNumber,
            taskType,
            weekName,"{}{}{}{_____++++++++++++");
          
          const response = await getEditTaskDetails(data);
          console.log(response.data[0],"LLLLLLLLLOOOOOIIII GET EDITTASKEEEE");
          if (response) {
            response.data[0].map((editData: any, index: number) => {
              formik.setFieldValue(`answers.${editData.nestedQuestionNumber}`, editData.answer);
              setEditData(response.data[0]);
            })

          } else {
            setEditData([]);
          }
        }
      } catch (error) {
        console.error("Error fetching edit task details:", error);
      }
    };

    fetchEditTaskDetails();
  }, []);

  const updateWorkout = async (workoutType: any, workoutData: any) => {
    try {
      const response = await workoutType(workoutData);
      console.log(response, `${workoutType} update task response`);
      if (response && response?.response?.status === true) {
        toast.success("task updated successfully");
        onclose();
      } else {
        toast.error("some issue found task updated, please try again");
        onclose();
      }
    } catch (err) {
      console.error(`Error updating ${workoutType} workout:`, err);
    }
  };

  const validationSchema = Yup.object().shape({
    answers: Yup.object().shape(
      questions[0]
        .filter((question: { mainQuestionNumber: number; }) => question.mainQuestionNumber === mainQuestionNumber)
        .reduce((schema: any, question: { Number: any; }) => {
          return {
            ...schema,
            [question.Number]: Yup.string().trim().required(`Answer for Question ${question.Number} is required`),
          };
        }, {})
    ),
  });

  const formik = useFormik({
    initialValues: {
      answers: {},
    } as FormValues,
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        console.log('Form values:', values);

        const workouts = Object.entries(values.answers).map(([nestedQuestionNumber, answer]) => ({
          nestedQuestionNumber,
          answer,
          nestedQuestion
        }));

        console.log('Question and Answer pairs:', workouts);

        const body = {
          studentId,
          batchId,
          weekName,
          mainQuestionNumber,
          [`${taskNumber === 1 ? 'personal' : taskNumber === 2 ? 'technical' : 'miscellaneous'}Workouts`]: workouts,
          mainQuestion,
          

        };

        console.log(body, "body log");

        if (taskNumber === 1) {
          console.log(body,"bosy from Edit datataaa");
          
          updateWorkout(updatePersonalWorkout, body);
        } else if (taskNumber === 2) {
       
          updateWorkout(updateTechnicalWorkout, body);
        } else if (taskNumber === 3) {
          updateWorkout(updateMiscellaneousWorkout, body);
        }
      } catch (err) {
        console.error('Error submitting form:', err);
      }
    },
  });

  const handleQuestionChange = (e: React.ChangeEvent<HTMLInputElement>, questionNumber: string, question:string, index: number) => {
    console.log(questionNumber,"lllllll");
    console.log(question,"question numbereeeeeee");
    setNestedQuestion(question?.Question)
    if (modalType === 'Edit') {
      const updatedEditData = [...editData];  // Create a new array
      updatedEditData[index].answer = e.target.value;  // Update the specific element
      setEditData(updatedEditData);  
      console.log(`answers.${questionNumber}`,"edit data not updated dbdd");
      console.log(e.target.value,"edit data notupdated db");
      
           
      formik.setFieldValue(`answers.${questionNumber}`, e.target.value); // Set the state with the updated array
    }else{
      console.log(e.target.value,"e.target.value");
      
      formik.setFieldValue(`answers.${questionNumber}`, e.target.value);
    }
  
  };
// Function to check if a string is a valid URL
function isLink(str:any) {
  // Regular expression to match URLs
  var urlRegex = /^(ftp|http|https):\/\/[^ "]+$/;
  // Test if the string matches the URL regex
  return urlRegex.test(str);
}


  return (
    <div className="fixed inset-0 bg-opacity-10 bg-black/60 flex justify-center items-center overflow-y-scroll overflow-hidden z-40">
      <div className="border border-gray-200 m-5 rounded-lg shadow-2xl w-3/5 bg-white">
        <form onSubmit={formik.handleSubmit}>
        {questions[0].map((question: any, index: number) =>
    question.mainQuestionNumber === mainQuestionNumber && (
        <div key={question.Number} className="m-5 mt-6">
            <div className="m-7 border border-black rounded-md shadow-2xl">
                <div className="flex justify-between items-center m-4">
                    <div>
                        <span className="font-bold font-roboto">
                            {question.Number}.{question.Question}
                        </span>
                    </div>
                </div>
            </div>
            <div className="m-7 mt-6">
                {editData && editData.length > index ? (
                    <div>
                        <input
                            type="text"
                            id={question.Number}
                            name={question.Number}
                            onChange={(e) => handleQuestionChange(e, question.Number,question, index)}
                            onBlur={formik.handleBlur}
                            value={editData[index]?.answer || ''}
                            className="border border-2px rounded-lg text-sm font-roboto pl-3 outline-none shadow-lg w-full py-5"
                            placeholder={`Enter your answer for Question ${question?.Number}`}
                        />

                        {formik.touched.answers && formik.errors.answers && formik.errors.answers[question.Number] && (
                            <ErrorText>{formik?.errors?.answers[question?.Number]}</ErrorText>
                        )}
                    </div>
                ) : (
                    <div>
                        <input
                            type="text"
                            id={question.Number}
                            name={question.Number}
                            onChange={(e) => handleQuestionChange(e, question.Number,question, index)}
                            onBlur={formik.handleBlur}
                            value={
                                isLink(formik.values.answers[question.Number]) ? 'Link' : formik.values.answers[question.Number]
                            } // Show 'Link' if it's a link
                            className="border border-2px rounded-lg text-sm font-roboto pl-3 outline-none shadow-lg w-full py-5"
                            placeholder={`Enter your answer for Question ${question.Number}`}
                        />
                        {formik.touched.answers && formik.errors.answers && formik.errors.answers[question.Number] && (
                            <ErrorText>{formik.errors.answers[question.Number]}</ErrorText>
                        )}
                    </div>
                )}
            </div>
        </div>
    )
)}



          <div className="flex justify-between mr-12 m-6 gap">
            <div></div>
            <div>
              <button className="border px-4 py-1 rounded-md bg-black text-white font-robot" onClick={onclose}>
                Cancel
              </button>
              <button type="submit" className="border px-4 py-1 rounded-md bg-black text-white font-roboto">
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskModal;
