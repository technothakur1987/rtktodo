import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    tasks: JSON.parse(localStorage.getItem('rtktasks'))||[]
};

const todoSlice = createSlice({
    name: 'todoSlice',
    initialState,
    reducers: {
        addTask: (state, action) => {
            state.tasks.push(action.payload)
            let tasks = JSON.parse(localStorage.getItem('rtktasks'))||[]
            if( tasks.length > 0 ){
                localStorage.removeItem('rtktasks')
                localStorage.setItem('rtktasks', JSON.stringify(state.tasks))
            }else
            {
                localStorage.setItem('rtktasks', JSON.stringify(state.tasks))
            }
             



        },
        deleteTask: (state, action) => {
            
            

            state.tasks = state.tasks.filter((task, index)=>{
                return index !== action.payload
            })

            let tasks = JSON.parse(localStorage.getItem('rtktasks'))||[]
            if( tasks.length > 0 ){
                localStorage.removeItem('rtktasks')
                localStorage.setItem('rtktasks', JSON.stringify(state.tasks))
            }else
            {
                localStorage.setItem('rtktasks', JSON.stringify(state.tasks))
            }
        },
        updateTask: (state, action) => {

            state.tasks[Number(action.payload.updateIndex)] = {task:action.payload.task, status:action.payload.status}
            let tasks = JSON.parse(localStorage.getItem('rtktasks'))||[]
            if( tasks.length > 0 ){
                localStorage.removeItem('rtktasks')
                localStorage.setItem('rtktasks', JSON.stringify(state.tasks))
            }else
            {
                localStorage.setItem('rtktasks', JSON.stringify(state.tasks))
            }
        },
        clearAll: (state, action) => {

            state.tasks = []
            localStorage.removeItem('rtktasks')
            localStorage.setItem('rtktasks', JSON.stringify(state.tasks))
        }
    }
});

export const { addTask, deleteTask, updateTask, clearAll } = todoSlice.actions;
export default todoSlice.reducer;
