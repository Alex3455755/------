
import classes from './index.css';
import React from 'react';


class Main extends React.Component {
  render() {
    return (
      <div className="container">
        <Menu />
        <button>+</button>
        
        <div className='lastQuiz'>
        <p>Последние опросы</p>
         <div>
            <div></div>
            <div></div>
         </div>
        </div>
      </div>
    );
  }
}

class Menu extends React.Component {
  render() {
    return (
      <header>
        <h1>Quiz</h1>
        <div></div>
        <div></div>
      </header>
    )
  }
}



export default Main;
