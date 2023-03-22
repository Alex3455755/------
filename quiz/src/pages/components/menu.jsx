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
    sendForm = () => {
        fetch('/form', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({ login: document.getElementById('login').value,
             password: document.getElementById('password').value }),
        }).then((res) => res.json())
            .then((data) => {
                console.log(data)
                if (data.succes) {
                    window.userSign = true;
                }
            })
    }
    render() {
        return (
            <div className='modal modalDefault'>
                <input type="text" placeholder='Логин' id='login' />
                <input type="text" placeholder='Пароль' id='password' />
                <button onClick={this.sendForm}>Войти</button>
            </div>
        )
    }
}



export default Menu;