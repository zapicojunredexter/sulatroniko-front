import React from 'react';

export default class Container extends React.PureComponent<> {
    constructor(props){
        super(props);
        this.state = {
            writerName: '',
            email: '',
            phone: '',
            jobDesc: '',
            ...props.user,
        };
    }

    handleSubmit = () => {
        const copywriter = {
            name: this.state.writerName,
            email: this.state.email,
            phone: this.state.phone,
            jobDesc: this.state.jobDesc,
        };
        this.props.setCopywriter(copywriter);
    }

    render() {
        return (
            <div>
                copywriter
                <input type="" value={this.state.writerName} onChange={(event) => this.setState({writerName: event.target.value})} placeholder="writerName" />
                <input type="" value={this.state.email} onChange={(event) => this.setState({email: event.target.value})} placeholder="email" />
                <input type="" value={this.state.phone} onChange={(event) => this.setState({phone: event.target.value})} placeholder="phone" />
                <input type="" value={this.state.jobDesc} onChange={(event) => this.setState({jobDesc: event.target.value})} placeholder="jobDesc" />
                <button onClick={this.handleSubmit}>submit</button>
            </div>
        );
    }
}
