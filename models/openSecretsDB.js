// const request          = require('request');
// const OPENSECRETS_KEY  =process.env.OPENSECRETS_KEY

// module.exports = {
//      opensecretsReturns(req,res,next){
//       request.get(
//         url: 'http://www.opensecrets.org/api/',
//         qs:{
//           'apikey': OPENSECRETS_KEY,
//           'cycle' : 2014,
//           'cid'   : N00007360

//         }, (err,response, data)=>{
//           let result = JSON.parse(data);
//           res.cycle  = result.cycle;
//           res.cid    = result.cid;
//           next(),

//         }
//         )

//       }

// }
