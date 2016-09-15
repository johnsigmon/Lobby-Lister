

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

/*          var results = [
  {name: "Satisfied", count: 1043, color: "lightblue"},
  {name: "Neutral", count: 563, color: "lightgreen"},
  {name: "Unsatisfied", count: 510, color: "pink"},
  {name: "No comment", count: 175, color: "silver"}
];

  var cx = document.querySelector("canvas").getContext("2d");
  var total = results.reduce(function(sum, choice) {
    return sum + choice.count;
  }, 0);
  // Start at the top
  var currentAngle = -0.5 * Math.PI;
  results.forEach(function(result) {
    var sliceAngle = (result.count / total) * 2 * Math.PI;
    cx.beginPath();
    // center=300,300, radius=300
    // from current angle, clockwise by slice's angle
    cx.arc(300, 300, 300,
           currentAngle, currentAngle + sliceAngle);
    currentAngle += sliceAngle;
    cx.lineTo(300, 300);
    cx.fillStyle = result.color;
    cx.fill();
  });*/

  })



