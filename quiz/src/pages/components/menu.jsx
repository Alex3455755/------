import React, { useEffect, useState } from 'react';
import classes from './menu.css';
import setings from '../../setingsApp';



function Menu() {
    const [show, setModal] = useState(false);
    const [userName, setUserName] = useState('');
    function showModal(logic) {
        if (!logic) {
            return null
        } else {
            return window.userSign ? <ModalLogin name={userName} /> : <ModalDefault fn={callBack} />
        }
    }
    function callBack(str) {
        setModal(false);
        setUserName(str);
    }
    useEffect(() => {
        if (document.cookie !== '') {
            fetch(setings.link + '/authentication', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify({
                    jwt: document.cookie
                }),
            }).then((res) => res.json())
                .then((data) => {
                    if (data.signIn) {
                        window.userSign = true;
                        setUserName(data.name)
                    }
                })
        }
    }, []);

    return (
        <header>
            <a href={setings.link}>Quiz</a>
            <div onClick={() => setModal(!show)} className="profil">
            </div>
            {showModal(show)}
        </header>
    )
}

class ModalLogin extends React.Component {
    constructor(props) {
        super(props)
        this.login = props.name
    }
    render() {
        return (
            <div className='modal'>
                <p>{this.login}</p>
                <p>email</p>
                {/* <a href='#'>Выйти</a> */}
            </div>
        )
    }
}

function ModalRegistred(props) {
    const [disabledBtn, setDisabledBtn] = useState(true)
    const [loginReg, setLoginReg] = useState('')
    const [passwordReg, setPasswordReg] = useState('');
    const [message, setMessage] = useState('Пароль должен состоять из букв латинского алфавита цифр и специальных символов')


    const sendForm = () => {
        fetch(setings.link + '/signUp', {
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
                if (!data.error) {
                    window.userSign = true;
                    document.cookie = `${data.jwt}; max-age=1200`;
                    props.closeModal(data.name);
                } else {
                    setMessage(data.message)
                }
            })
    }
    const validInput = ({ target }) => {
        if (target.type === 'text') {
            if (target.value.length < 7) {
                setLoginReg('text-field__input_invalid')
            } else {
                setLoginReg('text-field__input_valid')
            }
        }
        else {
            if (/(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])[0-9!@#$%^&*a-zA-Z]{5,}/g.test(target.value)) {
                setPasswordReg('text-field__input_valid')
            } else {
                setPasswordReg('text-field__input_invalid')
            }
        }
    }
    useEffect(() => {
        if (loginReg === 'text-field__input_valid' && passwordReg === 'text-field__input_valid') {
            setDisabledBtn(false)
        }
        else { setDisabledBtn(true) }
    })
    return (
        <div className='modal modalDefault modalReg'>
            <div className="text-field__message">{message}</div>
            <div className="text-field__wrapper">
                <div className="text-field text-field_floating-2">
                    <input className={"text-field__input " + loginReg} type="text" name="city" id="loginReg" placeholder="Moscow" onChange={(e) => validInput(e)} />
                    <label className="text-field__label" htmlFor="city">Логин</label>
                </div>
            </div>
            <div className="text-field__wrapper">
                <div className="text-field text-field_floating-2">
                    <input className={"text-field__input " + passwordReg} type="password" name="username" id="passwordReg" placeholder='login' onChange={(e) => validInput(e)} />
                    <label className="text-field__label" htmlFor="username">Пароль</label>
                </div>
            </div>
            <button onClick={() => sendForm()} disabled={disabledBtn} id='btnSend'>Зарегестритоватся</button>
            <button onClick={props.fn}>Войти</button>
        </div>
    )
}

function ModalDefault(props) {
    const [loginValid, setLoginValid] = useState(false);
    const [passwordValid, setPasswordValid] = useState(false);
    const [disabledBtn, setDisabledBtn] = useState(true);
    const [showRegistr, setShowRegistred] = useState(false);
    const [message, setMessage] = useState('');

    const sendForm = () => {
        fetch(setings.link + '/signIn', {
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
                if (!data.error) {
                    window.userSign = true;
                    document.cookie = data.jwt;
                    props.fn(data.name);
                } else {
                    setMessage(data.message);
                }
            })
    }
    const validateInput = (event) => {
        let fn = setPasswordValid;
        if (event.target.id === 'login') {
            fn = setLoginValid;
        }
        if (event.target.value.length < 7) {
            event.target.classList.remove('text-field__input_valid')
            event.target.classList.add('text-field__input_invalid');
            fn(false);
        } else {
            event.target.classList.remove('text-field__input_invalid');
            event.target.classList.add('text-field__input_valid');
            fn(true)
        }
    }
    useEffect(() => {
        if (loginValid && passwordValid) {
            setDisabledBtn(false);
        } else {
            setDisabledBtn(true);
        }
    })
    return (
        <div className='modal modalDefault'>
            <div className="text-field__message">{message}</div>
            <div className="text-field__wrapper">
                <div className="text-field text-field_floating-2">
                    <input className="text-field__input" type="text" name="city" id="login" placeholder="Moscow" onChange={e => validateInput(e)} />
                    <label className="text-field__label" htmlFor="city">Логин</label>
                </div>
            </div>
            <div className="text-field__wrapper">
                <div className="text-field text-field_floating-2">
                    <input className="text-field__input" type="password" name="username" id="password" placeholder='login' onChange={e => validateInput(e)} />
                    <label className="text-field__label" htmlFor="username">Пароль</label>
                </div>
            </div>
            <button onClick={() => sendForm()} disabled={disabledBtn} id='btnSend'>Войти</button>
            <button onClick={() => setShowRegistred(!showRegistr)}>Зарегестритоватся</button>
            {showRegistr ? <ModalRegistred fn={() => setShowRegistred(false)} closeModal={props.fn} /> : ''}
        </div>
    )
}


export default Menu;