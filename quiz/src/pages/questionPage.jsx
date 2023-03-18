import React from 'react';
import classes from './question.css'

class Question extends React.Component {
    render() {
        return (
            <div className='main'>
                <div className='title'>
                    <h2>Название опроса</h2>
                </div>
                <QueBox num={'0'} />
                <QueBox num={'1'} />
                <QueBox num={'2'} />
            </div>
        )
    }
}

class QueBox extends React.Component {
    constructor(props){
        super(props)
        this.num = props.num
    }
    render() {
        return (
            <div className='questionBox'>
                <p>Текст Вопроса</p>
                <input type='radio' id={"inputQuestion1" + this.num} name={'anwear' + `${this.num}`} />
                <label for={"inputQuestion1" + this.num}>Вариант А</label>
                <br></br>
                <input type='radio' id={"inputQuestion2" + this.num} name={'anwear' + `${this.num}`} />
                <label for={"inputQuestion2" + this.num}>Вариант Б</label>
                <br></br>
                <input type='radio' id={"inputQuestion3" + this.num} name={'anwear' + `${this.num}`} />
                <label for={"inputQuestion3" + this.num}>Вариант В</label>
            </div>
        )
    }
}

export default Question;