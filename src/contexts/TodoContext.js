import { createContext, useEffect, useState } from "react";

const TodoContext = createContext();

export function TodoProvider({children}){
    const [todos, settodos] = useState([]);

    const getTodos = () => {
        let todoLS = localStorage.getItem('todos');
        let todos = JSON.parse(todoLS);
        if(todoLS) settodos(todos.sort((a, b) => new Date(a.deadline) - new Date(b.deadline)));
    }

    const addTodo = desc => {
        let newId = todos.length > 0 ? todos.sort((a, b) => b.id - a.id)[0].id+1 : 1;
        let newtd = [...todos, {
            id: newId, 
            name: desc,
            done: false,
            deadline: null
        }];
        newtd = newtd.sort((a,b) => new Date(a.deadline) - new Date(b.deadline));
        settodos(newtd);
        localStorage.setItem('todos', JSON.stringify(newtd));
    } 

    const editTodo = (id, todo) => {
        let tdIndex = todos.findIndex(a => a.id === id);
        let td = {
            ...todos[tdIndex],
            name: todo?.name ? todo?.name : todos[tdIndex].name,
            deadline: todo?.deadline ? todo?.deadline : todos[tdIndex].deadline,
            done: todo?.done != null ? todo?.done : todos[tdIndex].done
        };
        let newtd = [...todos];
        newtd[tdIndex] = td;
        newtd = newtd.sort((a,b) => new Date(a.deadline) - new Date(b.deadline));
        settodos(newtd);
        localStorage.setItem('todos', JSON.stringify(newtd));
    }

    const changeDoneTodo = (id, done) => {
        editTodo(id, {done: done});
    }

    const deleteTodo = id => {
        let newtd = [...todos];
        newtd.splice(newtd.findIndex(a => a.id === id), 1);
        settodos(newtd);
        localStorage.setItem('todos', JSON.stringify(newtd));
    }

    useEffect(() => {
        getTodos()
    }, [])

    return(
        <TodoContext.Provider value={{
            todos,
            getTodos,
            addTodo,
            editTodo,
            changeDoneTodo,
            deleteTodo
        }}>
            {children}
        </TodoContext.Provider>
    )
}

export default TodoContext;