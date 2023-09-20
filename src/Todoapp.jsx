import { useState } from "react";
function Todoapp() {
  const [input, setInput] = useState("");
  const [completedTaskcount, setCompletedTaskCount] = useState(0);
  const [todoList, setTodoList] = useState([]);
  const [editId, setEditId] = useState(null);
  const [editTask,setEditTask]=useState("");

  const handleClick = () => {
    // Trim any leading and trailing whitespace from the input
    const trimmedInput = input.trim();

    // Check if the trimmed input is not empty
    if (trimmedInput) {
      const id = todoList.length + 1;
      setTodoList((prev) => [
        ...prev,
        {
          id: id,
          task: trimmedInput, // Use the trimmed input
          complete: false,
        },
      ]);
      setInput("");
    } else {
      // Optionally, you can display an alert or perform some other action
      // to notify the user that the input is empty and a task wasn't added.
      alert("Please enter a task before adding.");
    }
  };

  const handleComplete = (id) => {
    let list = todoList.map((task) => {
      let item = {};
      if (task.id == id) {
        if (!task.complete) {
          //complete is setted as false that means not completed but when we used no operator that means its
          // true now means completed do we incremented the value by 1.
          setCompletedTaskCount(completedTaskcount + 1);
        } else {
          setCompletedTaskCount(completedTaskcount - 1);
        }
        item = { ...task, complete: !task.complete };
      } else {
        item = { ...task };
      }
      return item;
    });
    setTodoList(list);
  };
  const handleEditClick = (id) => {
    setEditId(id);
  };

  const handleSaveEditId = (id) => {
    const updatedList = todoList.map((task) =>
      task.id === id ? { ...task, task:editTask } : task
    );
    setTodoList(updatedList);
    setEditId(null);
  };


  const handleDeleteClick =(id)=>{
    const afterDelete=todoList.filter((todo)=>todo.id!==id)
    setTodoList(afterDelete);
  }
  return (
    <>
      <div className="cont1 box">
        {/* {" "} */}
        <h1 id="heading1"> A To Do App For you</h1>
      </div>
      <p className="para" id="para1">
        Let us make it together &#x1F4D4;
        {/* {" "} */}
      </p>
      <div className="container">
        <div className="container1">
          <h2 className="heading2">Have you done this&#x2753; </h2>
          <hr style={{ color: "white" }}></hr>
          <input value={input} onInput={(e) => setInput(e.target.value)} />
          <button
            className="btn"
            onClick={() => {
              handleClick();
            }}
          >
            Add task
          </button>
          <div>
            <span className="span1">
              <b>Incomplete Tasks &#x1F590;</b>
              {todoList.length - completedTaskcount}
            </span>
            <span className="span2">
              <b>Done &#x1F638; :</b>
              {completedTaskcount}
            </span>
          </div>
          <div className="innercontainer1">
            <ul >
              {todoList.map((todo) => (
                <li
                  key={todo.id}
                  className={todo.complete ? "completed" : ""}
                  id={todo.id}
                  onClick={() => handleComplete(todo.id)}
                >
                  {editId === todo.id ? (
                    <div>
                    <input
                      type="text"
                      value={editTask}
                      onChange={(e)=>setEditTask(e.target.value)}
                      onBlur={()=>handleSaveEditId(todo.id)}
                    />
                    <button className="buttonSave" onClick={()=>handleSaveEditId(todo.id)}>Save</button>
                    </div>
                  ) : (
                    <>
                      {todo.task}
                      <span className="spanbutton1">
                      <button className= "buttonedit"  onClick={() => handleEditClick(todo.id)}>
                      &#x1F58A;
                      </button>
                      </span>
                      <span className="spanbutton2">
                      <button className="buttonDelete" onClick={()=>handleDeleteClick(todo.id)}>&#x1F5D1;</button>
                      </span>
                    </>

                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <footer className="footer " id="footerbox">
        <h3 id="fheading">All rights & &#x00A9; are reserved</h3>
      </footer>
    </>
  );
}

export default Todoapp;
