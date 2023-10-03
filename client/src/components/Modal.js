import { useState } from "react"
import { useCookies } from "react-cookie"

const Modal = ({mode, setShowModal, getData, task}) => {

    const [cookies, setCookie, removeCookie] = useCookies(null)
    
    //const mode = 'create'   //dont need this anymore as create mode is passed in from ListHeader.js.
    const editMode = mode === 'edit' ? true : false

    const [data, setData] = useState({
        user_email: editMode ? task.user_email : cookies.Email, 
        title: editMode ? task.title : "",
        author: editMode ? task.author : "",
        year: editMode ? task.year : "",
        isbn: editMode ? task.isbn : "",
        thumbnail: editMode ? task.thumbnail : "",
        progress: editMode ? task.progress : 50,
        date: editMode ? task.date : new Date()
    })

    
    const postData = async (e) => {
        e.preventDefault()  //to prevent modal from closing on clicking submit, so we can see response.
        try {
            const response = await fetch(`${process.env.REACT_APP_SERVERURL}/books`, {
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
            const response = await fetch(`${process.env.REACT_APP_SERVERURL}/books/${task.id}`, {
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
                <h3>Let's {mode} a book entry</h3>
                <button onClick={()=> setShowModal(false)}>X</button>
            </div>
            <form >
                <input
                    required
                    maxLength={30}
                    placeholder=" Add book title here"
                    name="title"
                    value={data.title}
                    onChange={handleChange}
                />
                <br/>
                <input
                    required
                    maxLength={30}
                    placeholder=" Add author here"
                    name="author"
                    value={data.author}
                    onChange={handleChange}
                />
                <br/>
                <input
                    required
                    maxLength={30}
                    placeholder=" Add publication year here"
                    name="year"
                    value={data.year}
                    onChange={handleChange}
                />
                <br/>
                <input
                    required
                    maxLength={30}
                    placeholder=" Add book isbn here"
                    name="isbn"
                    value={data.isbn}
                    onChange={handleChange}
                />
                <br/>
                <input
                    required
                    placeholder=" Add URL to book cover art here"
                    name="thumbnail"
                    value={data.thumbnail}
                    onChange={handleChange}
                />
                <br/>
                <label htmlFor='range'>Drag slider to select reading progress</label>
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