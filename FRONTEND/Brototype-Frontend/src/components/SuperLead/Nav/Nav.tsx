import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Notification from '../Notification/Notification';
import { getRecipientsUnreadMessageCount } from '../../../utils/methods/get';
import GlobalContext from '../../../context/GlobalContext';
import { useDispatch, useSelector } from 'react-redux';
import { useSocket } from '../../../hooks/useSocket';
const Nav = () => {
  const socket = useSocket();
  const [selectedMenu, setSelectedMenu] = useState("Dashboard");
  const [notification, setNotification] = useState() // State to track selected menu item
  const superleadId = useSelector((state) => state?.superlead?.superleadData?.superleadId);
  const { unreadReload, setUnreadReload } = useContext(GlobalContext);
  const [unreadMsgCount, setUnreadMsgCount] = useState<any[]>([]);

  const navigate = useNavigate()
  const Menus = [
    { title: "Dashboard", src: "/dashboard (3).png" },
    { title: "Students", src: "/profile-user.png" },
    { title: "Advisors", src: "/job-interview (3).png" },
    { title: "Reviewers", src: "/app (1).png" },
    { title: "Fumigation", src: "/expired.png" },
    { title: "Chat", src: "/chat (2).png" },
    { title: "Calender", src: "/chat (2).png" },
    { title: "Notification", src: "" },
  ];
  const handleChangeSideBar = (title: string) => {


    try {
      setSelectedMenu(title);
      if (title === 'Dashboard') {
        navigate('/superlead')
      }
      if (title === 'Students') {


        navigate('/superlead/students')
      }
      if (title === 'Advisors') {

        navigate('/superlead/advisors')
      }
      if (title === 'Reviewers') {

        navigate('/superlead/reviewers')
      }
      if (title === 'Fumigation') {

        navigate('/superlead/fumigation')
      }
      if (title === 'Chat') {

        navigate('/superlead/chat')
      }
      if (title === 'Calender') {

        navigate('/superlead/calender')
      }
      if (title === 'Notification') {
        setNotification(true)

      }

    } catch (err) {

    }
  }
  useEffect(() => {
    const fetchRecipientsUnreadMessageCount = async () => {
      try {
        const response = await getRecipientsUnreadMessageCount(superleadId);
        if (response?.getUnreadMsgCount?.status === true) {
          console.log("kidanuuuuuuuu");

          setUnreadMsgCount(response?.getUnreadMsgCount?.unreadCounts);
          setUnreadReload(false);
        } else {
          setUnreadMsgCount([]);
          setUnreadReload(false);
        }
      } catch (error) {
        console.error("Error fetching recipients' unread message count:", error);
      }
    };
    fetchRecipientsUnreadMessageCount();
  }, [superleadId, unreadReload, socket]);

  // Calculate total unread message count
  const totalUnreadMsgCount = unreadMsgCount.reduce((total, recipient) => total + recipient.unreMsgCount, 0);

  console.log(totalUnreadMsgCount, "Total unread message count");
  useEffect(() => {
    if (socket) {
      const handleReceivedMessage = (data: any) => {
        setUnreadReload(true);
      };

      // Attach the event listener for "notification" event
      socket.on("notification", handleReceivedMessage);

      // Clean up the event listener when the component unmounts
      return () => {
        socket.off("notification", handleReceivedMessage);
      };
    }
  }, [socket, setUnreadReload]);
  return (
    <>
      <nav className="fixed mt-4.6rem z-30 w-full border-gray-200 bg-white shadow-md h-12  border-t-gray-20">
        <div className="m-2 mx-auto max-w-screen-xl">
          <ul className="flex items-center justify-between">
            <li className="flex items-center gap-16 mr-5 ml-5">
              {Menus.map((menu, index) => (
                <>
                  {menu.title === "Chat" && totalUnreadMsgCount>0 &&(
                    <span className='w-5 h-5 rounded-full bg-Average text-white absolute right-[25.5rem] bottom-7 text-xs flex justify-center font-roboto p-0.5'>{totalUnreadMsgCount}</span>
                  )}

                  <div
                    key={index}
                    className={`flex rounded-md p-1 cursor-pointer hover:bg-custom-background  text-sm items-center gap-x-2  ${selectedMenu === menu.title && "bg-custom-background"}`}
                    onClick={() => {
                      setSelectedMenu('');
                      handleChangeSideBar(menu?.title);
                    }}
                  >

                    <svg className="me-2 h-5 w-5 mt-0  group-hover:text-blue-600  dark:group-hover:text-blue-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                    </svg>

                    <p className="font-serif">{menu.title}</p>
                  </div>
                </>
              ))}
            </li>
          </ul>
        </div>
        {notification ? <Notification /> : ""}

      </nav>
    </>
  );
}

export default Nav;

