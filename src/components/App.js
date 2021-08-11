import React from 'react';
import ToDoList from './ToDoList';
import NavBar from './NavBar';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import AddTask from './AddTask';
import initialData from '../initialData';
import uniqueid from 'uniqueid'
import Fetching from './Fetching';

class App extends React.Component{

    state = {
       tasks : [],
       fetching: true
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
        let id = uniqueid('jser',null)
        let newTask = {
            id: id(),
            name: newTaskName,
            completed: false
        }
       
        this.setState(prevState =>({
            tasks: [...prevState.tasks,newTask]
        }))
    }

    shouldComponentUpdate = () => {
        console.log('Bonjour shouldComponentUpdate')
        return true
    }

    componentDidMount = () => {
        console.log('Bonjour componentDidMount')
        let delay = Math.floor(Math.random() * 5000)
        setTimeout(()=>{
            this.setState({
                tasks : initialData,
                fetching: false
            })
        },delay)
    }

    onDeleteCompleted = () => {
        this.setState(prevState =>({
            tasks: prevState.tasks.filter((task)=> !task.completed)
        }))
    }


    render () {
       return (
        <section id="todo">
            { this.state.fetching ? <Fetching /> : null }
            <BrowserRouter>
                <Switch>
                    <Route path="/add-task" 
                           render={(props)=><AddTask {...props}  onAddTask={this.onAddTask} />}></Route>
                    <Route 
                        path="/:filter?" 
                        render={(props) => <ToDoList {...props} tasks={this.state.tasks} onToggleCompleted={this.onToggleCompleted} />}></Route>
                </Switch>
                <NavBar onDeleteCompleted={this.onDeleteCompleted} />
            </BrowserRouter>
        </section>
       )
    }
}

export default App