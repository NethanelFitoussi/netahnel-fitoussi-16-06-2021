import React, { Fragment, Component } from 'react';
import './Top.css';
import { connect } from 'react-redux';
import { activePage, darkMode } from '../redux/actions/action';
class Top extends Component {
    constructor(props) {
        super(props);

        this.state = {
        };

    }

    componentDidMount() {
    }

    changePage = (page) => {
        this.props.activePage(page)
    }

    darkMode = (isDark) => {
        this.props.darkMode(isDark)
    }


    render() {

        return (
            <div className="topnav">
                <div className="left">
                    Weather App
                </div>
                <div className="right">
                    <a onClick={() => this.darkMode(!this.props.dark)}>Change Mode</a>
                    <a className={this.props.active === 'weather' ? 'active' : ''} onClick={() => this.changePage('weather')}>Weather</a>
                    <a className={this.props.active === 'favorite' ? 'active' : ''} onClick={() => this.changePage('favorite')}>Favorite</a>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        active: state.weatherReducer.active,
        dark: state.weatherReducer.dark,
    }
}

export default connect(mapStateToProps, { activePage, darkMode })(Top);