import React from 'react';
import Select from 'react-select';

const options = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' },
];

export default class App extends React.Component {
  state = {
    selectedOption: null,
  };
  handleChange = selectedOption => {
    this.setState({ selectedOption });
    this.props.onChange(selectedOption);
  };
  render() {
    const { selectedOption } = this.state;

    return (
      <Select
        placeholder={this.props.placeholder}
        value={selectedOption}
        onChange={this.handleChange}
        options={this.props.choices}
      />
    );
  }
}