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
                onDrop={(ev) => {
                    // console.log('gidroppan', ev.dataTransfer.getData("key"));
                    this.props.changeProgressOrder(ev.dataTransfer.getData("key"), this.props.cardId);
                }}
                style={{backgroundColor: 'orange'}}
            >
                {this.props.cardId}
            </div>
        );
    }
}