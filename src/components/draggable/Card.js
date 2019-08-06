import React from 'react';
import { Link } from "react-router-dom";
import './styles.scss';

export default class Container extends React.PureComponent<> {
    onDragStart = (event) => {
        event.dataTransfer.setData("key", this.props.cardId)
    }
    render() {
        return (
            <div
                draggable
                onDragStart={this.onDragStart}
                onDragOver={(ev) => ev.preventDefault()}
                style={{backgroundColor: 'orange'}}
            >
                {this.props.cardId}
            </div>
        );
    }
}