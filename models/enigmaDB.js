
const request           = require('request');
const ENIGMA_KEY        = process.env.ENIGMA_KEY

module.exports = {
  enigmaReturns(req,res,next){
    const url1      = 'https://api.enigma.io/v2/data/';
    const datapath  = '/us.gov.senate.lobbyingdisclosure.main.2016';
    const fullURL   = url1 + ENIGMA_KEY + datapath;


    request.get({
      url: fullURL,
      qs: {
        'search': req.query.company_name,
        'select': 'client_name, year, amount, client_id ,registrant_name ,serialid,id',
        'sort': 'amount-'
      }

        }, function(err, response, body){
          if(err) throw err;
          let companies = JSON.parse(body);
          res.results = companies.result;


          next();
      });
    },
  enigmaDetails (req,res,next) {
    const url2      = 'https://api.enigma.io/v2/data/';
    const datapath2 = "/us.gov.senate.lobbyingdisclosure.issue.2016"
    const fullURL2   = url2 + ENIGMA_KEY + datapath2;

    request.get({
      url: fullURL2,
      qs: {
        'search': req.query.trans_id,
        'select': 'id, code, specific_issue'
      }
    }, function(err, response, body){
      if(err) throw err;
      let details = JSON.parse(body);
      res.results = details.result;
      next();
    });


  }

}
