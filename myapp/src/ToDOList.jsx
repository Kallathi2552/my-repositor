import { useState, useEffect } from "react";
import "./ToDOList.css";  
import AOS from "aos";
import "aos/dist/aos.css";

function ToDOList() {
  const [task, setTask] = useState("");
  const [list, setList] = useState([]);
useEffect(() => {
    AOS.init({
      duration: 1000,   // animation duration
      once: true        // whether animation should happen only once
    });
  }, []);

  useEffect(() => {
    const savedTasks = localStorage.getItem("tasks");
    if (savedTasks) {
      setList(JSON.parse(savedTasks));
    }
  }, []);
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(list));
  }, [list]);

  const addTask = () => {
    if (task.trim() !== "") {
      setList([...list, task]);
      setTask("");
    }
  };

  const deleteTask = (index) => {
    setList(list.filter((_, i) => i !== index));
  };

  return (
    <div className="todo-container" data-aos="fade-down">
      <h2>My To-Do List</h2>

      <div className="input-box">
        <input
          type="text"
          placeholder="Enter a task"
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />
        <button onClick={addTask}>Add</button>
      </div>

      <ul>
        {list.map((item, index) => (
          <li key={index}>
            {item}
            <button onClick={() => deleteTask(index)}>x</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ToDOList;