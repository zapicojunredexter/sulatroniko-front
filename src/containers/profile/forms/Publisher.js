import React from 'react';

export default class Container extends React.PureComponent<> {
    constructor(props){
        super(props);
        this.state = {

        };
    }
    render() {
        return (
            <div>
                publisher
                <input type="" value={this.state} onChange={() => this.setState({})} placeholder="" />
                <button onClick={this.handleSubmit}>submit</button>
            </div>
        );
    }
}
