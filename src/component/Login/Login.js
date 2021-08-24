import React,{Component} from 'react';
import Header from './LoginComponent/loginHeader';
import Body from './LoginComponent/loginBody';
import Footer from './LoginComponent/loginFooter';
import './login.css'

class Login extends Component{
    render () {
        return (
            <div className='container-login'>
                <Header></Header>
                <Body></Body>
                <Footer></Footer>
            </div>
        )
    }
  }

export default Login;