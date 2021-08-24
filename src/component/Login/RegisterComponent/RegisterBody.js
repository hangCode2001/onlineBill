import React, { useState } from 'react';
import './RegisterUi.css';
import {  Redirect } from 'react-router-dom';
import logo from '../../../imgs/logo.png'
import '../login.css'
export default function Register(props){
    const [account,setAccount] = useState('');
    const [password,setPassword] = useState('');
    const [isRegister,setRegister] = useState(false)

     

    const handleChange = function(e)
    {
        if(e.target.name === 'account')
        {
            setAccount(e.target.value);
        }
        else if(e.target.name === 'password')
        {
            setPassword(e.target.value);
        }
    }

    const registerAccount = function()
    {
        if(account.length === 0 || password.length === 0){
            alert("用户名或密码少一项");
            return;
        }
        const promise = fetch("https://qcw4cy.fn.thelarkcloud.com/register",{
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({
                "userName": account,
                "password": password
            })
        }).then((response) => response.json())
        promise.then((response) => {
            if(response.isExist === false)
            {
                alert("注册成功");
                setRegister(true)
            }
            else if(response.isExist === true)
            {
                alert("该用户名已存在");
            }
            console.log(response);
        })
    }

    return(
        <div className = "formStyle">
            <div className="icon_wrapper">
                    <img src={logo} className="icon"></img>
                </div>
            <form>
                <ul>
                    <li type = "none" className = "liCss">
                        <label>账号：<input type = "text" placeholder = "请输入账号" className = "inputCss" name = "account" value = {account} onChange = {handleChange}></input></label>
                    </li>
                    <li type = "none" className = "liCss"><label>密码：<input type = "password" placeholder = "请输入密码" className = "inputCss" name = "password" value = {password} onChange = {handleChange}></input></label>
                    </li>
                    <li type = "none" className = "liCss"><input type = "button" className="loginBtn" value = "注册" onClick = {registerAccount}></input></li>
                </ul>
            </form>
            {isRegister && <Redirect to="/login"/>}
        </div>
    )
}