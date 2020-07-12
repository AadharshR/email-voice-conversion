const passport = require("passport");
const session = require("express-session");

const authenticate = async (body) =>{
    const { username, password } = body;
    const requiredFields = [];
    if( username === undefined || username === null)
    {
        requiredFields.push("username");
    }
    if(password === undefined || password === null) {
        requiredFields.push("password");
    }
    try{

    return {data:pool}
    }
    catch (e){
        return {error:e}
    }
}

const service = {
    authenticate
}
module.exports = service 