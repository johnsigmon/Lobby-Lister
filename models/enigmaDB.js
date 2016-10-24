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
        'select': 'client_name, year, amount, client_id, client_general_description, registrant_name, registrant_general_description, contact_full_name, serialid, id',
        'sort': 'amount-',
        'limit' : 10
        }
    }, function(err, response, body){
        if (err) throw err;
        const companies = JSON.parse(body);
        const url2      = 'https://api.enigma.io/v2/data/';
        const datapath2 = "/us.gov.senate.lobbyingdisclosure.issue.2016"
        const fullURL2   = url2 + ENIGMA_KEY + datapath2;
        res.results = companies.result;
        res.locals.billDetails = []
        res.rows;
        for (let i =0; i < res.results.length; i++){
          request.get({
            url: fullURL2,
            qs: {
              'search': res.results[i]['id'],
              'select': 'id, code, specific_issue'
            }
          }, function(err, response, body){
              if (err) throw err;
              const details = JSON.parse(body);
              res.rows = details.result;
              res.results = res.results.concat(res.rows);
            })}

      next();
      }
    );
  },

  getDetails(req,res,next) {
    const url2      = 'https://api.enigma.io/v2/data/';
    const datapath2 = "/us.gov.senate.lobbyingdisclosure.issue.2016"
    const fullURL2   = url2 + ENIGMA_KEY + datapath2;
    request.get({
            url: fullURL2,
            qs: {
              'search': req.query['id'],
              'select': 'id, code, specific_issue'
            }
          }, function(err, response, body){
              if (err) throw err;
              const details = JSON.parse(body);
              console.log(details)
              res.rows = details.result;
              next();
  });
  },
}
