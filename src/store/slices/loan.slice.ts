import { createSlice } from "@reduxjs/toolkit";
import { TAppState } from "..";
import { PA } from "../../types/utility.types";
import { TLoanItem } from "@/types/loan.types";

export type TLoanState = {
  selectedItem: TLoanItem | null;
  items: TLoanItem[];
};

const initialState: TLoanState = {
  selectedItem: null,
  items: [],
};

const loan = createSlice({
  initialState,
  name: "loan",
  reducers: {
    setItems: (state, action: PA<TLoanItem[]>) => {
      state.items = action.payload;
    },
    addItem: (state, action: PA<TLoanItem>) => {
      const ids = state.items.map((item) => item.id);
      if (ids.includes(action.payload.id)) {
        state.items = state.items.map((item) => {
          if (item.id !== action.payload.id) return item;
          return {
            ...item,
            count: item.count + 1,
          };
        });
      }
    },
    resetItems: (state) => {
      state.items = state.items.map((item) => {
        return {
          ...item,
          count: 0,
        };
      });
    },
    removeItem: (state, action: PA<TLoanItem>) => {
      const ids = state.items.map((item) => item.id);
      if (ids.includes(action.payload.id)) {
        state.items = state.items.map((item) => {
          if (item.id !== action.payload.id || item.count === 0) return item;
          return {
            ...item,
            count: item.count - 1,
          };
        });
      }
    },
    selectItem: (state, action: PA<TLoanItem>) => {
      const ids = state.items.map((item) => item.id);
      if (ids.includes(action.payload.id)) {
        state.selectedItem = action.payload;
      }
    },
  },
});

export const loanActions = loan.actions;
export const loanReducer = loan.reducer;

export const selectLoanSelectedItem = (state: TAppState) =>
  state.loan.selectedItem;

export const selectLoanItems = (state: TAppState) => state.loan.items;
