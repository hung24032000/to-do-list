import Button from '@mui/material/Button';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import { makeStyles } from '@mui/styles';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import React from 'react';
import './App.css';
import AddTask from './components/AddTask';
import { ListTask } from './components/ListTask';
export interface Task {
  id: string,
  title: string,
  description: string,
  dueDate: Date,
  priority: string

}

const useStyles = makeStyles({
  wrapper: {
    maxWidth: 800,
    minWidth: 800,
    margin: '20px auto',
    height: '95vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    border: '1px solid #000',
    position: 'relative',
  },
  navbar: {
    '& .MuiTabs-flexContainer': {
      display: 'flex',
      justifyContent: 'center'
    }
  },
  bulkAction: {
    background: 'gray',
    border: '1px solid black',
    borderBottom: 'unset',
    padding: '20px 0px',
    width: '100%',
    display: 'flex',
    position: 'absolute',
    justifyContent: 'space-between',
    alignContent: 'center',
    bottom: '0px',
    '& .textBulkAction': {
      lineHeight: '36px'
    }
  },
  btn: {
    '&.MuiButton-root': {
      marginLeft: 10,
      marginRight: 10,
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

export default function App() {

  const [listTask, setListTask] = React.useState<Task[]>([]);
  const [listTaskChecked, setListTaskChecked] = React.useState<String[]>([]);
  const [tabValue, setTabValue] = React.useState(0);
  const sortMillisecond = (data: Task[]) => {
    return data.sort((a: Task, b: Task) => {
      let aTask: number = new Date(a.dueDate).getTime()
      let bTask: number = new Date(b.dueDate).getTime()
      return aTask - bTask
    })
  }
  const storeLocalStorage = React.useCallback(() => {
    let storeLocalStorage = localStorage.getItem('store') || '[]';
    let store = JSON.parse(storeLocalStorage);
    let save = (storeNew: Task[]) => {
      let arraySort = sortMillisecond(storeNew);
      //saveToLocal
      let storeSave = JSON.stringify(arraySort)
      localStorage.setItem('store', storeSave);
      //setListArray
      setListTask(arraySort)
    }
    return {
      getAllTask: () => {
        return store
      },
      addTask: (task: Task) => {
        let taskList = [...store]
        taskList.push(task)
        save(taskList)
      },
      updateTask: (task: Task) => {
        let taskList = [...store]
        let findIndex = taskList.findIndex((taskFind: Task) => {
          return taskFind.id === task.id
        });
        taskList[findIndex] = task;
        save(taskList)
      },
      getByTask: (taskId: string) => {
        let task = store.filter((task: Task) => {
          return task.id === taskId
        })
        return task
      },
      removeTask: (taskId: string) => {
        const storeNew = store.filter((taskFind: Task) => {
          return taskFind.id !== taskId
        })
        save(storeNew)
      },
      removeTasks: (listTaskChecked:any) => {
        let storeNew = store.filter((taskFind: Task) => {
         return !listTaskChecked.includes(taskFind.id)
        })
        save(storeNew)
      },
      findTask: (titleTask: string) => {
        let task = store.filter((task: Task) => {
          return task.title.toLowerCase().search(titleTask.toLowerCase()) !== -1
        })
        let result = sortMillisecond(task)
        return result
      }
    }
  }, [])
  let store = storeLocalStorage();

  React.useEffect(() => {
    let storeLocalStorage = store.getAllTask();
    setListTask(storeLocalStorage)
  }, [])
  React.useEffect(() => {
    setListTaskChecked([])
  }, [tabValue])

  const handleChangeTab = (event: any, newValue: any) => {
    setTabValue(newValue);

  };

  const renderTab = () => {
    switch (tabValue) {
      case 1:
        return <AddTask store={store} />
      default:
        return <ListTask
          listTask={listTask}
          store={store}
          setListTask={setListTask}
          setListTaskChecked={setListTaskChecked}
          listTaskChecked={listTaskChecked}
        />
    }
  }
  const classes = useStyles();

  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <div className={classes.wrapper}>
        <Tabs value={tabValue} onChange={handleChangeTab} className={classes.navbar}>
          <LinkTab label="To Do List" />
          <LinkTab label="New Task" />
        </Tabs>
        <div>
          {renderTab()}
        </div>
        {
          listTaskChecked.length!==0 ?
          <div className={classes.bulkAction}>
            <div className='textBulkAction'>
              Bulk Action
            </div>
            <div>
              <Button variant="contained" color="success" className={classes.btn} onClick={() => {
              }}>
                Done
              </Button>
              <Button variant="outlined" color="error" onClick={() => { 
                  store.removeTasks(listTaskChecked)
                  setListTaskChecked([])
                  // setListTask(store.getAllTask())

              }} className={classes.btn}>
                Remove
              </Button>
            </div>
          </div>: ''
        }
      </div>
    </LocalizationProvider>
  );
}

function LinkTab(props: any) {
  return (
    <Tab
      component="a"
      onClick={(event) => {
        event.preventDefault();
      }}
      {...props}
    />
  );
}
