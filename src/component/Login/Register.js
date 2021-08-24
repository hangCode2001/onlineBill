import React,{Component} from 'react';
import RegsiterBody from './RegisterComponent/RegisterBody';
import Header from './LoginComponent/loginHeader';

class Register extends Component{
    render(){
        return (
            <div className='container-login'>
                <Header />
                <RegsiterBody />
            </div>
        )
    }
}

export default Register;