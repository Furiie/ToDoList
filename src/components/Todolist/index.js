import React from 'react';

import axios from 'axios';

import './styles.scss';

import Counter from 'src/components/Counter';
import Form from 'src/components/Form';
import Tasks from 'src/components/Tasks';
import Title from 'src/components/Title';

//import tasksData from 'src/data/tasks';

class Todolist extends React.Component {
  state = {
    tasks: [],
    taskValue: '',
  };

  componentDidMount() {
    axios.get(`http://localhost/Perso/backend-todolist/public/taches`)
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
      id: maxId + 1,
      label: taskValue,
      done: false,
    };

    // on vient déverser le contenu de tasks dans un nouveau et on insère directement la nouvelle tâche
    const newTasks = [...tasks, newTask];

    // en 2 temps
    // const newTasks = [...tasks];
    // newTasks.push(newTask);

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
      }

      return task;
    });

    this.setState({ tasks: newTasks });
  };

  render() {
    const { tasks, taskValue } = this.state;

    // const undoneTasks = tasksData.filter((task) => !task.done).length;
    let undoneTasks = tasks.filter((task) => !task.done);
    // on peut réassigner la valeur de undoneTask directement dans undoneTasks
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
        </div>
       
      </div>
    );
  }
}

export default Todolist;
