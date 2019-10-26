import React, { Component } from 'react';
import './TopPanel.css';

class TopPanel extends Component {
    render() {
        return (
            <nav className="topPanel">
                <span className="app-name">React App</span>
                <div className="menu">
                    <button className="menu-button">
                        <div className="button-line" />
                        <div className="button-line" />
                        <div className="button-line" />
                    </button>
                    {/*<ul>
                        <li><a href="/">Place holder</a></li>
                        <li><a href="/">Place holder</a></li>
                        <li><a href="/">Place holder</a></li>
                        <li><a href="/">Place holder</a></li>
                    </ul>*/}
                </div>
            </nav>
        );
    }
}

export default TopPanel;