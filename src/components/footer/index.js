import React from 'react';
import { Link } from "react-router-dom";
import './styles.scss';

export default class Container extends React.PureComponent<> {
    render() {
        return (
            <footer class="page-footer text-center font-small primary-color-dark darken-2 mt-4 wow fadeIn">
            
                <div class="footer-copyright py-3">
                    © 2019 Copyright:
                    <a href="https://mdbootstrap.com/education/bootstrap/" target="_blank"> SulaTroniko </a>
                </div>

            </footer>
        );
        return (
            <div className="main-footer">
               Copyright 2017 SulaTroniko. All Rights Reserved.
            </div>
        );
    }
}