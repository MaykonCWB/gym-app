import { ReactNode, createContext, useEffect, useState } from "react";

import { storageUserSave, storageUserGet, storageUserRemove } from "@storage/storageUser";

import { api } from "@services/api";
import { UserDTO } from "@dtos/UserDTO";
import { AppError } from "@utils/AppError";

export type AuthContextDataProps = {
  user: UserDTO;
  signIn: (email: string, password: string) => Promise<void>
  signOut: () => Promise<void>
  isLoadingUserStorageData: boolean
}

type AuthContextProviderProps = {
  children: ReactNode;
}

export const AuthContext = createContext<AuthContextDataProps>({} as AuthContextDataProps)

export function AuthContextProvider({ children }: AuthContextProviderProps) {
  const [user, setUser] = useState<UserDTO>({} as UserDTO)
  const [isLoadingUserStorageData, setIsLoadUserStorageData] = useState(true)

  async function signIn(email: string, password: string) {
    const { data } = await api.post("/sessions", { email, password })
    try {
      if (data.user) {
        setUser(data.user)
        storageUserSave(data.user)
      }
    } catch (error) {

    }
  }

  async function signOut() {
    try {
      setIsLoadUserStorageData(true)

      setUser({} as UserDTO);
      await storageUserRemove()

    } catch (error) {
      throw error
    } finally {
      setIsLoadUserStorageData(false);
    }
  }

  // console.log("USUARIO QUE ESTA LOGADO ==>", userLogged)
  async function loaderUserData() {


    try {
      const userLogged = await storageUserGet()

      if (userLogged) {
        setUser(userLogged)
      }

    } catch (error) {
      throw error;
    } finally {
      setIsLoadUserStorageData(false)
    }

  }

  useEffect(() => {
    loaderUserData()
  }, [])

  return (
    <AuthContext.Provider value={{
      user,
      signIn,
      isLoadingUserStorageData,
      signOut,
    }}>
      {children}
    </AuthContext.Provider>
  )
}