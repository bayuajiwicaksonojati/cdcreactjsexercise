import { useContext, useEffect, useState } from "react";
import TodoContext from "../contexts/TodoContext";

const TodoHead = props => {
    const {todos} = useContext(TodoContext);

    const [date, setDate] = useState({day: '', month: ''});
    const getDate = () => {
        let fulldate = new Date();
        let date = fulldate.getDate();
        let dateLastDigit = date % 10;
        let dateSur = dateLastDigit > 3 ? 'th' : dateLastDigit === 2 ? 'nd' : dateLastDigit === 1 ? 'st' : '';
        let mos = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        let days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
        setDate({day: `${days[fulldate.getDay()-1]}, ${date}${dateSur}`, month : mos[fulldate.getMonth()]})
    }

    useEffect(() => {
        getDate();
    }, [])

    return(
        <div className='todoHead'>
            <div>
                <h3>{date?.day}</h3>
                <p>{date?.month}</p>
            </div>
            <div>
                <p>{`${todos?.length} Tasks`}</p>
            </div>
            <button className='todoHead__button' onClick={props.handleEditMode} style={{transform: props.editMode ? 'rotate(45deg)' : 'none', background: props.editMode ? '#fa6768' : '#6200ee'}}>+</button>
        </div>
    )
}

export default TodoHead;