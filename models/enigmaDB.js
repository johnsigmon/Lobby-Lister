
const request           = require('request');
const ENIGMA_KEY        = process.env.ENIGMA_KEY

module.exports = {
  enigmaReturns(req,res,next){
    const url1      = 'https://api.enigma.io/v2/data/';
    const datapath  = '/us.gov.senate.lobbyingdisclosure.main.2016';
    const fullURL   = url1 + ENIGMA_KEY + datapath;
    console.log(fullURL)

    request.get({
      url: fullURL,
      qs: {
        'search': req.query.company_name,
        'select': 'client_name, year, amount, client_id ,registrant_name ,serialid,id',

      }

        }, function(err, response, body){
          if(err) throw err;
          let companies = JSON.parse(body);
          res.results = companies.result;
          console.log(res.results[1])

          next();
      });
    }

}
