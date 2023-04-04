const jwt = require('jsonwebtoken');
const {v4: uuidv4} = require('uuid');

function getLoginUrl(customerId, storeHash, storeUrl, clientId, clientSecret) {

   const dateCreated = Math. round((new Date()). getTime() / 1000);
   const  payload = {
       "iss": clientId,
       "iat": dateCreated,
       "jti": uuidv4(),
       "operation": "customer_login",
       "store_hash": storeHash,
       "customer_id": customerId,
   }
   let token = jwt.sign(payload, clientSecret, {algorithm:'HS256'});
   return `${storeUrl}/login/token/${token}`;
};
 
const clientId = "687efxc3hohpwnpw67cffn95amyeu5g";
const clientSecret = "3f7995163bcf88037a1df6478e109a9da2daadd7c0f13b3d103787256d721f0a";
const customerId = 26;
const storeHash = "39n5p4x8ny";
const storeUrl = "https://umiya.mybigcommerce.com/";
 
const loginUrl = getLoginUrl(customerId, storeHash, storeUrl, clientId, clientSecret);
console.log(loginUrl);