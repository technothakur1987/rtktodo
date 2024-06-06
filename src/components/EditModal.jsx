import React, {useEffect, useState} from 'react'
import { useDispatch } from 'react-redux';
import { updateTask} from '../store/todoSlice.jsx';

const EditModal = ({closeEdit, selector, updateIndex}) => {
  const dispatch = useDispatch()
  const [task, setTask] = useState('');
  const [status, setStatus] = useState(false);
 

  useEffect(() => {
    const filteredTask = selector.filter((task, index) => index === updateIndex);
    if (filteredTask.length > 0) {
      setTask(filteredTask[0].task);
      setStatus(filteredTask[0].status);
    }
  }, [selector, updateIndex]);

  const handleUpdate = () => {
    dispatch(updateTask({task:task, status:status, updateIndex:updateIndex}))
    closeEdit()
    
  };


  return (
    <div className='bg-[rgb(0,0,0,0.3)]  absolute   top-[0vh] w-[100vw] start-0 h-screen '>
      <i className="fa-brands fa-x-twitter float-end text-indigo-700 hover:text-indigo-500 cursor-pointer absolute text-6xl end-0 z-[100]" onClick={()=>{closeEdit()}}></i>
    <div className='bg-transparent h-screen w-[100vw] flex justify-center items-center   overflow-x-hidden'>
    
     <div className="editTask bg-indigo-100 flex flex-col h-[90vh] w-[80vw] justify-center items-center  rounded">
        <textarea
          type="text"
          className="  text-xl  w-5/6 sm:w-[50vw]  h-[10vh] sm:h-[15vh] mb-5 lg:text-2xl bg-indigo-300 text-indigo-700 px-2 rounded-md focus:outline-none  hover:outline-none  active:outline-none placeholder:text-indigo-700"
          placeholder="Update Task here"
          value={task}
            onChange={(e) => setTask(e.target.value)}
        />
        <div className='flex flex-col items-center justify-center w-5/6 sm:w-[50vw] min-h-[10vh]  mb-5 text-xl lg:text-2xl text-indigo-700 '>
                <label htmlFor="status" className='mb-3 font-black text-xl lg:text-3xl'>Status</label>
        <select name="status" id="status" className='focus:outline-none  hover:outline-none  active:outline-none rounded p-2 bg-indigo-300 cursor-pointer ' value={status}
              onChange={(e) => setStatus(e.target.value )}>
          <option value='true'>Completed</option>
          <option value='false'>UnCompleted</option>
        </select>
        </div>
        
        <div className='flex justify-center items-center w-5/6 sm:w-[50vw]'>
        <button className="w-5/6  py-[1rem] sm:py-[0.5rem] lg:w-[15vw] text-xl lg:text-2xl  mt-5 transition duration-150 ease-in-out btn rounded-md font-black bg-indigo-500 text-white hover:bg-indigo-400 " onClick={handleUpdate}>
          Update Task
        </button>

        </div>
       
      </div>
    </div>


    </div>
  )
}

export default EditModal