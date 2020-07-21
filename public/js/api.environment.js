// api.environment.js  

window['runConfig'] = {
    apiUrl: 'https://eshop-deve.herokuapp.com/api/v2/', //Url server dev
    //apiUrl: 'http://localhost:44341/api/', //Url server dev
    ///TIME in miliseconds 30 min * 60 * 1000 = 1800000
    signoutTime: 1800000,
    ///Time POPUP SHOWUP AFTER INITIAL TIME AND BEFORE LOGOUT in miliseconds 29 min * 60 * 1000 = 1740000
    warningTime: 1740000
}
