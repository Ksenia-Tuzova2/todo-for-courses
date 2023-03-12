import { instance } from "./instance"


export const authApi = {
  
  authRequest() {
    return instance.get<Object>(`/auth/me`)
    .then((Response) => { return (Response.data) })
  },

  loginRequest() {
    return instance.post(`/auth/login`)
    .then((Response) => { return (Response.data) })
  },

  loginDeleteRequest() {
    return instance.delete<Object>(`/auth/login`,
    ).then((Response) => { return (Response.data) })
  },

}