import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AppStateProps {
  isAppInstalled: boolean;
}

const initialState: AppStateProps = {
  isAppInstalled: false,
};

const appStateSlice = createSlice({
  name: 'appState',
  initialState,
  reducers: {
    setIsAppInstalled: (state, action: PayloadAction<boolean>) => {
      state.isAppInstalled = action.payload
    },
  },
});

export const { setIsAppInstalled } = appStateSlice.actions;
export default appStateSlice.reducer;
