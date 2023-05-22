import { useReducer } from "react";
import { initialClients } from "../utils";

export const initialMainState = {
  list: initialClients,
  activateForm: false,
  editRow: -1,
};

export type MainState = {
  list: Array<Client>;
  activateForm: Boolean;
  editRow: Number;
};

export type Client = {
  name: string;
  date: string;
  email: string;
  status: string;
};

type Actions =
  | "ADD_CLIENT"
  | "ACTIVATE_FORM"
  | "UPDATE_CLIENT"
  | "EDIT_ROW"
  | "DISCARD_CHANGES";

interface Payload {
  user?: Client;
  activateForm?: Boolean;
  newList?: Client[];
  editRow?: Number;
}

export interface GlobalAction {
  type: Actions;
  payload?: Payload;
}

const reducer = (state: any, action: GlobalAction) => {
  switch (action.type) {
    case "ADD_CLIENT": {
      if (action.payload) {
        return { ...state, list: [...state.list, action.payload.user] };
      }
      break;
    }
    case "ACTIVATE_FORM": {
      if (action.payload) {
        return { ...state, activateForm: action.payload.activateForm };
      }
      break;
    }
    case "UPDATE_CLIENT": {
      if (action.payload) {
        return { ...state, list: action.payload.newList };
      }
      break;
    }
    case "EDIT_ROW": {
      if (action.payload) {
        return { ...state, editRow: action.payload.editRow };
      }
      break;
    }
    case "DISCARD_CHANGES": {
      return { ...state, editRow: -1, activateForm: false };
    }
    default:
      return state;
  }
};

const useMainState = () => {
  return useReducer(reducer, initialMainState);
};

export default useMainState;
