import React from 'react';

class Container extends React.PureComponent<> {
    static defaultProps = {
        setScore: () => {},
        score: 0,
    };
    render() {
        const { score } = this.props;
        return (
            <span style={{width: 150,display: 'flex', justifyContent: 'center'}} onClick={(ev) => {ev.stopPropagation(); this.props.setScore(0)}}>
                <span style={{color: score >= 1 ? 'orange' : 'silver'}} onClick={(ev) => {ev.stopPropagation();this.props.setScore(1);}}>{`   ★   `}</span>
                <span style={{color: score >= 2 ? 'orange' : 'silver'}} onClick={(ev) => {ev.stopPropagation();this.props.setScore(2);}}>{`   ★   `}</span>
                <span style={{color: score >= 3 ? 'orange' : 'silver'}} onClick={(ev) => {ev.stopPropagation();this.props.setScore(3);}}>{`   ★   `}</span>
                <span style={{color: score >= 4 ? 'orange' : 'silver'}} onClick={(ev) => {ev.stopPropagation();this.props.setScore(4);}}>{`   ★   `}</span>
                <span style={{color: score >= 5 ? 'orange' : 'silver'}} onClick={(ev) => {ev.stopPropagation();this.props.setScore(5);}}>{`   ★   `}</span>
            </span>
        );
    }
}


export default Container;
