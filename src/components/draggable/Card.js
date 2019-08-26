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
                draggable={this.props.isDraggable}
                onDragStart={this.onDragStart}
                onDragOver={(ev) => ev.preventDefault()}
                onDrop={(ev) => {
                    // console.log('gidroppan', ev.dataTransfer.getData("key"));
                    this.props.changeProgressOrder(ev.dataTransfer.getData("key"), this.props.cardId);
                }}
                class="card"
                style={{marginBottom: 10}}
            >
                {this.props.isDraggable && (
                    <div style={{position: 'absolute', right: 0}}>
                        <span class="close" onClick={() => this.props.onClickDelete(this.props.cardId)} style={{marginRight: 5}}>
                            <span>&times;</span>
                        </span>
                    </div>
                )}
                <div
                    class="card-body"
                >
                    {this.props.label}
                </div>
            </div>
        );
    }
}