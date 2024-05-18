import TodoProfile from "../../components/Students/TodoList/TodoProfile"
import TodoTaskList from "../../components/Students/TodoList/TodoTaskList"
import TodoStatus from "../../components/Students/TodoList/TodoStatus";
const TodoList = () => {
    return (
        <div className="h-auto flex-1  bg-custom-background">
        <div className="flex">
           <TodoProfile/>
           <TodoTaskList/>
           <TodoStatus/>
           </div>
        </div>
    );
}

export default TodoList;
