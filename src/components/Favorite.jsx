import React, { Fragment, Component } from 'react';
import './Favorite.css';
import { connect } from 'react-redux';
import { deleteFavorite } from '../redux/actions/action';
import axios from 'axios';

class Favorite extends Component {
    constructor(props) {
        super(props);

        this.state = {
            items: [],
            metric: true,
        };

    }

    componentDidMount() {
        this.props.favorite.map((fav, i) => (
            axios.get(`https://dataservice.accuweather.com/currentconditions/v1/${fav.id}?apikey=U54qJgB86bLBZvylGJThkT61T94rJtGN`)
                .then(res => {
                    console.log('res', res.data[0].Temperature.Imperial.Value);
                    this.setState(prevState => ({
                        items: [...prevState.items, {name: fav.name, id: fav.id, celcius: res.data[0].Temperature.Metric.Value, fahrenheit: res.data[0].Temperature.Imperial.Value, text: res.data[0].WeatherText }]
                    }))
                })
        ))
    }


    render() {


        return (
            <Fragment>
                <div className="container">
                    <div className="row">
                    {
                        this.state.items.map((item, i) => (
                            <div className="col-md-4">
                                <div className="bloc">
                                    <div>
                                        <button className="delete" onClick={() => this.props.deleteFavorite({  id: item.id})}>X</button >
                                    </div>
                                    <div class="card-body">
                                        <h5 class="card-title">{item.name}</h5>
                                        <p class="card-text">
                                            {
                                                this.state.metric ? (
                                                    item.celcius
                                                ) : (
                                                    item.fahrenheit
                                                )
                                            }
                                            &#176;
                                            {
                                                this.state.metric ? (
                                                    'C'
                                                ) : (
                                                    'F'
                                                )
                                            }
                                        </p>
                                        <p>
                                            {
                                                item.text
                                            }
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                    </div>
                </div>
            </Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        favorite: state.weatherReducer.favorite
    }
}

export default connect(mapStateToProps, { deleteFavorite })(Favorite);