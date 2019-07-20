import React from 'react';
import { Link } from "react-router-dom";

export default class Container extends React.PureComponent<> {
    render() {
        return (
            <div style={{backgroundColor:'orange',width:200}}>
                side bar
                <ul>
                    <li><Link to="/">dashboard</Link></li>
                    <li><Link to="/authors">authors</Link></li>
                    <li><Link to="/publishers">publishers</Link></li>
                    <li><Link to="/profile">profile</Link></li>
                    <li><Link to="/threads">threads</Link></li>
                    <li><Link to="/manuscripts">manuscripts</Link></li>
                    <li><Link to="/copywriters">copywriters</Link></li>
                </ul>
            </div>
        );
    }
}
