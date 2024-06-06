# Redux Toolkit (RTK) for State Management in React

Redux Toolkit (RTK) is a library for managing complex state management in React applications. Here are some key features and use cases:

## Key Features

- **Boilerplate Reduction:** RTK reduces the amount of boilerplate code needed.
- **Simplified Store Configuration:** It simplifies store setup and configuration.
- **Reducers with `createSlice` Function:** It provides a straightforward way to create reducers.
- **Immutability:** RTK uses the Immer library to handle immutable updates more conveniently.
- **Redux DevTools Integration:** It seamlessly integrates with Redux DevTools for better state debugging.

## Project Folder Structure (Todo App)

### Components

- **Todo Component:** Manages the list of tasks and interactions.
- **EditModal Component:** Provides a UI for updating tasks.

### Store Configuration

- **Store Folder:** Contains the Redux logic.
- **todoSlice.jsx:** Manages the tasks state.

## Code Implementation

### Todo Component

```javascript
import React, { useState } from "react";
import EditModal from "./EditModal";
import { useDispatch, useSelector } from 'react-redux';
import { addTask, clearAll, deleteTask } from '../store/todoSlice.jsx';

const Todo = () => {
  const dispatch = useDispatch();
  const selector = useSelector((state) => state.tasks);

  const [showEditModal, setShowEditModal] = useState(false);
  const [updateIndex, setUpdateIndex] = useState(null);
  const [task, setTask] = useState('');

  const closeEdit = () => setShowEditModal(false);

  const handleClick = (e) => {
    if (e.target.classList.contains('fa-trash')) {
      dispatch(deleteTask(Number(e.target.dataset.index)));
    }
    if (e.target.classList.contains('fa-pen-to-square')) {
      setUpdateIndex(Number(e.target.dataset.index));
      setShowEditModal(true);
    }
  };

  return (
    <>
      <div className="text-black-200 font-serif">
        <p className="text-4xl text-center font-black mb-5 text-indigo-600">
          To do List
        </p>

        <div className="flex justify-between align-center w-[90vw] h-[5vh] lg:w-[65vw] mx-auto lg:h-[10vh]">
          <input
            type="text"
            className="w-[60vw] text-xl lg:w-[45vw] lg:text-2xl bg-indigo-300 text-indigo-700 px-2 rounded-md focus:outline-none"
            placeholder="Add a Task Here"
            value={task}
            onChange={(e) => setTask(e.target.value)}
          />
          <button
            className="w-[25vw] lg:w-[15vw] text-xl btn lg:text-2xl transition duration-150 ease-in-out btn rounded-md font-black pt-1 bg-indigo-500 text-white hover:bg-indigo-400"
            onClick={() => {
              if (task !== "") {
                dispatch(addTask({ task: task, status: false }));
                setTask('');
              }
            }}
          >
            Add +
          </button>
        </div>

        <ul className="w-[90vw] lg:w-[65vw] mx-auto mt-5 lg:mt-8 px-2" onClick={handleClick}>
          {selector.length === 0 ? (
            <li className="min-h-[10vh] rounded-md text-capitalize text-2xl lg:text-3xl pt-5 pb-10 md:pb-4 md:pt-6 lg:pt-4 px-4 text-indigo-700 mb-2 text-center uppercase">
              Plz Add Some task ....
            </li>
          ) : (
            selector.map((task, index) => (
              <li key={index} className="min-h-[10vh] bg-indigo-300 rounded-md text-2xl lg:text-3xl pt-5 pb-10 md:pb-4 md:pt-6 lg:pt-4 px-4 text-indigo-700 mb-2 capitalize">
                <span>
                  {index + 1}.
                  {task.status ? (
                    <i className="fa-solid fa-check text-green-500 absolute text-5xl"></i>
                  ) : (
                    <i className="fa-solid fa-times text-red-500 absolute text-5xl"></i>
                  )}
                </span>
                {task.task}
                <i className="fa-solid fa-trash float-end text-red-500 hover:text-red-400 cursor-pointer" data-index={index}></i>
                <i className="fa-solid fa-pen-to-square float-end me-5 lg:me-3 text-indigo-700 hover:text-indigo-500 cursor-pointer" data-index={index}></i>
              </li>
            ))
          )}
        </ul>

        {selector.length > 0 && (
          <div className="flex justify-center items-center py-3">
            <button className="w-[25vw] lg:w-[15vw] text-xl btn lg:text-2xl transition duration-150 ease-in-out btn rounded-md font-black pt-1 bg-indigo-500 text-white hover:bg-indigo-400" onClick={() => dispatch(clearAll())}>
              Clear All
            </button>
          </div>
        )}
      </div>

      {showEditModal && <EditModal selector={selector} updateIndex={updateIndex} closeEdit={closeEdit} />}
    </>
  );
};

export default Todo;



### Todo Component

```javascript
import React, { useState } from "react";
import EditModal from "./EditModal";
import { useDispatch, useSelector } from 'react-redux';
import { addTask, clearAll, deleteTask } from '../store/todoSlice.jsx';

const Todo = () => {
  const dispatch = useDispatch();
  const selector = useSelector((state) => state.tasks);

  const [showEditModal, setShowEditModal] = useState(false);
  const [updateIndex, setUpdateIndex] = useState(null);
  const [task, setTask] = useState('');

  const closeEdit = () => setShowEditModal(false);

  const handleClick = (e) => {
    if (e.target.classList.contains('fa-trash')) {
      dispatch(deleteTask(Number(e.target.dataset.index)));
    }
    if (e.target.classList.contains('fa-pen-to-square')) {
      setUpdateIndex(Number(e.target.dataset.index));
      setShowEditModal(true);
    }
  };

  return (
    <>
      <div className="text-black-200 font-serif">
        <p className="text-4xl text-center font-black mb-5 text-indigo-600">
          To do List
        </p>

        <div className="flex justify-between align-center w-[90vw] h-[5vh] lg:w-[65vw] mx-auto lg:h-[10vh]">
          <input
            type="text"
            className="w-[60vw] text-xl lg:w-[45vw] lg:text-2xl bg-indigo-300 text-indigo-700 px-2 rounded-md focus:outline-none"
            placeholder="Add a Task Here"
            value={task}
            onChange={(e) => setTask(e.target.value)}
          />
          <button
            className="w-[25vw] lg:w-[15vw] text-xl btn lg:text-2xl transition duration-150 ease-in-out btn rounded-md font-black pt-1 bg-indigo-500 text-white hover:bg-indigo-400"
            onClick={() => {
              if (task !== "") {
                dispatch(addTask({ task: task, status: false }));
                setTask('');
              }
            }}
          >
            Add +
          </button>
        </div>

        <ul className="w-[90vw] lg:w-[65vw] mx-auto mt-5 lg:mt-8 px-2" onClick={handleClick}>
          {selector.length === 0 ? (
            <li className="min-h-[10vh] rounded-md text-capitalize text-2xl lg:text-3xl pt-5 pb-10 md:pb-4 md:pt-6 lg:pt-4 px-4 text-indigo-700 mb-2 text-center uppercase">
              Plz Add Some task ....
            </li>
          ) : (
            selector.map((task, index) => (
              <li key={index} className="min-h-[10vh] bg-indigo-300 rounded-md text-2xl lg:text-3xl pt-5 pb-10 md:pb-4 md:pt-6 lg:pt-4 px-4 text-indigo-700 mb-2 capitalize">
                <span>
                  {index + 1}.
                  {task.status ? (
                    <i className="fa-solid fa-check text-green-500 absolute text-5xl"></i>
                  ) : (
                    <i className="fa-solid fa-times text-red-500 absolute text-5xl"></i>
                  )}
                </span>
                {task.task}
                <i className="fa-solid fa-trash float-end text-red-500 hover:text-red-400 cursor-pointer" data-index={index}></i>
                <i className="fa-solid fa-pen-to-square float-end me-5 lg:me-3 text-indigo-700 hover:text-indigo-500 cursor-pointer" data-index={index}></i>
              </li>
            ))
          )}
        </ul>

        {selector.length > 0 && (
          <div className="flex justify-center items-center py-3">
            <button className="w-[25vw] lg:w-[15vw] text-xl btn lg:text-2xl transition duration-150 ease-in-out btn rounded-md font-black pt-1 bg-indigo-500 text-white hover:bg-indigo-400" onClick={() => dispatch(clearAll())}>
              Clear All
            </button>
          </div>
        )}
      </div>

      {showEditModal && <EditModal selector={selector} updateIndex={updateIndex} closeEdit={closeEdit} />}
    </>
  );
};

export default Todo;




