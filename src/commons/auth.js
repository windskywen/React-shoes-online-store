
const JWT = 'store_token_id'

const setToken = token => {
    localStorage.setItem(JWT, token)
};

global.auth = {
    setToken
}