import React from 'react';

import axios from 'axios';

import './styles.scss';

import Counter from 'src/components/Counter';
import Form from 'src/components/Form';
import Tasks from 'src/components/Tasks';
import Title from 'src/components/Title';
import Delete from 'src/components/Delete';

// import tasksData from 'src/data/tasks';

class Todolist extends React.Component {
  state = {
    tasks: [],
    taskValue: '',
  };

  // Charge les taches présente dans la BDD
  componentDidMount() {
    axios.get(`http://localhost/React/todolist/back/public/taches`)
      .then(res => {
        const tasks = res.data;
        this.setState({ tasks });
      })
  }

  setTaskValue = (value) => {
    this.setState({ taskValue: value });
  };

  addTask = () => {
    const { tasks, taskValue } = this.state;

    // si la valeur de taskValue ne contient qu'une chaine vide, alors on sort au plus vite de la fonction avec return
    if (taskValue === '') {
      return;
    }

    const ids = tasks.map((task) => task.id);
    const maxId = Math.max(...ids);

    const newTask = {
      label: taskValue,
      done: 0,
      id: maxId + 1,
    };

    // on vient déverser le contenu de tasks dans un nouveau et on insère directement la nouvelle tâche
    const newTasks = [...tasks, newTask];

    //! J'envoie la nouvelle tache dans l' API
    axios.post(`http://localhost/React/todolist/back/public/taches`, newTask)
      .then(res => {
        console.log(res);
        console.log(res.data);
        console.log(newTask);
      });

    this.setState({
      tasks: newTasks,
      // on vide le champs texte à chaque ajout de tâche
      taskValue: '',
    });
  };

  changeTaskDone = (taskId) => {
    const { tasks } = this.state;

    const newTasks = tasks.map((task) => {
      if (task.id === taskId) {
        task.done = !task.done;
        //! Modification dans la BDD :D
        axios.put(`http://localhost/React/todolist/back/public/taches/${taskId}`, task)
          .then(res => {
            console.log(res);
          });
      }
      return task;
    });

    this.setState({ tasks: newTasks });
  };

  // Permet de supprimer la liste de tache
  deleteTask = () => {
    const { tasks } = this.state;
    const emptyTask = tasks.splice(0, 0);
    // console.log(emptyTask);

    axios.delete(`http://localhost/React/todolist/back/public/taches`)
    .then(res => {
      console.log(res);
    });

    this.setState({ tasks: emptyTask });
  };

  render() {
    const { tasks, taskValue } = this.state;

    // const undoneTasks = tasksData.filter((task) => !task.done).length;
    let undoneTasks = tasks.filter((task) => !task.done);

    // Nombre de taches pas finis
    undoneTasks = undoneTasks.length;

    return (
      <div className="main">
        <div className="todolist">
          <Title />
          <Counter count={undoneTasks} />
          <Form
            taskValue={taskValue}
            onChangeTaskValue={this.setTaskValue}
            onSubmitForm={this.addTask}
          />
          <Tasks
            tasks={tasks}
            onChangeTaskDone={this.changeTaskDone}
          />
          <Delete
            onsubmitClick={this.deleteTask}
          />
        </div>
      </div>
    );
  }
}

export default Todolist;
