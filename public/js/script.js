

$(document).ready(function() {
console.log('WINNING')



const $company = $('companySearch').val();

$('#companySearchForm').submit(function(req,res){
  var data = $('form').serialize();
  console.log(data)
  res.send('../controllers/apiController', data);
     });

module.exports = data;

})




