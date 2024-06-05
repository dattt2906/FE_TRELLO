import axios from 'axios';


export const FIND_BOARD_DATA = 'FIND_BOARD_DATA';


export const fetchBoardData = (boardId) => {
  return async (dispatch) => {
      const response = await axios.get(`http://localhost:3001/board/find-board-by-id/${boardId}`);
      dispatch({
        type: FIND_BOARD_DATA,
        payload: response.data,
      })}
     
   
};