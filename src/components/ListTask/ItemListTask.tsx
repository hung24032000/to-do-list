import * as React from 'react';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import FormControlLabel from '@mui/material/FormControlLabel';
import { Task } from '../../interface/Task';
import { makeStyles } from '@mui/styles';
import FormTask from '../FormTask';
export interface IItemListTaskProps {
  task: Task,
  onDetailClick: (task: Task) => void,
  taskActive:Task;
  setTaskActive:any;
  store:any;
  setListTaskChecked:any;
  listTaskChecked:String[];
}

const useStyles = makeStyles({
  wrapper: {
    minWidth: 560,
    marginBottom:20
  },
  wrapperFormTask: {
    maxWidth:'560px',
    height:'550px',
    border: '1px solid black',
    borderTop:'unset'
  },
  wrapperBtn: {
    padding: 20,
    display: 'flex',
  },
  rowItem: {
    minWidth: 558,
    maxWidth: 558,
    display: 'flex',
    justifyContent: 'space-between',
    border: '1px solid black',
  },
  btn: {
    '&.MuiButton-root': {
      marginLeft: 10,
      minWidth: 120,
      width: 120,
      maxWidth: 120,
      color: 'white',
      opacity: 0.9
    },
    '&.MuiButton-outlinedError': {
      background: '#b34949',
    },
    '&.MuiButton-outlinedError:hover': {
      background: '#b34949',
      opacity: 1
    }
  }
});


export function ItemListTask(props: IItemListTaskProps) {
  const { onDetailClick, task,taskActive,setTaskActive,store,setListTaskChecked,listTaskChecked} = props;
  const [open,setOpen]= React.useState(false);
  const [checked,setChecked]= React.useState(false);
  const classes = useStyles();
  const handleSubmit= (taskNew:Task)=>{
    store.updateTask(taskNew)
    setOpen(!open);
  }
  React.useEffect(() => {
    setChecked(false)
  },[])
  React.useEffect(() => {
    if(listTaskChecked.length===0){
      setChecked(false)
    }
  },[listTaskChecked])

  return (
    <div className={classes.wrapper}>
      <div className={classes.rowItem}>
        <FormControlLabel control={<Checkbox 
          checked={checked}
          value={checked}
          onChange={(e)=>{         
            if(e.target.checked){
              setChecked(e.target.checked)
              let newArray= [...listTaskChecked,task.id]
              setListTaskChecked(newArray)
              
            }else if(!e.target.checked){
              let arrayUnchecked = [...listTaskChecked]
              arrayUnchecked = arrayUnchecked.filter((taskFindId) => {
                return taskFindId !== task.id
              })
              setListTaskChecked(arrayUnchecked)
              setChecked(false)
            }
          }} />
          } label={props.task.title} />
        <div className={classes.wrapperBtn}>
          <Button variant="contained" color="success" className={classes.btn} onClick={() => {
            setTaskActive(task)
            onDetailClick(task)
            setOpen(!open);
          }}>
            Detail
          </Button>
          <Button variant="outlined" color="error" className={classes.btn} disabled={open && taskActive.id === task.id} onClick={()=>{
            store.removeTask(task.id)
            setTaskActive({
              id:'',
              title:'',
              dueDate:new Date(),
              description:'',
              priority:'low'
            })
          }}>
            Remove
          </Button>
        </div>
      </div>
      {open && taskActive.id === task.id &&
      (<div className={classes.wrapperFormTask}>
        <FormTask task={task} handleSubmit={handleSubmit} type='detail'/>
      </div>)
      }
    </div>
  );
}
