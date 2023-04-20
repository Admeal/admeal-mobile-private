import { View, Text } from "react-native";
import { createContext, useContext } from "react";

const AuthContext = createContext({});

export const AuthProvider = ({ children }: any) => {
  return (
    <AuthContext.Provider
      value={{
        user: ""
      }}>
      {children}
    </AuthContext.Provider>
  );
};

export default function useAuth() {
  return useContext(AuthContext);
}
