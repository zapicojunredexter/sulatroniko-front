import React from 'react';
import { Link } from "react-router-dom";
import './styles.scss';

export default class Container extends React.PureComponent<> {
    state = {
        isOpen: false,
    }
    
    toggle = () => this.setState({isOpen: !this.state.isOpen});

    render() {
        return (
            <div class="btn-group">
                <button onClick={this.toggle} class="btn btn-primary dropdown-toggle" type="button">Basic dropdown</button>
                <div class="dropdown-menu" style={{display: this.state.isOpen ? 'block' : 'none'}}>
                    {this.props.children}
                </div>
            </div>
        );
    }
}