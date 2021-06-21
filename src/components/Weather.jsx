import React, { Fragment, Component } from 'react';
import './Weather.css';
import { FaTemperatureHigh, FaRegHeart } from 'react-icons/fa';
import { connect } from 'react-redux';
import { changeWeather, currentWeather, activePage, addFavorite } from '../redux/actions/action';
import { ReactSearchAutocomplete } from 'react-search-autocomplete';
import axios from 'axios';

class Weather extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            latitude: '',
            longitude: '',
            geolocation: false,
            items: '',
            city: '',
            metric: true,
            citySelected: '',
        };

        navigator.geolocation.getCurrentPosition((position) => {
            this._geoloc(position.coords.latitude, position.coords.longitude);
        });

    }

    componentDidMount() {



        // axios.get(`https://dataservice.accuweather.com/forecasts/v1/daily/5day/215854?apikey=U54qJgB86bLBZvylGJThkT61T94rJtGN&metric=true`)
        //     .then(res => {
        //         console.log(res);
        //         console.log(res.data);
        //         this.props.changeWeather(res.data)
        //     });

        // axios.get(`https://dataservice.accuweather.com/currentconditions/v1/215854?apikey=U54qJgB86bLBZvylGJThkT61T94rJtGN`)
        //     .then(res => {
        //         console.log(res);
        //         console.log(res.data);
        //         this.props.currentWeather(res.data)
        //     });
    }

    componentDidUpdate() {
        if (!this.state.geolocation && this.state.latitude !== '' && this.state.longitude !== '') {
            axios.get(`https://dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey=U54qJgB86bLBZvylGJThkT61T94rJtGN&q=${this.state.latitude}%2C${this.state.longitude}`)
                .then(res => {
                    this.setState({ geolocation: res.data.Key, citySelected: res.data.ParentCity.EnglishName });
                });

        }

        if (this.state.geolocation && this.state.latitude !== '' && this.state.longitude !== '') {
            axios.get(`https://dataservice.accuweather.com/currentconditions/v1/${this.state.geolocation}?apikey=U54qJgB86bLBZvylGJThkT61T94rJtGN`)
                .then(res => {
                    this.setState({ latitude: '', longitude: '' });

                    this.props.currentWeather(res.data)
                });

            axios.get(`https://dataservice.accuweather.com/forecasts/v1/daily/5day/${this.state.geolocation}?apikey=U54qJgB86bLBZvylGJThkT61T94rJtGN&metric=${this.state.metric}`)
                .then(res => {
                    this.props.changeWeather(res.data)
                });
        }
    }

    changeMetric = () => {
        this.setState({ metric: !this.state.metric });
        axios.get(`https://dataservice.accuweather.com/forecasts/v1/daily/5day/${this.state.geolocation}?apikey=U54qJgB86bLBZvylGJThkT61T94rJtGN&metric=${this.state.metric}s`)
                .then(res => {
                    this.props.changeWeather(res.data)
                });
    }

    convertDay = (date) => {
        var options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(date).toLocaleDateString([],options);

    }
    _geoloc(latitude, longitude) {
        this.setState({ latitude: latitude, longitude: longitude });
    }

    render() {

        const handleOnSearch = (string, results) => {
            // onSearch will have as the first callback parameter
            // the string searched and for the second the results.

            axios.get(`https://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=U54qJgB86bLBZvylGJThkT61T94rJtGN&q=${string}`)
                .then(res => {
                    const item = [];
                    res.data.forEach(element => {
                        const data = {
                            id: element.Key,
                            name: element.LocalizedName
                        }
                        item.push(data);
                    });
                    this.setState({ items: item });
                })
        }


        const handleOnSelect = (item) => {
            axios.get(`https://dataservice.accuweather.com/currentconditions/v1/${item.id}?apikey=U54qJgB86bLBZvylGJThkT61T94rJtGN`)
                .then(res => {
                    this.setState({ latitude: '', longitude: '', geolocation: item.id, citySelected: item.name });

                    this.props.currentWeather(res.data)
                });

            axios.get(`https://dataservice.accuweather.com/forecasts/v1/daily/5day/${item.id}?apikey=U54qJgB86bLBZvylGJThkT61T94rJtGN&metric=${this.state.metric}`)
                .then(res => {
                    this.props.changeWeather(res.data)
                });
        }

        return (
            <Fragment>
                <div className="row">
                    <div className="search-container">
                        <ReactSearchAutocomplete
                            items={this.state.items}
                            onSearch={handleOnSearch}
                            onSelect={handleOnSelect}
                            autoFocus
                        />
                    </div>
                </div>

                <div className="row">
                    <div className="container px-1 px-sm-4 py-5 mx-auto">
                        <div className="row d-flex justify-content-center">
                            <div className="card text-center pt-4 border-0">
                                <h4 className="mb-0">{this.state.citySelected}</h4>
                                <button className="button-change" onClick={() => this.changeMetric()}>
                                    <FaTemperatureHigh />
                                    {
                                        this.state.metric ? (
                                            "°F"
                                        ) : (
                                            '°C'
                                        )
                                    }
                                </button>
                                <button className="add-favorite" onClick={() => this.props.addFavorite({id: this.state.geolocation, name: this.state.citySelected})}>
                                    <FaRegHeart />
                                        Add to favorite
                                </button>
                                <h2 className="large">
                                    {
                                        this.state.metric ? (
                                            this.props && this.props.current && this.props.current[0] && this.props.current[0].Temperature.Metric.Value
                                        ) : (
                                            this.props && this.props.current && this.props.current[0] && this.props.current[0].Temperature.Imperial.Value
                                        )
                                    }
                                    &#176;
                                    {
                                        this.state.metric ? (
                                            this.props && this.props.current && this.props.current[0] && this.props.current[0].Temperature.Metric.Unit
                                        ) : (
                                            this.props && this.props.current && this.props.current[0] && this.props.current[0].Temperature.Imperial.Unit
                                        )
                                    }
                                </h2>
                                <div className="text-center mt-3 mb-4">
                                    <img className="city" alt="city" src={this.props && this.props.current && this.props.current[0] && this.props.current[0].Temperature.Metric.Value < 23 ? "https://www.employers.org/images/directory/newsletter_content/2020/September/bad_weather_blog_sml.jpg" : "https://s7d2.scene7.com/is/image/TWCNews/sunshine_jpg-5goodjpg?wid=1250&hei=703&$wide-bg$"} />
                                </div>
                                <div className="row d-flex px-3 mt-auto">
                                    {
                                        this.props.weather && this.props.weather.DailyForecasts && this.props.weather.DailyForecasts.map((weather) => (
                                            <div className="d-flex flex-column block first">
                                                <small className="text-muted mb-0" id="date">
                                                    { this.convertDay(weather.Date) }
                                                </small>
                                                <div className="text-center">
                                                    <img className="symbol" alt="symbol" src={weather.Temperature.Minimum.Value < 23 ? "https://i.imgur.com/BeWfUuG.png" : "https://i.imgur.com/Shrg84B.png"} />
                                                </div>
                                                <h6><strong>{weather.Temperature.Minimum.Value} - {weather.Temperature.Maximum.Value}&#176;{weather.Temperature.Maximum.Unit}</strong></h6>
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        weather: state.weatherReducer.weather,
        current: state.weatherReducer.current,
        favorite: state.weatherReducer.favorite,
        active: state.weatherReducer.active,
    }
}

export default connect(mapStateToProps, { changeWeather, currentWeather, activePage, addFavorite })(Weather);