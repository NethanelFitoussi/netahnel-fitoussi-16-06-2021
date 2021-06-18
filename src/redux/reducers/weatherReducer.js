import {
    WEATHER,
    FAVORITE,
    CURRENT,
    ACTIVE,
    DARK,
    DELETE_FAVORITE
} from '../types/type';
const initialState = {
    weather: [],
    favorite: [],
    current: [],
    active: 'weather',
    dark: false,
};

const weatherReducer = (state = initialState, action) => {
    switch (action.type) {
        case WEATHER:
            return {
                ...state, weather: action.payload
            };
        case CURRENT:
            return {
                ...state, current: action.payload
            };
        case FAVORITE:
            return {
                ...state, favorite: [...state.favorite, action.payload]
            };
        case DELETE_FAVORITE:
            return {
                ...state,
                favorite: state.favorite.filter(
                    (fav) => fav.id != action.payload.id
                )
            };
        case ACTIVE:
            return {
                ...state, active: action.payload
            };
        case DARK:
            return {
                ...state, dark: action.payload
            };
        default:
            return state;
    }
}

export default weatherReducer;