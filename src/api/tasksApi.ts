

export const authApi = {
    authRequest() {
        return instance.get(`/auth/me`,

          {
           headers:{ "API-KEY":'c999ab7d-e835-4c75-be15-733c12'
          }}
            //это позволяет нам делать кроссдоменный запрос
            // и собирать куку - текстовый файл с данными  -
            //креденшлс значит - с разрешением, с правами, с регалиями, 
            //мы разрешаем отослать свой запрос и получить его
        ).then((Response) => { return (Response.data) })
    },

}