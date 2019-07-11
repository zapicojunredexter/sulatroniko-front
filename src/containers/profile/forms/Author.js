import React from 'react';

export default class Container extends React.PureComponent<> {
    constructor(props){
        super(props);
        this.state = {
            email: '',
            phone: '',
            biography: '',
            dob: '',
            location: '',
            ccnum: '',
            ccv: '',
            ...props.user,
        };
    }

    renderTextField = (key) => {
        return (
            <input
                value={this.state[key]}
                onChange={event => this.setState({[key]: event.target.value})}
                placeholder={key}
            />
        );
    }

    handleSubmit = () => {
        const params = {
            ...this.state,
        };
        this.props.setAuthor(params);
    }

    render() {
        return (
            <div>
                author
                {this.renderTextField('email')}
                {this.renderTextField('phone')}
                {this.renderTextField('biography')}
                {this.renderTextField('dob')}
                {this.renderTextField('location')}
                {this.renderTextField('ccnum')}
                {this.renderTextField('ccv')}
                <button onClick={this.handleSubmit}>submit</button>
            </div>
        );
    }
}
