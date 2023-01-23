import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import Student from '../../student';
import { add, get, upd } from './studentsAPI';

export interface CounterState {
  students: Student[];
  flag : boolean
}

const initialState: CounterState = {
  students: [],
  flag:false
};

export const getallAsync = createAsyncThunk(
  'counter/fetchCount',
  async () => {
    const response = await get();
    return response.data;
  }
);
export const addstudentAsync = createAsyncThunk(
  'counter/add',
  async (stu:Student) => {
    const response = await add(stu);
    return response.data;
  }
);
export const updstudentAsync = createAsyncThunk(
  'counter/upd',
  async (stu:Student) => {
    const response = await upd(stu);
    return response.data;
  }
);


export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(getallAsync.fulfilled, (state, action) => {
        state.students = action.payload;
      })
      .addCase(addstudentAsync.fulfilled, (state) => {
        state.flag = !state.flag;
      })
      .addCase(updstudentAsync.fulfilled, (state) => {
        state.flag = !state.flag;
      })
      
  },
});


export const ALLstusnts = (state: RootState) => state.counter.students;
export const refFlag = (state: RootState) => state.counter.flag;

export default counterSlice.reducer;
