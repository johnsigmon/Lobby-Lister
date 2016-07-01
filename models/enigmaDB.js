
const request           = require('request');
const ENIGMA_KEY        =process.env.ENIGMA_KEY


module.exports = {
  enigmaReturns(req,res,next){
    const url1 = 'https://api.enigma.io/v2/data/'
    const datapath = '/us.gov.senate.publicrecords.lobbying.lobbying'
    const fullURL = url1 + ENIGMA_KEY + datapath

    request.get({
      url: fullURL,
      qs: {
        'search': '@client_name('+ req.query. +')',
        'select': 'client_name, year, amount,transaction_id,client_parent_name,serialid',
        'sort': 'amount-',
        'limit': '10'
      }

    }, function(err, response, body){
      if(err) throw err;
      let companies = JSON.parse(body);
      res.results = companies.result;
      console.log(res.results)
      next()
    })


}

}
