import { dataPagination } from '../../types';


interface InitialState {
	initialValues: any;
	pagination: dataPagination;
	settingsForm: any;
	loading: boolean;
	params: any;
}

const initialState: InitialState = {
	initialValues: {},
	settingsForm: {},
	pagination: {
		currentPage: 1,
		pageSize: 5,
		pageCount: 0,
		rowCount: 0,
		firstRowOnPage: 0,
		lastRowOnPage: 0,
		pagedTypes: [],
	},
	loading: false,
	params: {}
}

export const actionTypes = {
	INITIAL_VALUES_FORM_EDIT: 'INITIAL_VALUES_FORM_EDIT',
	CREATE_PAGINATION: 'CREATE_PAGINATION',
	RESET_PAGINATION: 'RESET_PAGINATION',
	LOADING: 'LOADING',
	CHANGE_SCREEN: 'CHANGE_SCREEN',
	ADD_SCREEN: 'ADD_SCREEN'
};

export default function (state: InitialState = initialState, action: any) {
	switch (action.type) {
		case actionTypes.INITIAL_VALUES_FORM_EDIT:
			return {
				...state,
				initialValues: action.payload.initialValues,
				settingsForm: action.payload.settingsForm,
			};
		case actionTypes.CREATE_PAGINATION:
			return {
				...state,
				pagination: {
					currentPage: action.payload.currentPage,
					pageCount: action.payload.pageCount,
					pageSize: action.payload.pageSize,
					rowCount: action.payload.rowCount,
					firstRowOnPage: action.payload.firstRowOnPage,
					lastRowOnPage: action.payload.lastRowOnPage,
					pagedTypes: action.payload.pagedTypes.map(paged => ({ id: paged, text: paged }))
				}
			}
		case actionTypes.RESET_PAGINATION:
			return {
				...state,
				pagination: {
					currentPage: 1,
					pageSize: 5,
					pageCount: 0,
					rowCount: 0,
					firstRowOnPage: 0,
					lastRowOnPage: 0,
					pagedTypes: [],
				},
			}
		case actionTypes.LOADING:
			return {
				...state,
				loading: true
			}
		case actionTypes.ADD_SCREEN:
			return {
				...state,
				params: action.payload
			};
		default: return state;
	}
}
