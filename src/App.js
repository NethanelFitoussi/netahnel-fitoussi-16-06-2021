import React, { Fragment, Component } from 'react';
import './App.css';
import Favorite from './components/Favorite';
import Top from './components/Top';
import Weather from './components/Weather';
import { connect } from 'react-redux';


class App extends Component {
  constructor(props) {
      super(props);

      this.state = {
      };

  }

  componentDidMount() {
  }


  render() {


      return (
      <div className={this.props.dark ? 'theme-dark' : ''}>
        <div className="container">
          <Top />
          <div className = "App container" >
          {
            this.props.active == 'weather' ? (
              <Weather / >
            ) : (
              <Favorite / >
            )

          }
          </div>
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

export default connect(mapStateToProps, {  })(App);