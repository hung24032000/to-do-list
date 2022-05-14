import { Button, Grid, TextField } from '@mui/material';
import OutlinedInput from '@mui/material/OutlinedInput';
import * as React from 'react';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import moment from 'moment';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { makeStyles } from '@mui/styles';
import { Task } from '../../interface/Task';

import nextId from "react-id-generator";
export interface IFormTaskpProps {
  type:string,
  task?:Task,
  handleSubmit:(task:Task) => void,
}

const useStyles = makeStyles({
  wrapper: {
    // background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    // border: 0,
    // borderRadius: 3,
    // boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    // color: 'white',
    height: 48,
    padding: '0 30px',
    maxWidth:500,
    minWidth:500,

    margin: '0px auto'
  },
  textareaAutosize:{
    padding:0,
    minWidth: '498px',
    maxWidth: '498px',
    minHeight: '200px',
    maxHeight: '220px',
  },
  grid:{
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom:20
  }
});

export default function FormTask(props: IFormTaskpProps) {
  const [title, setTitle] = React.useState('');
  const [priority, setPriority] = React.useState('low');
  const [description, setDescription] = React.useState<string>('');
  const [dueDate, setDueDate] = React.useState<any>(moment(new Date().getDate(), 'DD/MM/YYYY'));
  const [today, setToday] = React.useState(moment(new Date().getDate(), 'DD/MM/YYYY'));

  const handleChangeDescription = (event: any) => {
    setDescription(event.target.value);
  };
  const handleChangePriority = (event: any) => {
    setPriority(event.target.value);
  };
  const handleChangeValueTime = (newValue: any) => {
    setDueDate(newValue);
    
  };
  const handleChangeTitle= (event: any) => {
    setTitle(event.target.value);
  };
  const handleSubmit= () => {
    let idRandom = nextId();
    let task  = {
      title:title,
      priority:priority,
      description:description,
      dueDate:dueDate,
      id: props.type==='add' ?  idRandom : props.task?.id
    }
    props.handleSubmit(task)
  };

  React.useEffect(()=>{
    if(props.type==='add') return 
    if(props.type==='detail') {
      setTitle(props.task?.title || '')
      setPriority(props.task?.priority ||'low')
      setDescription(props.task?.description || '')
      setDueDate(props.task?.dueDate)
    }
  },[])
  const classes = useStyles();
  return (
    <div className={classes.wrapper} style={{paddingTop : props.type ==='detail' ? 20 : 0}}>
      <Grid container>
        <Grid xs={12}>
          {/* low, normal and high. */}
          <FormControl variant="standard" fullWidth={true}>
            <OutlinedInput onChange={handleChangeTitle} value={title} placeholder='Enter the title'/>
          </FormControl>
        </Grid>
        <FormControl variant="standard">
          <h5 style={{ textAlign: 'left' }}>Description</h5>
          <TextareaAutosize id="description"  className={classes.textareaAutosize} onChange={handleChangeDescription} value={description}/>

        </FormControl>
        <Grid xs={12} className={classes.grid}>
          <FormControl>
          <h5 style={{ textAlign: 'left' }}>Due Date</h5>
            <DatePicker
              inputFormat="DD/MM/YYYY"
              value={dueDate}
              onChange={(newValue) => {
                handleChangeValueTime(newValue)
              }}
              minDate={today}
              renderInput={(params) => <TextField {...params} />}
            />
          </FormControl>
          <FormControl>
              <h5 style={{ textAlign: 'left' }}>Priority</h5>
            <Select
              id="priority"
              value={priority}
              onChange={handleChangePriority}
              style={{
                width:'200px'
              }}
            >
              <MenuItem value='low'>low</MenuItem>
              <MenuItem value='normal'>normal</MenuItem>
              <MenuItem value='high'>high</MenuItem>
            </Select>
          </FormControl>

        </Grid>
        <Grid xs={12}>
        <Button variant="contained" color="success" fullWidth onClick={handleSubmit}>
            { props.type ==='add' ? 'Add' : props.type ==='detail' ?  'update' : '' }
        </Button>
        </Grid>
      </Grid>
    </div>
  );
}
