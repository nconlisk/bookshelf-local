const ProgressBar = ({ progress }) => {

    //colors array
    const colors = [
      'rgb(255, 214, 161)',
      'rgb(255, 175, 163)',
      'rgb(255, 115, 148)',
      'rgb(255, 181, 145)'
    ]

    //select a random color from the array
    const randomColor = colors[Math.floor(Math.random()*colors.length)]


    //use progress % passed in from task and use random color from array to style it
    return (
      <div className="outer-bar">
        <div 
        className="inner-bar"
        style={{width: `${progress}%`, backgroundColor: randomColor}}>
        </div>
      </div>
    );
  }
  
  export default ProgressBar;