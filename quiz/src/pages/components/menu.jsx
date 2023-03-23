import React from 'react';
import classes from './menu.css'

class Menu extends React.Component {
    constructor(props) {
        super(props)
        this.state = { show: false }
    }
    showModal(logic) {
        if (!logic) {
            return null
        } else {
            return window.userSign ? <ModalLogin /> : <ModalDefault />
        }
    }
    setModal = () => {
        this.setState({ show: !this.state.show })
    }
    render() {
        return (
            <header>
                <h1>Quiz</h1>
                <div onClick={this.setModal} className="profil">
                </div>
                {this.showModal(this.state.show)}
            </header>
        )
    }
}
class ModalLogin extends React.Component {
    render() {
        return (
            <div className='modal'>
                <p>Имя пользователя</p>
                <p>email</p>
                {/* <a href='#'>Выйти</a> */}
            </div>
        )
    }
}
class ModalDefault extends React.Component {
    constructor(props){
        super(props)
        this.state = {loginValid: false,passwordValid: false,disabledBtn: true}
    }
    sendForm = () => {
        fetch('/form', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({
                login: document.getElementById('login').value,
                password: document.getElementById('password').value
            }),
        }).then((res) => res.json())
            .then((data) => {
                console.log(data)
                if (data.succes) {
                    window.userSign = true;
                }
            })
    }
    validateInput = (event) => {
        let obj = 'passwordValid';
        if(event.target.id === 'login'){
            obj = 'loginValid';
        }
        if(event.target.value.length < 8){
            event.target.classList.remove('text-field__input_valid')
            event.target.classList.add('text-field__input_invalid');
        }else{
            event.target.classList.remove('text-field__input_invalid');
            event.target.classList.add('text-field__input_valid');
            this.setState({[obj]: true});
            if (this.state.loginValid && this.state.passwordValid){
                this.setState({disabledBtn: false})
            }
        }
    }
    render() {
        return (
            <div className='modal modalDefault'>
                <div className="text-field__wrapper">
                    <div className="text-field text-field_floating-2">
                        <input className="text-field__input" type="text" name="city" id="login" placeholder="Moscow" onChange={this.validateInput} />
                            <label className="text-field__label" htmlFor="city">Логин</label>
                    </div>
                </div>
                <div className="text-field__wrapper">
                    <div className="text-field text-field_floating-2">
                        <input className="text-field__input" type="text" name="username" id="password" placeholder='login'onChange={this.validateInput} />
                            <label className="text-field__label" htmlFor="username">Пароль</label>
                    </div>
                </div>
                <button onClick={this.sendForm} disabled={this.state.disabledBtn} id='btnSend'>Войти</button>
                <button>Зарегестритоватся</button>
            </div>
        )
    }
}



export default Menu;