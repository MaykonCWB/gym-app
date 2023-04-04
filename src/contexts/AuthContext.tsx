import { ReactNode, createContext, useEffect, useState } from "react";

import { storageUserSave, storageUserGet, storageUserRemove } from "@storage/storageUser";

import { storageAuthTokenSave, storageAuthTokenGet, storageAuthTokenRemove } from "@storage/storageAuthToken";

import { api } from "@services/api";
import { UserDTO } from "@dtos/UserDTO";


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

  async function userAndTokenUpdate(userData: UserDTO, token: string) {
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`
    setUser(userData)
  }

  async function storageUserAndTokenSave(userData: UserDTO, token: string) {
    try {
      setIsLoadUserStorageData(true)

      await storageUserSave(userData)
      await storageAuthTokenSave(token)

    } catch (error) {
      throw error
    } finally {
      setIsLoadUserStorageData(false)
    }


  }

  async function signIn(email: string, password: string) {
    try {
      const { data } = await api.post("/sessions", { email, password })

      if (data.user && data.token) {
        await storageUserAndTokenSave(data.user, data.token)
        userAndTokenUpdate(data.user, data.token)
      }
    } catch (error) {
      throw error
    } finally {
      setIsLoadUserStorageData(false)
    }
  }

  async function signOut() {
    try {
      setIsLoadUserStorageData(true)

      setUser({} as UserDTO);
      await storageUserRemove()
      await storageAuthTokenRemove()

    } catch (error) {
      throw error
    } finally {
      setIsLoadUserStorageData(false);
    }
  }

  async function loaderUserData() {
    try {
      setIsLoadUserStorageData(true)

      const userLogged = await storageUserGet()
      const token = await storageAuthTokenGet()

      if (token && userLogged) {
        userAndTokenUpdate(userLogged, token)
      }
    } catch (error) {
      throw error
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