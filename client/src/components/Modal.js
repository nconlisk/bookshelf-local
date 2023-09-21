import { useState } from "react"
import { useCookies } from "react-cookie"

const Modal = ({mode, setShowModal, getData, task}) => {

    const [cookies, setCookie, removeCookie] = useCookies(null)
    
    //const mode = 'create'   //dont need this anymore as create mode is passed in from ListHeader.js.
    const editMode = mode === 'edit' ? true : false

    const [data, setData] = useState({
        user_email: editMode ? task.user_email : cookies.Email, //null, //hard coded user for testing
        title: editMode ? task.title : "",
        progress: editMode ? task.progress : 50,
        date: editMode ? task.date : new Date()
    })

    
    const postData = async (e) => {
        e.preventDefault()  //to prevent modal from closing on clicking submit, so we can see response.
        try {
            const response = await fetch(`${process.env.REACT_APP_SERVERURL}/todos`, {
                method:"POST",
                headers: {'Content-Type':'application/json'},
                body: JSON.stringify(data)
            })
            if (response.status === 200){
                console.log("WORKED")
                //console.log(data)
                setShowModal(false)
                getData()
            }
        }catch (err) {
            console.log(err)
            
        }
    }


    const editData = async (e) => {
        e.preventDefault()  //to prevent modal from closing on clicking submit, so we can see response.
        try {
            const response = await fetch(`${process.env.REACT_APP_SERVERURL}/todos/${task.id}`, {
                method:"PUT",
                headers: {'Content-Type':'application/json'},
                body: JSON.stringify(data)
            })
            if (response.status === 200){
                setShowModal(false)
                //console.log(data)
                getData()
            }
        }catch (err) {
            console.log(err)            
        }
    }




    const handleChange = (e) => {
        //console.log('changing', e)
        const {name, value } = e.target
        
        setData(data => ({
            ...data,
            [name] : value
        }))

        console.log(data)   //to see the changes in data using developer tools.

    }

    return (
      <div className="overlay">
        <div className="modal">
            <div className="form-title-container">
                <h3>Let's {mode} your task</h3>
                <button onClick={()=> setShowModal(false)}>X</button>
            </div>
            <form >
                <input
                    required
                    maxLength={30}
                    placeholder=" Your task goes here"
                    name="title"
                    value={data.title}
                    onChange={handleChange}
                />
                <br/>
                <label for='range'>Drag slider to select task progress</label>
                <input 
                    required
                    type="range"
                    id="range"
                    min="0"
                    max="100"
                    name="progress"
                    value={data.progress}
                    onChange={handleChange}
                />
                <input className={mode} type="submit" onClick={editMode ? editData : postData}/>
            </form>
            </div>
      </div>
    );
  }
  
  export default Modal;