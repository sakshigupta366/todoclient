import React, { useState,useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

function App() {
    const [todo, setTodo] = useState({});
    const [input, setInput] = useState('');
    const [details, setDetails] = useState([]);
    const [desc,setDesc]=useState('');
    const [isupdating, setIsupdating] = useState(false);
    useEffect(() =>{
        axios.get('http://localhost:4000/app/get').then(response => {
            console.log('get-data', response.data);
            setDetails([...response.data]);
            console.log('details', details);});
    }, [todo,isupdating,desc]);

    const onSubmit = (event) => {
        event.preventDefault();
        setIsupdating(prev=>!prev);
        const registered = {
            todo: input,
            desc:desc
        }        
        axios.post('http://localhost:4000/app/todo', registered).then(response =>
            console.log('create-data', response.data));        
           }

    const updateRecords = (event,item) => {
        event.preventDefault();
        setIsupdating((prev)=>!prev);
        const registered1 = {
            to_do: input,
            Desc:desc
        }
        setInput(item.todo);
        setDesc(item.desc);
        axios.put(`http://localhost:4000/app/update/${item._id}`, registered1).then(response =>
        console.log(response.data));       
        console.log("updated");
    }

    const deleteRecords = (event,id) => {
        event.preventDefault();   
        setIsupdating(prev=>!prev);     
        console.log('id',id);
        axios.delete(`http://localhost:4000/app/delete/${id}`).then(response =>
            console.log(response.data));
    }

    // const updateUser = (id) =>
    // {
    //     const newAge = prompt("enter new age:");
    //     axios.update('http://localhost:4000/app/update', registered).then(response =>
    //         console.log(response.data));
    // }


    return (<>
        <div className="container">
            <div className="form-div">
                <form >
                    <input type="text"
                        placeholder="enter your todo"
                        autoComplete="new-password"
                        onChange={(e)=>setInput(e.target.value)}
                        value={input}
                        className="mt-4 form-control form-group" />
                        {console.log('jsjsjjs',typeof details)}                        
                      <input type="text" className="mt-4 form-control form-group" placeholder="Description" value={desc} onChange={(e)=>{setDesc(e.target.value)}}/>
                      <br/>                     
                    <input type='submit' className='btn btn-danger btn-block' value='Add Todo List' onClick={onSubmit} />
                    
                    <ol>                 
                        {details.map((item) => {
                            return (<><li>{item.todo}&emsp;{item.desc}<input type='submit' className='m-4 btn btn-danger btn-block' value='update' onClick={(event)=>{updateRecords(event,item)}} />
                            <button className='btn btn-danger btn-block' onClick={(event)=>{deleteRecords(event,item._id)}}>delete</button></li></>)}
                        )
                        } 
                    </ol>   
                
                </form>
            </div>
        </div>
    </>
    );

}
export default App;