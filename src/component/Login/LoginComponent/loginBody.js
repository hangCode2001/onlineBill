import React,{Component} from 'react';
import { Link, Redirect } from 'react-router-dom';
import logo from '../../../imgs/logo.png'
import '../login.css'
class Body extends Component{
    constructor(props){
        super(props)
        this.state = {
            account: '',
            password: '',
            isLogin: false
        }
    }
    render()
    {
       
        var container = {
            display:"flex",
            width:"100%",
            height:"300px",
            marginLeft:"50px",
            marginRight:"20px",
            marginTop:"10px",
            // backgroundColor:"red"
        }
        var flexLeftStyle = {
            flex:"0 0 50%",
            border:"none"
        }
        var flexRightStyle = {
            flex:"0 0 auto",
            border:"none",
            marginLeft:"90px"
        }
        var registerAndFind = {
            cursor:"pointer",
            border:"none",
            backgroundColor:"white",
            color:"grey",
            fontSize:"small"
        }
        return(
            <div className="formStyle">
                <div className="icon_wrapper">
                    <img src={logo} className="icon"></img>
                </div>
                <form>
                    <ul>
                        <li type = "none" className = "liCss">
                            <input type = "text" placeholder = "请输入账号" className = "inputCss" value = {this.state.account} onChange = {this.getAccount.bind(this)}/>
                        </li>
                        <li type = "none" className = "liCss">
                            <input type = "password" placeholder = "请输入密码" className = "inputCss" value = {this.state.password} onChange = {this.getPassword.bind(this)}/>
                        </li>
                        <li type = "none" className = "liCss">
                        {this.state.isLogin && <Redirect to="/Statistics" />}
                            <input className="loginBtn" value = "登录" readOnly onClick = {this.loginFn.bind(this)}></input>
                        </li>
                        {localStorage.getItem("username") && localStorage.getItem("password") && <Redirect to="/Statistics" />}
                    </ul>
                </form>
                <div className = "container">
                    <div className = "flexRightclassName">
                        <Link to = "/register">
                            <input type = "button" value = "注册" className = "registerAndFind"/>
                        </Link>
                    </div>
                </div>
            </div>
        )
    }
    getAccount(e)
    {
        this.setState({
            account:e.target.value
        })
    }
    getPassword(e)
    {
        this.setState({
            password:e.target.value
        })
    }
    getIslogin()
    {
        this.setState({
            isLogin: true
        })
        // console.log(this.state.isLogin);
    }
    loginFn()
    {
        if(this.state.account.length === 0 || this.state.password.length === 0)
        {
            alert("请输入完整账户密码");
            return;
        }
        const promise = fetch("https://qcw4cy.fn.thelarkcloud.com/login",{
            method: "POST",
            // credentials: true,
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({
                "userName": this.state.account,
                "password": this.state.password
            })
        }).then((response) => response.json());

        promise.then((response) => {
            if(response.isExist === true && response.login === true)
            {
                localStorage.setItem("username",this.state.account);
                localStorage.setItem("password",this.state.password);
                // console.log(localStorage.getItem("username"));
                // console.log(localStorage.getItem("password"));
                //alert("成功");
                this.getIslogin();
            }
            else{
                alert("密码错误或用户未注册");
            }
            // console.log(response);
        })
    }
}

export default Body;