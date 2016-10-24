


$(document).ready(function() {

  const $saveDonation = $('.saveBill');

  $saveDonation.click(saveDonation);

  function saveDonation(){
       $(this).text('Saved!')
           .css({'background-color':'red',
                 'color':'white'})



    let $donation  = $(this).closest('section');

    let company   = $donation.children('h1').text();

    let amount    = $donation.children('.money').text();

    let lobbyOrg  = $donation.children('.registrar').text();
    let lobbyist  = $donation.children('.lobbyist').text();
    let transID   = $donation.children('.transactionID').text();

    let article   = {
      company,
      amount,
      lobbyOrg,
      lobbyist,
      transID
    }
    console.log(article)



    $.ajax({
      url: 'user/save-content',
      type: 'POST',
      dataType: 'json',
      data: {
        article,
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
    }

  })



