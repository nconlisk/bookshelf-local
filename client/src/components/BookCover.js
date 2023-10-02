const BookCover= ({ title }) => {

    let Art = ""
    let ArtText = ""

    const bookArt = {
        "Fantastic Mr. Fox": "thumbnails/Fox.jpg",
        "Clean Code": "thumbnails/code.jpg",
        "Data Science from Scratch":"thumbnails/data.jpg",
        "Fluent Forever":"thumbnails/fluent.jpg" 
        }

    if(title in bookArt){
        //hardcoded as a test, eventually download from book api on task creation
        //need to style in css and impose some dimensional constraints.
        Art = bookArt[title] 
        ArtText="book cover image"
      }else{
        Art = "thumbnails/notFound.jpg" 
        ArtText="not found"
      }

    //use progress % passed in from task and use random color from array to style it
    return (
      <div className="book-cover-art">
        <figure>
            <img src={Art} alt={ArtText}></img>
            <figcaption className="task-title">Title: {title}</figcaption>
        </figure>  
      </div>
    );
  }
  
  export default BookCover;




