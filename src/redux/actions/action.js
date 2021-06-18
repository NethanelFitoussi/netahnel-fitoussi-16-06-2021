import { WEATHER, FAVORITE, CURRENT, ACTIVE, DARK, DELETE_FAVORITE } from '../types/type';

export const changeWeather = (weather) => {
    return async (dispatch) => {
        dispatch({ type: WEATHER, payload: weather })
    }
}

export const currentWeather = (current) => {
    return async (dispatch) => {
        dispatch({ type: CURRENT, payload: current })
    }
}

export const activePage = (active) => {
    return async (dispatch) => {
        dispatch({ type: ACTIVE, payload: active })
    }
}

export const addFavorite = (favorite) => {
    return async (dispatch) => {
        dispatch({ type: FAVORITE, payload: favorite })
    }
}

export const deleteFavorite = (favorite) => {
    return async (dispatch) => {
        dispatch({ type: DELETE_FAVORITE, payload: favorite })
    }
}

export const darkMode = (dark) => {
    return async (dispatch) => {
        dispatch({ type: DARK, payload: dark })
    }
}