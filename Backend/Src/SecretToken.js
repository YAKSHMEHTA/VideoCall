import jsonwebtoken from 'jsonwebtoken';

export const secretService = (id,secret)=>{
    let token =  jsonwebtoken.sign({userId:id},secret);
    return token;
}
