import { useContext, useState } from "react";
import TodoHead from "../components/TodoHead";
import TodoListItem from "../components/TodoListItem";
import TodoNewInput from "../components/TodoNewInput";
import TodoContext from "../contexts/TodoContext";

const Home = () => {
    const {todos} = useContext(TodoContext);

    const [editMode, setEditMode] = useState(false);

    return(
        <>
            <TodoHead editMode={editMode} handleEditMode={() => setEditMode(!editMode)} />
            <div>
                {
                    todos?.map(todo => 
                        <TodoListItem key={todo.id} todo={todo} />
                    )
                }
                <TodoNewInput editMode={editMode} onLostFocus={() => setEditMode(false)} />
            </div>

        </>
    )
}

export default Home;