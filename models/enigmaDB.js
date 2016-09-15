
const request           = require('request');
const ENIGMA_KEY        = process.env.ENIGMA_KEY



module.exports = {
  enigmaReturns(req,res,next){
    const url1      = 'https://api.enigma.io/v2/data/';
    const datapath  = '/us.gov.senate.publicrecords.lobbying.lobbying';
    const fullURL   = url1 + ENIGMA_KEY + datapath;

    request.get({
      url: fullURL,
      qs: {
        'search': '@client_name('+req.query.company_name+')',
        'select': 'client_name, year, amount,transaction_id,client_parent_name,serialid,transaction_id',
        'sort': 'amount-',
        'limit': '10'
      }

        }, function(err, response, body){
          if(err) throw err;
          let companies = JSON.parse(body);
          res.results = companies.result;
          console.log(res.results[0].year)
          console.log()

          next();
      });
    },
    updateGraph(req,res,next) {

            let graphData = []
            for(let i=0; i < companies.length; i++) {
            graphData.push({
                amount: companies[i].amount,
                year: companies[i].year
          })}
            console.log(graphData);

            next();
    }

}
