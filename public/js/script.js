

$(document).ready(function() {

  $('.saveArticle').on('click', function(event){
   // const clicked =  $(this).parent().parent().html()
   let cardDiv = $(this).closest('card')
   let span = cardDiv.attr('span')
   let pText = cardDiv.attr('p')

   console.log('Span :', span, 'P content :', pText)
   const dataObj = {
    company: clicked,
  }
    $.ajax({
      url: './mypage',
      type: 'POST',
      data: {
        param1: dataObj},
      })
      .done(function() {
      console.log("success");
     })
      .fail(function() {
      console.log("error");
     })
      .always(function() {
      console.log("complete");
      });
    })
  })




