
import classes from './index.css';
import React from 'react';
import Menu from './components/menu';


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


export default Main;
