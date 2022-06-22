import { useContext } from "react";
import TodoContext from "../contexts/TodoContext";

const TodoButtonDelete = props => {
    const {deleteTodo} = useContext(TodoContext);
    return(
        <button onClick={() => deleteTodo(props.id)} className='todoItem__buttonDelete'>+</button>
    )
}

export default TodoButtonDelete;