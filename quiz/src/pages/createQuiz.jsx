import React from 'react';


class CreatePage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            listCount: [
                { header: '', variants: { A: '', B: '', C: '' },key:0 },
            ]
        }
        this.count = 1
    }
    helpMe =(obj) => {
        this.setState({listCount: obj});
    }
    callBack = (obj) => {
        let a = this.state.listCount.slice();
        obj.key = this.count
        this.count +=1
        a.unshift(obj);
        this.helpMe(a)
    }
    render() {
        console.log(this.state);
        console.log(this.count);
        return (
            <div className='container'>
                <div className='main'>
                    <div className='titleCreate'>
                        <textarea type="text" max="100" placeholder='Название опроса не более 100 символов' />
                    </div>
                    {this.state.listCount.map((item) => {
                        return (<NewQuestion key={item.key} count={this.count} header={item.header} fn={this.callBack}
                            A={item.variants.A} B={item.variants.B} C={item.variants.C} />);
                    })}
                    <div className='submitBox'>
                        <button>Отправить ответы</button>
                    </div>
                </div>
            </div>
        )
    }
}
class NewQuestion extends React.Component {
    constructor(props) {
        super(props)
        this.fn = props.fn;
        this.count = props.count
        this.state = { header: props.header, A: props.A, B: props.B, C: props.C }
    }
    handleChange = (event) => {
        switch (event.target) {
            case document.getElementsByClassName(`${this.count}`).children[0]:
                this.setState({ A: event.target.value });
                break
            case document.querySelector('.' + this.count).children[1]:
                this.setState({ B: event.target.value });
                break
            case document.querySelector('.' + this.count).children[2]:
                this.setState({ C: event.target.value });
                break
            default:
                this.setState({ header: event.target.value });
                break
        }
    }
    addQuestion = () => {
        this.fn({ header: this.state.header, variants: { A: this.state.A, B: this.state.B, C: this.state.C },key:0 });
    }
    render() {
        return (
            <div id='newQuestion'>
                <input type='text' placeholder='Текст Вопроса' value={this.state.header} onChange={this.handleChange} />
                <div className={'variants ' + this.count}>
                    <input placeholder='Вариант Ответа' value={this.state.A} onChange={this.handleChange} />
                    <input placeholder='Вариант Ответа' value={this.state.B} onChange={this.handleChange} />
                    <input placeholder='Вариант Ответа' value={this.state.C} onChange={this.handleChange} />
                </div>
                <button onClick={this.addQuestion}>Добавить</button>
            </div>
        )
    }
}



export default CreatePage;