import * as React from 'react';
import { Task } from '../../interface/Task';
import FormTask from '../FormTask';

interface IAddTaskProps {
  store:any;
}

const AddTask: React.FunctionComponent<IAddTaskProps> = (props) => {
  const handleSubmit = (task: Task)=>{
    props.store.addTask(task)
  }
  return (<div>
     <h1 style={{textAlign: 'center'}}>New Task</h1>
    <FormTask type="add" handleSubmit={handleSubmit} />
  </div>
  )
};

export default React.memo(AddTask);
