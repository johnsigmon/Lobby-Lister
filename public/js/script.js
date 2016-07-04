

$(document).ready(function() {

  $('#saveArticle').on('click', function(event){
       let content =  $(this).parent().html()
       console.log(content)

$.ajax({
  url: 'user/profile',
  type: 'POST',
  dataType: 'default: Intelligent Guess (Other values: xml, json, script, or html)',
  data: {param1: 'value1'},
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




