import axios from "axios";
import React, { createContext, useReducer, useContext, useEffect } from "react";

interface User {
  ID: string;
  Name: string;
  email: string;
  UkmName: string;
  OwnerName: string;
  PhoneNumber: number;
  CertficateName: string;
  BusinnesEmail: string;
  BusinessInstagram: string;
  BusinessSize: string;
  BusinessAdress: string;
  BusinessBirth: Date;
  employees: string;
  CertificateID: string;
  TurnoverYears: string;
}
interface State {
  authenticated: boolean;
  user: null | User;
  loading: boolean;
}

interface Action {
  type: string;
  payload: any;
}

const StateContext = createContext<State>({
  authenticated: false,
  user: null,
  loading: true,
});

const DispatchContext = createContext(null);

const reducer = (state: State, { type, payload }: Action) => {
  switch (type) {
    case "LOGIN_REGISTER":
      return {
        ...state,
        authenticated: true,
        user: payload,
      };
    case "LOGOUT":
      return { ...state, authenticated: false, user: null };
    case "STOP_LOADING":
      return { ...state, loading: false };
    default:
      throw new Error(`Unknow action type : ${type} `);
  }
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, defaultDispatch] = useReducer(reducer, {
    user: null,
    authenticated: false,
    loading: true,
  });

  const dispatch = (type: string, payload?: any) =>
    defaultDispatch({ type, payload });

  useEffect(() => {
    async function loadUser() {
      try {
        const res = await axios.get("v1/users/me", { withCredentials: true });

        dispatch("LOGIN_REGISTER", res.data);
      } catch (err) {
      } finally {
        dispatch("STOP_LOADING");
      }
    }

    loadUser();
  }, []);

  return (
    <DispatchContext.Provider value={dispatch}>
      <StateContext.Provider value={state}>{children}</StateContext.Provider>
    </DispatchContext.Provider>
  );
};

export const useAuthState = () => useContext(StateContext);
export const useAuthDispatch = () => useContext(DispatchContext);
