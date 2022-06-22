import { memo, useContext, useEffect, useRef, useState } from "react";
import TodoContext from "../contexts/TodoContext";
import { useFormik } from "formik";
import * as Yup from 'yup';
import TodoErrorMessage from "./TodoErrorMessage";
import TodoButtonDelete from "./TodoButtonDelete";
import icAlarm from '../icons/bell.png';

import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import moment from "moment";

const TodoListItem = props => {
    const {editTodo} = useContext(TodoContext);
    const [editMode, seteditMode] = useState(false);
    const refInput = useRef();

    const [isForcePickerOpen, setIsOpen] = useState(false);
    const [selectedDate, setselectedDate] = useState(props.todo.deadline ? props.todo.deadline : new Date());

    const inputOnBlur = e => {
        if(formik.errors.name)
            refInput.current.focus()    
        else{
            formik.handleSubmit(); 
            seteditMode(false);
        } 
    }

    const checkboxOnChange = e => {
        formik.handleChange(e); 
        formik.handleSubmit();
    }

    const formik = useFormik({
        initialValues: {
            done: props.todo.done,
            name: props.todo.name,
            deadline: props.todo.deadline ? props.todo.deadline : new Date()
        },
        onSubmit: (values) => {
            editTodo(props.todo.id, values);
        },
        validationSchema: Yup.object({
            name: Yup.string()
                .required('Todo is required')
                .min(3, 'Todo is minimal 3 characters')
                .max(500, 'Todo is 500 characters max'),
            deadline: Yup.date()
                .min(new Date(), "Deadline must be in the future")
        })
    })

    useEffect(() => {
        if(editMode) refInput.current.focus()
    }, [editMode])

    return(
        <>
            {formik.errors.deadline ? <TodoErrorMessage error={formik.errors.deadline}/> : null}
            {props.todo.deadline ? <p style={{textDecoration: props.todo.done ? 'line-through' : 'none'}}>{moment(props.todo.deadline).format('MMM DD, h:mm a')}</p> : null}
            <div className='todoItem'>
                <DateTimePicker
                    minDateTime={moment()}
                    open={isForcePickerOpen}
                    onClose={() => {
                        setIsOpen(false);
                        formik.handleSubmit();
                    }}
                    value={formik.values.deadline}
                    onChange={(e) => formik.setFieldValue('deadline', e._d)}
                    renderInput={({
                        ref,
                        inputProps,
                        disabled,
                        onChange,
                        value,
                        ...other
                      }) => (
                        <div ref={ref} {...other}>
                          <input
                            style={{ display: "none" }}
                            value={value}
                            onChange={onchange}
                            disabled={disabled}
                            name='deadline'
                            {...inputProps}
                          />
                          <img src={icAlarm} alt='alarm icon' onClick={() => setIsOpen(isOpen => !isOpen)} style={{height: '15px', marginRight: '10px'}} />
                        </div>
                      )}
                />
                <input name='done' checked={formik.values.done} onChange={checkboxOnChange} type='checkbox'/>
                {
                    editMode ? 
                        <div>
                            <input className='todoItem__input' ref={refInput} name='name' onChange={formik.handleChange} value={formik.values.name} onBlur={inputOnBlur} />
                            <TodoErrorMessage error={formik.errors.name}  />
                        </div>
                        :
                        <>
                            <p className='todoItem__input' style={{textDecoration: props.todo.done ? 'line-through' : 'none'}} onClick={() => seteditMode(true)}>{props.todo.name}</p>
                            <TodoButtonDelete id={props.todo.id} />
                        </>
                }
            </div>
            <hr className='todoItem__separator'/>
        </>
    )
}

export default memo(TodoListItem);