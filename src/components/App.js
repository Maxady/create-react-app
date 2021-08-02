import React from 'react';
import ToDoList from './ToDoList';
import NavBar from './NavBar';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import AddTask from './AddTask';
import initialData from '../initialData';
import uniqueId from 'uniqueid';

class App extends React.Component{

    state = {
       tasks : initialData
    } 

    onToggleCompleted = (taskId) => {
        let taskToUpdate = this.state.tasks.find(task => task.id === taskId)
        taskToUpdate.completed = !taskToUpdate.completed

        this.setState(prevState =>{
            prevState.tasks.map(task => {
                return task.id === taskId ? taskToUpdate : task
            })
        })
    }

    onAddTask =  (newTaskName) => {
        let newTask = {
            id: uniqueId(),
            name: newTaskName,
            completed: false
        }
        console.log(newTask)
       
        this.setState(prevState =>({
            tasks: [...prevState.tasks,newTask]
        }))
    }

    render () {
       return (
        <section id="todo">
            <BrowserRouter>
                <Switch>
                    <Route path="/add-task" 
                           render={(props)=><AddTask {...props}  onAddTask={this.onAddTask}></AddTask>}></Route>
                    <Route 
                        path="/:filter?" 
                        render={(props) => <ToDoList {...props} tasks={initialData} onToggleCompleted={this.onToggleCompleted}></ToDoList>}></Route>
                </Switch>
                <NavBar />
            </BrowserRouter>
        </section>
       )
    }
}

export default App