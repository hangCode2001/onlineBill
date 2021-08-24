import React,{Component,Fragment} from 'react';
import {Link} from 'react-router-dom';

class Footer extends Component{
    render(){
        var spanStyle = {
            color:"grey",
            fontSize:"small"
        }
        var loginWithPhone = {
            border:"none",
            width:"100%",
            height:"42px",
            backgroundColor:"RGB(249,219,97)",
            color:"black",
            fontSize:"16px",
            borderRadius:"25px",
            cursor:"pointer"
        }
        return(
            <Fragment>
                <div style = {{textAlign:"center",marginLeft:"40px"}}>
                    <span style = {spanStyle}>{"其他方式登录"}</span>
                </div>
                <form>
                    <ul>
                        <li type = "none" style = {{marginTop:"30px",width:"95%",marginLeft:"10px"}}>
                            
                        </li>
                    </ul>
                </form>
            </Fragment>
        )
    }
}

export default Footer;