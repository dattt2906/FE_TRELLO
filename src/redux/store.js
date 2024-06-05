import { configureStore } from '@reduxjs/toolkit';

import boardReducer from './reducer';

const store = configureStore({
reducer:{
    boards:boardReducer
}

});

export default store;