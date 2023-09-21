const ProgressBar = ({ progress }) => {

    //use progress % passed in from task and use random color from array to style it
    return (
      <div className="outer-bar">
        <div 
        className="inner-bar"
        style={{width: `${progress}%`, backgroundColor: 'rgb(144, 238, 144)'}}>
        </div>
      </div>
    );
  }
  
  export default ProgressBar;