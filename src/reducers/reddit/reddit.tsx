
//Describe state objects
interface InitialState {
    columns: Array<string>;
    dataForm: any;
    order: any;
    tests: Array<any>;
}
//Actions trigeer Sagas and Reducers
export const actionTypes = {
    GET_POST: 'GET_POST',
    ADD_POST: 'ADD_POST',
    ADD_POSTS: 'ADD_POSTS',
    CREATE_POSTS: 'CREATE_POSTS',
    SAVE_POSTS: 'SAVE_POSTS',
    PAY_ORDER: 'PAY_ORDER',
    GET_DATA_FORM: 'GET_DATA_FORM',
};

//Initial state
const initialState: InitialState = {
    columns: [],
    dataForm: {},
    order: {},
    tests: []
}

//function inject data to state
export default function (state: InitialState = initialState, action: any) {
    switch (action.type) {
        case actionTypes.ADD_POST:
            var data0 = {
                ...state,
                order: action.payload.order,
            };
            return data0;
        case actionTypes.ADD_POSTS:
            var order = state.order;
            order.items.push(action.payload);
            var data0 = {
                ...state,
                order: order,
            };
            return data0;

        default: return state;
    }
}
