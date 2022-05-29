
const loginAbout={
    namespaced:true,
    state: {
        user:sessionStorage.getItem('user')?sessionStorage.getItem('user'):null,
        token:sessionStorage.getItem('token')?sessionStorage.getItem('token'):null,
        roleConfigList:[
            {
                code:3000,
                roleName:'student',
            },
            {
                code:2000,
                roleName:'teacher',
            },
            {
                code:1000,
                roleName:'admin',
            }
        ],

        userInfo:[]

    },
    mutations: {
        setUser(state,user){
            state.user = user
            sessionStorage.setItem('user',JSON.stringify(user))
        },
        setToken(state,token){
            sessionStorage.setItem('token',token)
            state.token = token
        },
        logout(state){
            sessionStorage.removeItem('user')
            sessionStorage.removeItem('token')
            state.user = null;
            state.token = null;
        }
    },
    actions: {
    },
    modules: {
    }
}

export default loginAbout;