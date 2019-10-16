import { configureStore } from 'redux-starter-kit';
import todoSliceReducer from './screens/todoSlice';

const store = configureStore({
  reducer: todoSliceReducer,
});

export default store;
