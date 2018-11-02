
$(document).ready(function() {

//Form
var postOneURL = "http://localhost:8888/Zap-v3/api/enquiries/postOne.php";
var postOne;
var validated = false;
var v1 = false;
var v2 = false;
var v3 = false;
var v4 = false;

$('#enq-error').hide();
$('#enq-success').hide();
$('#enq-duplicate').hide();

$('#enquiry-form').submit(function(event){
  event.preventDefault();

  $('#enq-error').hide();
  $('#enq-success').hide();
  $('#enq-duplicate').hide();

   //Validate
  if($('input[name=email]').val() == ""){
    $('.formEmail').addClass('has-error');
    v2 = false;
  }else{
    if(isValidEmail($('input[name=email]').val())){
      v2 = true;
    }else{
      v2 = false;
    }  
  }
  if($('input[name=name]').val() == ""){
    $('.formName').addClass('has-error');
    v1 = false;
  }else{
    v1 = true;
  }
  if($('input[name=number]').val() == ""){
    $('.formNumber').addClass('has-error');
    v3 = false;
  }else{
    v3 = true;
  }
  if($('#enq').val() == ""){
    $('.formEnquiry').addClass('has-error');
    v4 = false;
  }else{
    v4 = true;
  }



  if(v1 && v2 && v3 && v4){
    validated = true;
  }else{
    validated = false;
    $('#enq-error').show();
  }

  if(validated){

    //Get form data
   var formData = {
            'name'              : $('input[name=name]').val(),
            'email'             : $('input[name=email]').val(),
            'number'            : $('input[name=number]').val(),
            'enquiry'           : $('#enq').val(),
            'response'          : ""
        };

    
    // Abort any pending postOne
    if (postOne) {
        postOne.abort();
    }

  
  console.log(formData);

  postOne = $.ajax({
        url: postOneURL,
        type: "post",
        data: formData
    });

    postOne.done(function (resp, textStatus, jqXHR){
          // show successfully for submit message
         
          var res = JSON.parse(resp); 
          console.log(res.msg);
          if(res.msg == "success"){

             $('#enq-success').show();
             $('#enquiry-form').trigger("reset");
          }
          if(res.msg == "fail"){

             $('#enq-duplicate').show();
             $('#enquiry-form').trigger("reset");
          }
         
     });

     /* On failure of postOne this function will be called  */
     postOne.fail(function (){

       // show error
      console.log("Error");

      
     });



  }
  

  



});

function isValidEmail(email) {
    var pattern = /^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
    return pattern.test(email);
};

});

