import React,{Component} from 'react';
import { Link } from 'react-router-dom';
class Header extends Component{
    render()
    {
        var pStyle = {
            cursor: "pointer",
            content: '&#x1F5D9',
            width:"20px",
            height:"20px",
            fontSize:"large"
        }
        return(
            <div>
                <ul>
                    <li>
                        <Link to = "/Login">
                            <div dangerouslySetInnerHTML={{__html: "<span>&#x1F5D9;</span>"}} style={pStyle}></div>
                        </Link>
                    </li>
                </ul>
            </div>
        )
    }
}

export default Header;