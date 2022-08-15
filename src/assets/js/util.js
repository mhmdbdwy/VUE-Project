function setSessionStorage(key, value) {
    sessionStorage.setItem(key, value);
}

function getSessionStorage(key) {
    return sessionStorage.getItem(key);
}
  
module.exports = {
    setSession: setSessionStorage,
    getSession: getSessionStorage,
};