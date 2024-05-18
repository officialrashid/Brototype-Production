import Chats from "../../components/Reviewer/Chat/Chat"
import Sidebar from "../../components/Reviewer/Sidebar/sidebar";
const Chat = () => {
    return (
     <>
   <Sidebar />
            <div className="h-auto flex-1  bg-custom-background">
     <Chats/>
     </div>
     </>
    );
}

export default Chat;
