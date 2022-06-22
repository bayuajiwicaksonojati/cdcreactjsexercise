import { useFormik } from "formik";
import { useContext, useEffect, useRef } from "react";
import TodoContext from "../contexts/TodoContext";
import * as Yup from 'yup';
import TodoErrorMessage from "./TodoErrorMessage";

const TodoNewInput = props => {
    const {addTodo} = useContext(TodoContext);
    const refInput = useRef();

    const formik = useFormik({
        initialValues: {
            name: ''
        },
        validationSchema: Yup.object({
            name: Yup.string()
                .required('Todo is required')
                .min(3, 'Todo minimum 3 character')
                .max(500, 'Todo must be 500 character or less'),
        }),
        onSubmit: values => {
            addTodo(values.name);
            formik.setFieldValue('name', '');
        },
    })

    useEffect(() => {
        if(props.editMode) refInput.current.focus()
    }, [props.editMode])

    return(
        <form onSubmit={formik.handleSubmit} className='todoItem__wrap' style={{display: props.editMode ? 'flex' : 'none'}}>
            <input type='checkbox' disabled/>
            <div>
                <input ref={refInput} onBlur={formik.handleSubmit} type='text' name="name" className='todoItem__input'  placeholder='Something to do...' value={formik.values.name} onChange={formik.handleChange} />
                <TodoErrorMessage error={formik.errors.name} />
            </div>
        </form>
    )
}

export default TodoNewInput;