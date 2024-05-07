import api from "./api";

export const findBoardById = async (boardId) => {
  try {
    const token = localStorage.getItem('access_token')
    const res = await api.get(`board/find-board-by-id/${boardId}`,  {
      headers: {
        'Authorization': "Bearer " + token
      }
    });
    return res.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};
