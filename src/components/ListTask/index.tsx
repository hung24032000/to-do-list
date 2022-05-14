import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import { makeStyles } from '@mui/styles';
import * as React from 'react';
import { Task } from '../../interface/Task';
import { ItemListTask } from './ItemListTask';

export interface IListTaskProps {
    listTask:Task[];
    store:any;
    setListTask:any;
    setListTaskChecked:any;
    listTaskChecked:String[]
}
const useStyles = makeStyles({
    wrapper: {
        height:'85vh',overflow: 'hidden',
        width:'560px'
    },
    wrapperList: {
        marginTop:20,
        height:'75vh',overflow: 'hidden',overflowY:'auto',
        '&#listTaskScroll::-webkit-scrollbar':{
            display: 'none'
        }
    },
  });
export function ListTask (props: IListTaskProps) {
    const classes = useStyles();
    const [notFound,setNotFound]= React.useState(false);
    const [titleFind,setTitleFind]= React.useState('');
    
    const [taskActive,setTaskActive]= React.useState<Task>({
        id:'',
        title:'',
        dueDate:new Date(),
        description:'',
        priority:'low'
    });
    const onDetailClick=(task:Task) => {
        setTaskActive(task)
    }
  return (
    <div className={classes.wrapper}>
        <h1 style={{textAlign: 'center'}}>To Do List</h1>
        <FormControl variant="standard" fullWidth={true}>
        <OutlinedInput onChange={(e:any)=>{
            setTitleFind(e.target.value)
            let result = props.store.findTask(e.target.value)
            if(result.length === 0){
                setNotFound(true)
            }else{
                setNotFound(false)
            }
            props.setListTask(result)
        }} value={titleFind} placeholder='Search....'/>
        </FormControl>

        {notFound ? 
            (<div style={{marginTop:20}}>
                Not Found
            </div>)
            : ''
        }
        <div className={classes.wrapperList} id='listTaskScroll'>
            {props.listTask.map((task: Task,index: number) => {
                return (<ItemListTask 
                task={task} 
                key={index} 
                onDetailClick={onDetailClick} 
                taskActive={taskActive} 
                setTaskActive={setTaskActive} 
                store={props.store}   
                setListTaskChecked={props.setListTaskChecked}
                listTaskChecked={props.listTaskChecked}/>)
            })}
        </div>
    </div>
  );
}
