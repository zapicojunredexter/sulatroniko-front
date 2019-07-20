import React from 'react';
import { Link } from "react-router-dom";
import './styles.scss';

export default class Container extends React.PureComponent<> {
    render() {
        return (
            <div className="main-footer">
               Copyright 2017 SulaTroniko. All Rights Reserved.
            </div>
        );
    }
}