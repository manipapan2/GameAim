import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";
import panelReducer from "./panelSlice";
import appStateReducer from "./appStateSlice";

const store = configureStore({
	reducer: {
		cart: cartReducer,
		panelState: panelReducer,
		appState: appStateReducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
