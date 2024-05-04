import {
    ADD_SAVINGS
} from './actions';

export const reducer = ( state, action ) => {
    switch ( action.type ) {
        case ADD_SAVINGS:
            return {
                ...state,
                savings: [...action.savings]
            };
        

        default:
            return state;
    }
}
