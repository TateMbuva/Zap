$(document).ready(function() {

$('#list-container').hide();
$('.list-header').hide();
var ft;

//Form Variables
var loginURL = "http://localhost:8888/Zap-v3/api/enquiries/login.php";
var targetURL = "http://localhost:8888/Zap-v3/api/enquiries/getAll.php";
var request;
var validated = false;

$('#login-form').submit(function(event){
  event.preventDefault();

  //Validate
  if($('input[name=email]').val() == ""){
    $('.form-email').addClass('has-error');
    validated = false;
  }else{


    if($('input[name=password]').val() == ""){
    $('.form-password').addClass('has-error');
    validated = false;
  }else {
    if(isValidEmail($('input[name=email]').val())){
      validated = true;
    }
    else {
      validated = false;
      $('.form-email').addClass('has-error');

    }
  }



  }

  




if(validated){

  //Get form data
   var formData = {
          
            'email'             : $('input[name=email]').val(),
            'password'           : $('input[name=password]').val()
        };
      
    
    // Abort any pending request
    if (request) {
        request.abort();
    }

  
  //console.log(formData);

  request = $.ajax({
        url: loginURL,
        type: "post",
        data: formData
    
    });

    request.done(function (response, textStatus, jqXHR){
          // show successfully for submit message
          var resp = JSON.parse(response);
          console.log(resp.msg);

          if(resp.msg == "success"){


            $('#login-container').hide();
            $('.login-header').hide();
            $('#list-container').show();
            $('.list-header').show();

            renderList();

          }else{

          }
           
     });

     /* On failure of request this function will be called  */
     request.fail(function (){

       // show error
      console.log("Error");

      
     });

}
  

  



});

function renderList(){

  var req;

  req = $.ajax({
        url: targetURL,
        type: "get"
    
    });
    req.done(function (response, textStatus, jqXHR){
          
          var container = $('#list-container');
          console.log(response);

          $.each(JSON.parse(response), function(index, enq){
          
          var card = $('<div></div>');
          card.addClass('panel panel-default');

          var cardHeader = $('<div></div>');
          cardHeader.addClass('panel-heading');
          var cardTitle = $('<h3>' + enq.email + '<h3>');
          cardTitle.addClass('panel-title');
          cardHeader.append(cardTitle);

          var cardBody = $('<div></div>');
          cardBody.addClass('panel-body');
          cardBody.append('<h4>Enquiry</h4>');
          cardBody.append('<p>' + enq.enquiry + '</p>');

          var cardFooter = $('<div></div>');
          cardFooter.addClass('panel-footer');
          if(enq.response == "" || enq.response == null ){
            var respBtn = $('<button type="button" class="btn btn-default btn-resp">Respond</button>');
            cardFooter.append(respBtn);
          } else {

            cardFooter.append('<h5>Response</h5>');
            cardFooter.append('<p>' + enq.response + '</p>');


          }


          card.append(cardHeader);
          card.append(cardBody);
          card.append(cardFooter);
          container.append(card);
          });
          
     });

     /* On failure of request this function will be called  */
     req.fail(function (){

       // show error
      console.log("Error");

      
     });


};

function isValidEmail(email) {
    var pattern = /^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
    return pattern.test(email);
};

var respForm = $('<form id="respForm"></form>');
var formGrp = $('<div class="form-group"></div>');
var formlabel = $('<label for="resp" class="control-label">Response</label>');
var formInput = $('<textarea class="form-control" name="resp" rows="3" id="txtResp"></textarea>');
var submitBtn = $('<button type="submit" class="btn btn-default">Send Response</button>');
formGrp.append(formlabel);
formGrp.append(formInput);
respForm.append(formGrp);
respForm.append(submitBtn);


$('body').on('click', '.btn-resp',function(){


  
  var footer = $(this).parent();
  ft = footer;
  footer.html(respForm);
  var email = footer.parent().find('.panel-title').text();
  console.log(email);
  initForm(email);


  //sendResp(email);


     
});

function initForm(em){
  var email = em;
  $('#respForm').submit(function(event){


  event.preventDefault();
  console.log('submit');

  var respUrl = "http://localhost:8888/Zap-v3/api/enquiries/respond.php";

  var reqResp;
  if(email != ""){

    var formData = {

            'email' : email,
            'response' : $('#txtResp').val(),
            
        };

    
    // Abort any pending postOne
    if (reqResp) {
        reqResp.abort();
    }

    reqResp = $.ajax({
        url: respUrl,
        type: "post",
        data: formData
      });
    reqResp.done(function (response, textStatus, jqXHR){

      var res = JSON.parse(response);
      console.log(res);
      if(res.msg == "success"){
        getNewResponse(email);
      }

      
     });
    reqResp.fail(function (){

      console.log("Error");

     });



  }


  });

};

function getNewResponse(email){

 

  var respUrl = "http://localhost:8888/Zap-v3/api/enquiries/getOne.php";

  var reqResp;
  if(email != ""){

    var formData = {

            'email' : email
            
        };

    
    // Abort any pending postOne
    if (reqResp) {
        reqResp.abort();
    }

    reqResp = $.ajax({
        url: respUrl,
        type: "post",
        data: formData
      });
    reqResp.done(function (response, textStatus, jqXHR){

      var res = JSON.parse(response);
      console.log(res);
      if(res.response){

        console.log(res.response);
        ft.html('<h4>Response</h4>');
        ft.append('<p>' + res.response + '</p>');

      }
      

      
     });
    reqResp.fail(function (){

      console.log("Error");

     });



  }

};


});

