import React from 'react';
import classes from './question.css';
import Menu from './components/menu';

class Question extends React.Component {
    constructor(props){
        super(props)
        this.fn = props.fn;
    }
    render() {
        return (
            <div className='container'>
                <Menu />
                <div className='main'>
                    <div className='title'>
                        <h2>Название опроса</h2>
                    </div>
                    <QueBox num={'0'} />
                    <QueBox num={'1'} />
                    <QueBox num={'2'} />
                    <div className='submitBox'>
                        <button  onClick={this.fn}>Отправить ответы</button>
                    </div>
                </div>
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
                <div>
                    <input type='radio' id={"inputQuestion1" + this.num} name={'anwear' + `${this.num}`} />
                    <label htmlFor={"inputQuestion1" + this.num}>Вариант А</label>
                </div>
                <div>
                    <input type='radio' id={"inputQuestion2" + this.num} name={'anwear' + `${this.num}`} />
                    <label htmlFor={"inputQuestion2" + this.num}>Вариант Б</label>
                </div>
                <div>
                    <input type='radio' id={"inputQuestion3" + this.num} name={'anwear' + `${this.num}`} />
                    <label htmlFor={"inputQuestion3" + this.num}>Вариант В</label>
                </div>
            </div>
        )
    }
}

export default Question;