import React  from "react"
import ToDo from "./ToDo"

const ToDoList = ({tasks, match,onToggleCompleted}) => {
            let filteredTasks;
            switch (match.params.filter) {
               case 'completed':
                        filteredTasks = tasks.filter(task => task.completed)
                   break;
           
               default:
                         filteredTasks = tasks
                   break;
            }
            console.log(filteredTasks)

            return  (
                   <>
                        <h1 className="m-3">Liste de tâches</h1>
                        <ul className="list-group m-3">
                          {
                             filteredTasks.length !==0 
                             ? filteredTasks.map((task) => <ToDo task={task} key={task.id} onToggleCompleted={onToggleCompleted} />)
                             : <li> Aucune tâche à afficher</li>
                          }  
                        </ul>
                    </>
            )
}

export default ToDoList