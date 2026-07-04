import { useEffect, useState } from "react";
import axios from "axios";

function Dashboard() {

  const [tasks, setTasks] = useState([]);

  const [title, setTitle] = useState("");

  const [description, setDescription] = useState("");

  const loadTasks = async () => {

    const res = await axios.get(
      "http://localhost:5000/api/tasks"
    );

    setTasks(res.data);

  };

  useEffect(() => {

    loadTasks();

  }, []);

  const addTask = async () => {

    await axios.post(
      "http://localhost:5000/api/tasks",
      {
        title,
        description
      }
    );

    setTitle("");
    setDescription("");

    loadTasks();

  };

  const deleteTask = async (id) => {

    await axios.delete(
      `http://localhost:5000/api/tasks/${id}`
    );

    loadTasks();

  };

  return (

    <div style={{ padding: "40px" }}>

      <h1>Task Dashboard</h1>

      <input
        placeholder="Task Title"
        value={title}
        onChange={(e) =>
          setTitle(e.target.value)
        }
      />

      <br /><br />

      <input
        placeholder="Description"
        value={description}
        onChange={(e) =>
          setDescription(e.target.value)
        }
      />

      <br /><br />

      <button onClick={addTask}>
        Add Task
      </button>

      <hr />

      {tasks.map((task) => (

        <div
          key={task._id}
          style={{
            border: "1px solid gray",
            padding: "10px",
            marginBottom: "10px"
          }}
        >

          <h3>{task.title}</h3>

          <p>{task.description}</p>

          <p>{task.status}</p>

          <button
            onClick={() =>
              deleteTask(task._id)
            }
          >
            Delete
          </button>

        </div>

      ))}

    </div>

  );

}

export default Dashboard;
