
import { useEffect, useRef, useState } from 'react';
import './NoteApp.css';
import { FaCirclePlus } from "react-icons/fa6";
import { IoCloseSharp } from "react-icons/io5";
import { CiEdit } from 'react-icons/ci';

function NoteApp() {

    const [showForm, setShowForm] = useState(false);
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [task, setTask] = useState([]);
    const [editTask, setEditTask] = useState(null);
    const inputRef = useRef(null)
    
    const edithandler = (index) =>{
        setEditTask(index);
        setTitle(task[index].title);
        setDesc(task[index].desc)
        setShowForm(true);
    }

    useEffect(()=>{
        if(showForm){
            inputRef.current.focus()
        }
    },[showForm]);

    const noteHandler = (e) => {
        e.preventDefault();

        if(!title || !desc)return;
        if(editTask !== null){
            let updatedTask = task.map((item, index) => index === editTask ? {title, desc} : item);
            setTask(updatedTask);
            setEditTask(null);
        } else {
            setTask([...task, {title, desc}])
        }
            setTitle("");
            setDesc("");
            setShowForm(false);
        }

        const closeBox = (index) =>{
            let closeMethod = task.filter((item, i) => i !== index);
            setTask(closeMethod);
        }



    return (
        <>
            <div className="note-app">
                <div className="box-container">
                    <div onClick={()=>{
                        if(!showForm){
                            setEditTask(null);
                            setTitle("");
                            setDesc("");
                        } setShowForm(prev => !prev) 
                    }}
                    className="box">
                        <i><FaCirclePlus /></i>
                        <h1>Add a new note</h1>
                    </div>
                     {
                task.map((item, index) => (
                    <div key={index} className="note-item">
                        <h1>{item.title}</h1>
                        <p>{item.desc}</p>
                        <div 
                        onClick={() => closeBox(index)}
                        className="closeIcon">
                            <i>< IoCloseSharp /></i>
                        </div>
                        <div onClick={()=> edithandler(index)} className='editIcon'>
                            <i> <CiEdit /> </i>
                        </div>
                    </div>
                ))}
                </div >


                {/* Popup Form */}
                <div className="note-popup" >
                {
                    showForm && (
                        <div className="popup">
                    <form action="" onSubmit={noteHandler}>
                        <input 
                        ref={inputRef}
                        value={title}
                        onChange={(e) => {
                            setTitle(e.target.value);}}
                        type="text" placeholder='Title' />
                        
                        <textarea
                        value={desc}
                        onChange={(e) => {
                        setDesc(e.target.value);}}
                        name="desc" placeholder='Write Note...' />
                        {/* <button type='submit' className='form-btn' >Add Note</button> */}
                        <button type='submit' className='form-btn' >
                            {editTask !== null? "Update Note": "Add Note"}
                        </button>
                    </form>
                </div>
            )}
            </div>


           
            </div>
        </>
    )
}
export default NoteApp;