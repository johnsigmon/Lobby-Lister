

$(document).ready(function() {

  $('.saveBill').on('click', function(){

    let $results  = $(this).closest('.result');
    let company   = $results.children('.card-title').text();
    let details   = $results.children('p').text();

   console.log('company :', company, 'details :', details)

    $.ajax({
      url: 'user/save-content',
      type: 'POST',
      data: {
        'company': company,
        'details': details
        },
      })
      .done(function(data) {
      console.log(data);
     })
      .fail(function(error) {
      console.log("error");
     })
      .always(function() {
      console.log("complete");
      });
    })
  })



