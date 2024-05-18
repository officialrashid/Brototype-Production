import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { setStudentData } from '../../../redux-toolkit/studentReducer';
import { useDispatch } from 'react-redux';
const Sidebar = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(true);
  const [sidebar, setSidebar] = useState('Dashboard');
  const [showViewTask, setShowViewTask] = useState(false);
  const dispatch = useDispatch()

  const Menus = [
    { title: "Dashboard", src: "/dashboard (3).png" },
    { title: "Profile", src: "/profile-user.png" },
    { title: "Review", src: "/job-interview (3).png" },
    { title: "Task", src: "/app (1).png" },
    { title: "Extend", src: "/expired.png" },
    { title: "Chat", src: "/chat (2).png" },
    { title: "Logout", src: "/logout.png" },
  ];

  const handleChangeSideBar = (title: string) => {
    setSidebar(title);
    setShowViewTask(true);
    if (title === 'Dashboard') {
      navigate('/student');
    }
    if (title === 'Profile') {
      navigate('/student/profile');
    }
    if (title === 'Task') {
      navigate('/student/task');
    }
    if (title === 'Todo') {
      navigate('/student/todolist');
    }
    if (title === 'Extend') {
      navigate('/student/extendDetails');
    }
    if (title === 'Review') {
      navigate('/student/review');
    }
    if (title === 'Chat') {
      navigate('/student/chat');
    }
    if (title === 'Logout') {
      Swal.fire({
        title: "Are you sure?",
        text: "Do you want to perform logout action?",
        icon: "question",
        showCancelButton: true,
        confirmButtonText: "Yes",
        cancelButtonText: "No"
      }).then(async (result) => {
        if (result.isConfirmed) {
           dispatch(setStudentData(""))
           localStorage.removeItem(`studentAccessToken`)
           localStorage.removeItem("studentCustomToken")
           localStorage.removeItem('role')
           localStorage.removeItem('studentIdToken')
           dispatch(setStudentData(""))
           navigate('/studentIn')
        }
      }
      )
    }
  };

  // Add a class to the body when the sidebar is open
  const bodyClass = open ? "overflow-hidden" : "";

  return (
    <div
      className={`fixed ${open ? "w-72" : "w-20"} h-screen p-5 pt-8 relative duration-300 border  border-b-0`}
    >
      {/* Apply the body class here */}
      <ul className={`pt-6 ${bodyClass}`}>
        {Menus.map((Menu, index) => (
          <li
            key={index}
            className={`flex rounded-md p-2 cursor-pointer hover:bg-custom-background text-gray-300 text-sm items-center gap-x-4 ${Menu.gap ? "mt-9" : "mt-2"
              } ${index === 0 && sidebar === 'Dashboard' && "bg-custom-background"} ${sidebar === Menu.title && "bg-custom-background"
              }`}
            onClick={() => {
              setSidebar('');
              handleChangeSideBar(Menu.title);
            }}
          >
            <img src={Menu.src} className="w-5  h-5" />
            <span className={`${!open && "hidden"} origin-left duration-200`}>
              {Menu.title}
            </span>
          </li>
        ))}
      </ul>

    </div>
  );
};

export default Sidebar;
