const BookCover= ({ task }) => {

    let Art = ""
    let ArtText = ""

    const bookArt = {
        "Fantastic Mr. Fox": "thumbnails/Fox.jpg",
        "Clean Code": "thumbnails/code.jpg",
        "Data Science from Scratch":"thumbnails/data.jpg",
        "Fluent Forever":"thumbnails/fluent.jpg" 
        }

    if(task.title in bookArt){
        //hardcoded as a test, eventually download from book api on task creation
        //need to style in css and impose some dimensional constraints.
        //had to move thumbnails to public folder for react app to have access to them via relative links
        Art = bookArt[task.title] 
        ArtText="book cover image"
      }else{
        Art = "thumbnails/notFound.jpg" 
        ArtText="not found"
      }

    
    return (
      <div className="book-cover-art">
        <figure>
            <img src={Art} alt={ArtText} className="book-cover-img"></img>
            <figcaption className="book-title">
                Title: {task.title} <br/> 
                Author: {task.author} <br/> 
                Year: {task.year}
            </figcaption>
        </figure>  
      </div>
    );
  }
  
  export default BookCover;




