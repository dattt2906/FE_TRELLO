import {

    FIND_BOARD_DATA,

  } from './action';
  
  const initialState = {
    columns: [],
    boardBackground: '',
    loading: false,
    error: null,
  };
  
  const boardReducer = (state = initialState, action) => {
    switch (action.type) {
      
      case FIND_BOARD_DATA:
        return {
          ...state,
          loading: false,
          columns: action.payload.cols,
          boardBackground: action.payload.boardbackground,
        };
      
      default:
        return state;
    }
  };
  
  export default boardReducer;