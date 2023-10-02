import { useState } from "react"
import { useCookies } from "react-cookie"

const GetBook = ({setShowImport, getData}) => {

    //remove edit mode, this modal is only used for data import.
    

    const [cookies, setCookie, removeCookie] = useCookies(null)
    
        
    const [data, setData] = useState({
        user_email: cookies.Email, //null, //hard coded user for testing
        title: "",//data.title ?? "",
        author: "",//data.author ?? "",
        year: "",//data.year ?? "",
        isbn: "",//data.isbn ?? "",
        progress: 50,
        date: new Date()
    })


    const getBookInfo = async (e) => {
        e.preventDefault()
        try {
          const bookURL = `https://www.googleapis.com/books/v1/volumes?q=isbn:${data.isbn}&key=AIzaSyCbuwXvJBWnTMUO-iwMXv2Y79Pucksut68` //${process.env.API_KEY}`
          const response = await fetch(bookURL)  //url with backticks as will be passing email param.
          const json = await response.json()
          console.log(json)
          //add function here to process data into format required by the app.
          //also filter isbn input to remove dash using regex.


          setData(json)
    
        } catch (err) {
          console.log(err)
        }
      }

    
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
                setShowImport(false)
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
                <h3>Search book by barcode</h3>
                <button onClick={()=> setShowImport(false)}>X</button>
            </div>
            <form >
                <input
                    required
                    maxLength={30}
                    placeholder=" Enter Barcode Here"
                    name="isbn"
                    value={data.isbn}
                    onChange={handleChange}
                />
                <input className='create' type="SUBMIT" onClick={getBookInfo}/>
            </form>
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
                    placeholder=" Add publication year here"
                    name="year"
                    value={data.year}
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
                <input className='create' type="submit" onClick={postData}/>
            </form>
            </div>
      </div>
    );
  }
  
  export default GetBook;