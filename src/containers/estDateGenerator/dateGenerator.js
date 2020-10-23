import React from 'react';
import moment from 'moment-business-days';

const DateGenerator = (props) => {
  const nOfDevs = +props.nOfDevs;
  // console.log('[Inside, Dev Num]', nOfDevs);
  let currentDevs = [...Array(nOfDevs)].map((dev, i) => {
    return {
      assigned: 0,
      daysLeft: 0,
    };
  });
  // console.log('[inside current devs]', currentDevs);
  let currentLists = props.taskLists;

  //Split the Lists into sequential and parallel

  let assignableTasks = [];
  let currentDay = 0;
  let AllTasks = [];

  //take the available List and take out the available tasks

  //should make a check that the depenedcy is not currently being ran by any developer.
  const checkTaskDependencies = (task) => {
    if (
      AllTasks.filter((todo) => {
        return todo.title === task.seqData;
      }).length === 0 &&
      assignableTasks.filter((todo) => {
        return todo.title === task.seqData;
      }).length === 0
    ) {
      return true;
    }
    return false;
  };

  const checkAvailableTask = (task) => {
    if (task !== undefined) {
      if (task.sequential === 0) {
        return true;
      } else {
        return checkTaskDependencies(task);
      }
    }
  };

  const fetchAvailableTasks = () => {
    const Tasks = AllTasks.map((Task) => {
      if (Task) {
        if (checkAvailableTask(Task)) {
          return Task;
          // eslint-disable-next-line
        } else return;
      } else {
        // eslint-disable-next-line
        return;
      }
    });
    assignableTasks = assignableTasks.concat(Tasks);
  };

  const removeOldTasks = () => {
    assignableTasks = assignableTasks.filter((task) => {
      return task !== undefined;
    });

    //Remove assignable tasks from AllTasks
    let c = AllTasks.filter(function (objFromA) {
      return !assignableTasks.find(function (objFromB) {
        return objFromA.title === objFromB.title;
      });
    });
    // console.log('[Removed list]', c);
    AllTasks = c;
  };
  // devs and assigning

  // This function should be more intellegent on picking the best tasks for progression.
  const fetchNewTask = () => {
    return assignableTasks.shift();
  };

  const progressDay = () => {
    // console.log('[Progress day]');
    const newDevs = currentDevs.map((dev, i) => {
      if (dev.assigned === 1) {
        //Assigned
        if (dev.daysLeft < 2) {
          //finished task
          return {
            assigned: 0,
            daysLeft: 0,
          };
        } else {
          // keep assigned, minus one day
          return {
            assigned: 1,
            daysLeft: dev.daysLeft - 1,
          };
        }
      } else {
        //Not assigned
        return {
          assigned: 0,
          daysLeft: 0,
        };
      }
    });
    currentDevs = newDevs;
  };

  const collectTasks = () => {
    const currentMergedTasks = [];
    // eslint-disable-next-line
    currentLists.map((List) => {
      // eslint-disable-next-line
      List.todos.map((Task) => {
        currentMergedTasks.push(Task);
      });
    });
    AllTasks = currentMergedTasks;
  };

  collectTasks();

  const checkDevsFinished = () => {
    let result = [];
    // eslint-disable-next-line
    const test = currentDevs.map((dev) => {
      if (dev.assigned) {
        result.push(false);
      } else {
        result.push(true);
      }
    });
    const finalResult = new Set(result);
    // console.log(finalResult);
    if (finalResult.has(false)) {
      return false;
    } else {
      return true;
    }
  };

  const stillTasks = () => {
    // console.log(assignableTasks.length);
    // console.log(AllTasks.length);
    if (
      assignableTasks.length === 0 &&
      AllTasks.length === 0 &&
      checkDevsFinished()
    ) {
      return false;
    }
    return true;
  };

  // It is assigning available devs to currentDevs which wont work as one
  // the first day any are unavailable the list will deiminish to one then none.
  const assignDev = () => {
    let newDevs = currentDevs.map((dev) => {
      if (dev.assigned === 0) {
        let task = fetchNewTask();
        if (task) {
          return {
            assigned: 1,
            daysLeft: task.time,
            data: task.title,
          };
        } else {
          return {
            ...dev,
          };
        }
      } else {
        return {
          ...dev,
        };
      }
    });
    currentDevs = newDevs;
    // console.log('[CurrentDevs]', currentDevs);
  };

  while (stillTasks()) {
    fetchAvailableTasks(); //Check which tasks are made available
    removeOldTasks();
    console.log('[Assignable Tasks]', assignableTasks);
    console.log('[AllTasks]', AllTasks);
    console.log('[Current day]', currentDay);
    assignDev();
    progressDay();
    // console.log();
    currentDay++;
  }

  //So far the fetchAvailableTasks and removeOldTasks now work 100%
  //It will take ones that dont ahve any dependencies left, and will remove from old list, add to new
  //stillTasks works correctly in the while loop

  let finishTime = moment(props.startDate).businessAdd(currentDay + 1)._d;

  finishTime = moment(finishTime).format('LL');

  return (
    <div className="App">
      <h1>The developers would need <span data-testid={'currentDay'} >{currentDay + 1}</span> days</h1>
      <h2>This project has  {props.nOfDevs}  dedicated developers</h2>
      <h3>Finish date: <span data-testid={'finishTime'} >{finishTime}</span></h3>
    </div>
  );
};

export default DateGenerator;


// Add the button for auto refresh
// edit devs
// show devs

// show which todos are dependednt
