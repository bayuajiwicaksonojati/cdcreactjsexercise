const TodoErrorMessage = props => {
    return(
        <>
            {
                props.error ? <p className="todoErrorMessage">{props.error}</p> : null
            }
        </>
    )
}

export default TodoErrorMessage;