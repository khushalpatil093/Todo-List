import { useState } from "react"
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const Form = () => {

    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [task, setTask] = useState([]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if((title || desc) != ""){
            setTask([...task, {title, desc}]);
            setTitle("");
            setDesc("");
        } else {
            alert("Please fill all the fields");
        }
    
    }

    const deleteHandler = (i) => {
        let taskCopy = [...task];
        taskCopy.splice(i,1);
        setTask(taskCopy);
        toast.success('Task deleted successfully', {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: false,
            draggable: true,
            theme: 'dark',
        });
    }

    let renderTask = <h3 className="NoTask">Task Not Available</h3>

    if(task.length != 0){
        renderTask = task.map((item, index) => {
            return (
                <li className="Task">
                    <h3>{item.title}</h3>
                    <p>{item.desc}</p>
                    <button
                        onClick={() => {deleteHandler(index)}}
                    >Delete</button>
                </li>
            )
        })
    }

    return (
        <div className="Form">
            <form onSubmit={handleSubmit}>
                <input type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Type Your Title Here"
                 />
                <input type="text"
                    value={desc}
                    onChange={(e) => setDesc(e.target.value)}
                    placeholder="Type Description Here"
                />
                <button type="submit">Create</button>
            </form>
            <ToastContainer/>
            
            <div>
                <ul>
                    {
                        renderTask
                    }
                </ul>
            </div>
        </div>
    )
}

export default Form