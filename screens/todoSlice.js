import { createSlice } from "redux-starter-kit";
import db from "../db";

const todoSlice = createSlice({
  initialState: {
    todos: [],
    filter: 'ALL',
  },
  reducers: {
    itemsLoaded(state, { payload }) {
      state.todos = payload;
    },
    filterChanged(state, { payload }) {
      state.filter = payload;
    }
  },
});

export const actions = todoSlice.actions;

export default todoSlice.reducer;
