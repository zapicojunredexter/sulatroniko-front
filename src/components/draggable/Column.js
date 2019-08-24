import React from 'react';
import { Link } from "react-router-dom";
import './styles.scss';

export default class Container extends React.PureComponent<> {
    onDrop = (event) => {
        this.props.changeProgressStatus(event.dataTransfer.getData("key"), this.props.columnId);
    }

    render() {
        return (
            <div
                onDragOver={(ev) => ev.preventDefault()}
                onDrop={(e) => this.onDrop(e)}
                class="card"
            >
                <div class="card-header">
                    <h5>{this.props.columnId && this.props.columnId.toUpperCase()}</h5>
                </div>
                <div style={{padding: 10}}>
                    {this.props.cards}
                </div>
            </div>
        );
    }
}