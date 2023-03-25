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
class ModalRegistred extends React.Component {
    constructor(props) {
        super(props)
        this.fn = props.fn;
        this.state = { loginValid: '', passwordValid: '', disabledBtn: true }
    }
    sendForm = () => {
        fetch('/form', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({
                login: document.getElementById('loginReg').value,
                password: document.getElementById('passwordReg').value
            }),
        }).then((res) => res.json())
            .then((data) => {
                console.log(data)
                if (data.succes) {
                    window.userSign = true;
                }
            })
    }
    validInput = ({ target }) => {
        if (target.type === 'text') {
            const a = 'loginValid';
            if (target.value.length < 7) {
                console.log('login')
                console.log(a)
                this.setState({ [a]: 'text-field__input_invalid' });
            } else {
                this.setState({ [a]: 'text-field__input_valid' });
            }
        }
        else {
            const a = 'passwordValid';
            if (/(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])[0-9!@#$%^&*a-zA-Z]{5,}/g.test(target.value)) {
                this.setState({ passwordValid: 'text-field__input_valid' });
            } else {
                this.setState({ passwordValid: 'text-field__input_invalid' });
            }
        }
        if (this.state.loginValid === 'text-field__input_valid' && this.state.passwordValid === 'text-field__input_valid') {
            this.setState({ disabledBtn: false });
        }
        else { this.setState({ disabledBtn: true }) }
    }
    render() {
        return (
            <div className='modal modalDefault modalReg'>
                <div className="text-field__wrapper">
                    <div className="text-field text-field_floating-2">
                        <div className="text-field__message">Пароль должен состоять из букв латинского алфавита цифр и специальных символов</div>
                        <input className={"text-field__input " + this.state.loginValid} type="text" name="city" id="loginReg" placeholder="Moscow" onChange={this.validInput} />
                        <label className="text-field__label" htmlFor="city">Логин</label>

                    </div>
                </div>
                <div className="text-field__wrapper">
                    <div className="text-field text-field_floating-2">
                        <input className={"text-field__input " + this.state.passwordValid} type="password" name="username" id="passwordReg" placeholder='login' onChange={this.validInput} />
                        <label className="text-field__label" htmlFor="username">Пароль</label>
                    </div>
                </div>
                <button onClick={this.sendForm} disabled={this.state.disabledBtn} id='btnSend'>Зарегестритоватся</button>
                <button onClick={this.fn}>Войти</button>
            </div>
        )
    }
}
class ModalDefault extends React.Component {
    constructor(props) {
        super(props)
        this.state = { loginValid: false, passwordValid: false, disabledBtn: true, showRegistr: false }
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
    callBack = () => {
        this.setState({ showRegistr: false });
    }
    setVisReg = () => {
        this.setState({ showRegistr: !this.state.showRegistr });
    }
    validateInput = (event) => {
        let obj = 'passwordValid';
        if (event.target.id === 'login') {
            obj = 'loginValid';
        }
        if (event.target.value.length < 7) {
            event.target.classList.remove('text-field__input_valid')
            event.target.classList.add('text-field__input_invalid');
        } else {
            event.target.classList.remove('text-field__input_invalid');
            event.target.classList.add('text-field__input_valid');
            this.setState({ [obj]: true });
            if (this.state.loginValid && this.state.passwordValid) {
                this.setState({ disabledBtn: false })
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
                        <input className="text-field__input" type="password" name="username" id="password" placeholder='login' onChange={this.validateInput} />
                        <label className="text-field__label" htmlFor="username">Пароль</label>
                    </div>
                </div>
                <button onClick={this.sendForm} disabled={this.state.disabledBtn} id='btnSend'>Войти</button>
                <button onClick={this.setVisReg}>Зарегестритоватся</button>
                {this.state.showRegistr ? <ModalRegistred fn={this.callBack} /> : ''}
            </div>
        )
    }
}



export default Menu;