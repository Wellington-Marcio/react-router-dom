import React from 'react'

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';


export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState("");
  const user_email = localStorage.getItem("@app_user_email");
  const navigate = useNavigate();

  const SHEETDB_ENDPOINT = "https://sheetdb.io/api/v1/t3f0khtspqdtd";

  useEffect(() => {
    if (!user_email) {
      navigate("/login");
      return;
    }
    fetch(`${SHEETDB_ENDPOINT}/search?user=${user_email}&sheet=${"login"}`)
      .then((response) => response.json())
      .then((data) => setTasks(data));
  }, []);

  const handleAddTask = () => {
    const newId = uuidv4();
    const newTask = { id:newId,task: task, status: "todo", user: user_email };
    fetch(`${SHEETDB_ENDPOINT}?sheet=${"login"}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ data: newTask }),
    }).then(() => {
      setTasks([...tasks, newTask]);
      setTask("");
    });
  };

  const handleDeleteTask = (taskToDelete) => {
    // Primeiro, nós construímos a URL para DELETE usando o ID da tarefa que queremos excluir.
    fetch(`${SHEETDB_ENDPOINT}/id/${taskToDelete.id}?sheet=${"login"}`, {
      method: "DELETE", // Usamos o método DELETE para deletar dados.
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json()) // Após a resposta, convertemos a mesma em um objeto JSON.
      .then((data) => {
        // Se o registro foi deletado com sucesso, atualizamos a lista de tarefas no estado.
        if (data.deleted) {
          const updatedTasks = tasks.filter(
            (task) => task.id !== taskToDelete.id
          );
          setTasks(updatedTasks);
        }
      });
  };

  const handleToggleStatus = (taskToToggle) => {
    // Dependendo do status atual, determinamos qual será o novo status.
    const updatedStatus = taskToToggle.status === "done" ? "todo" : "done";

    // Em seguida, construímos a URL para PATCH usando o ID da tarefa cujo status queremos atualizar.
    fetch(`${SHEETDB_ENDPOINT}/id/${taskToToggle.id}?sheet=${"user-todo"}`, {
      method: "PATCH", // Usamos o método PATCH para atualizar parcialmente dados.
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      // No corpo da requisição, especificamos os dados que queremos atualizar.
      body: JSON.stringify({
        data: {
          status: updatedStatus,
        },
      }),
    })
      .then((response) => response.json()) // Novamente, após a resposta, a convertemos em um objeto JSON.
      .then((data) => {
        // Se a atualização foi bem-sucedida, atualizamos a lista de tarefas no estado.
        if (data.updated) {
          const updatedTasks = tasks.map((task) =>
            task.id === taskToToggle.id
              ? { ...task, status: updatedStatus }
              : task
          );
          setTasks(updatedTasks);
        }
      });
  };

  return (
    <div className="container">
      <h3>Tasks control</h3>

      <div className="input-field">
        <input
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />
        <label>Add New Task</label>
      </div>
      <button className="btn waves-effect waves-light" onClick={handleAddTask}>
        Add Task
      </button>

      <h5>Tasks List</h5>
      <ul className="collection">
        {tasks.map((t) => (
            
          <li className="collection-item"  key={t.task}>
            <a
            
              href="#"
              onClick={() => handleToggleStatus(t)}
              className="btn"
            >
              <i className="material-icons">
                {t.status === "done" ? "undo" : "done"}
              </i>
            </a>
            <span style={{padding:'10px'}}>{t.status === "done" ? <strike>{t.task}</strike> : t.task}</span>
            <a
              href="#"
              onClick={() => handleDeleteTask(t)}
              className="btn secondary-content red"
            >
              <i className="material-icons">delete</i>
            </a>
            
          </li>
        ))}
      </ul>
    </div>
  );
}

