import * as React from "react";

const tempGauge = require("../assets/img/tempGauge.png");

export default class TopNavigation extends React.Component {
    public render() {
        return (
            <nav className="top-navigation navbar navbar-expand navbar-dark bg-dark static-top">
                <a className="header-text navbar-brand mr-1" href="index.html">
                    <img className="logo img-fluid" src={tempGauge} />
                    <span>Temperature Reader</span>
                </a>
            </nav>
        );
    }
}
