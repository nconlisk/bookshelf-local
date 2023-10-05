import { useState } from "react"
import { useCookies } from "react-cookie"
import BarcodeScanner from "./Scanner"

const GetBook = ({setShowImport, getData}) => {

    //remove edit mode, this modal is only used for data import.
    

    const [cookies, setCookie, removeCookie] = useCookies(null)
    
        
    const [data, setData] = useState({
        user_email: cookies.Email, //null, //hard coded user for testing
        title: "",
        author: "",
        year: "",
        isbn: "",
        thumbnail: "",
        progress: 50,
        date: new Date()
    })


    const getBookInfo = async (e) => {
        e.preventDefault()
        try {
          const bookURL = `https://www.googleapis.com/books/v1/volumes?q=isbn:${data.isbn}&key=AIzaSyCbuwXvJBWnTMUO-iwMXv2Y79Pucksut68` //${process.env.API_KEY}`
          const response = await fetch(bookURL)  //url with backticks as will be passing email param.
          const bookinfo = await response.json()
          
          //also filter isbn input to remove dash using regex.
          const title = bookinfo.items[0].volumeInfo.title
          const author = bookinfo.items[0].volumeInfo.authors[0]
          const year = bookinfo.items[0].volumeInfo.publishedDate.split('-')[0]
          const isbNumber = bookinfo.items[0].volumeInfo.industryIdentifiers
          let isbn13 = ""
          if (isbNumber.length === 2){
            isbn13 = isbNumber[1].identifier
          } else{
            isbn13 = isbNumber[0].identifier}

          //url for book cover from API.
          let thumbnailURL = ""
          if(bookinfo.items[0].volumeInfo.imageLinks){
            thumbnailURL = bookinfo.items[0].volumeInfo.imageLinks.thumbnail
          }          

        
          console.log(title, author, year, isbn13)
          setData(data.user_email, data.title=title, data.author=author, data.year=year, data.isbn=isbn13,data.thumbnail=thumbnailURL, data.progress, data.date) //need to structure response here to update the data array above.
          console.log(data)
          postData(data)
          handleCloseModal()

    
        } catch (err) {
          console.log(err)
        }

      }


    const postData = async () => {
        
        try {
            const response = await fetch(`${process.env.REACT_APP_SERVERURL}/books`, {
                method:"POST",
                headers: {'Content-Type':'application/json'},
                body: JSON.stringify(data)
            })
            if (response.status === 200){
                console.log("WORKED")
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

     // Function to update the ISBN input value
    const handleIsbnChange = (newIsbn) => {
        setData({ ...data, isbn: newIsbn })
    }

       
    const [isScannerVisible, setIsScannerVisible] = useState(true); // Control the visibility of BarcodeScanner
    
    const handleCloseModal = () => {
        setShowImport(false)
        setIsScannerVisible(false)
        //window.location.reload(false) //temporary workaround to release webcam and resources when modal closed
    }
    

    return (
      <div className="overlay">
        <div className="modal">
            <div className="form-title-container">
                <h3>Search book by barcode</h3>
                <button onClick={handleCloseModal}>X</button>
            </div>
            <div>
                {isScannerVisible && (
                <BarcodeScanner 
                onScan={handleIsbnChange} 
                isScannerVisible={isScannerVisible}
                />)}
            </div>
            <form >
                <p>Scan or Manually Enter Barcode</p>
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
           
            </div>
      </div>
    );
  }
  
  export default GetBook;