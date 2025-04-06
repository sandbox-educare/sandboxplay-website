function demoForm(id) {
    var url = "https://us-central1-masterproject-a832a.cloudfunctions.net/sendEmail"

    var formElements = document.getElementById(id).elements;
    var postData = {};
    var xhr = new XMLHttpRequest();
    xhr.open("POST", url, true);
    var c1 = $('#pre').is(':checked')?"Preschool, " :""
    var c2 = $('#daycare').is(':checked')?"Daycare,":""
    var c3 = $('#other').is(':checked')?"Others, ":""
    postData['Services interested in']=c1+c2+c3;

    for (var i = 0; i < formElements.length; i++) {
        if (formElements[i].type != "submit") //we dont want to include the submit-buttom
         if(i>3)
            break;
            postData[formElements[i].name] = formElements[i].value;
        if ((formElements[i].type == "name" || formElements[i].type == "number") && (formElements[i].value == undefined || formElements[i].value == "")) {
            return;
        }
    }
    xhr.open("POST", url, true);
    console.log(JSON.stringify(postData, null, "\t"))
    var json = JSON.stringify(postData, null, "\t")
    json.replace(/\\"/g, "\uFFFF"); // U+ FFFF
    json = json.replace(/"([^"]+)":/g, '$1:').replace(/\uFFFF/g, '\\\"');
    console.log(json)
    xhr.send(JSON.stringify({   
     "toEmail":"amruta@sandboxcare.com",
    "ccEmail":"puja@sandboxcare.com,abhisha@sandboxcare.com,agarwal.sbh@gmail.com",
    "subject":"New Sandbox Query",
    "html":json


    }));
    window.alert("  Thank you for reaching out to us! We will reach out to you shortly.");

    // ipLookUp(postData)
    // $('#modal-register-2').modal('hide');

}

// function signUp() {
//     var formElements = document.getElementById("demoForm").elements;
//     var postData = {};
//     for (var i = 0; i < formElements.length; i++){
//         if (formElements[i].type != "submit")//we dont want to include the submit-buttom
//         { postData[formElements[i].name] = formElements[i].value;
//             if((formElements[i].type=="name" || formElements[i].type=="number") && ( formElements[i].value==undefined ||  formElements[i].value==""))
//             {
//                 return;
//             }
//         }
//     }


//         var xhr = new XMLHttpRequest();
//         xhr.open("POST", url, true);
//         xhr.send(JSON.stringify({
//             html: JSON.stringify(postData),
//             parentEmails:["agarwal.sbh@gmail.com"]

//         }));
//     ipLookUp(postData)
//     $('#modal-try').modal('hide');



// }

// document.addEventListener("DOMContentLoaded", function (event) {
//     setTimeout(function () {

//         var signup = document.getElementById("demo");
//         signup.click();
//     }, 10000);
// });


// function ipLookUp(postData) {
//     $.ajax('https://freegeoip.app/json/')
//         .then(
//             function success(response) {
//                 console.log('User\'s Location Data is ', response);
//                 console.log('User\'s Country', response.city);
//                 var xhr = new XMLHttpRequest();

//                 xhr.open("POST", "https://hooks.slack.com/services/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", true);
//                 xhr.send(JSON.stringify({
//                     text: 'Demo Request' + JSON.stringify(response) + JSON.stringify(postData)

//                 }));
//                 //  getAddress(response.lat, response.lon)
//             },

//             function fail(data, status) {
//                 console.log('Request failed.  Returned status of',
//                     status);
//             }
//         ).catch(function(error){
//             var xhr = new XMLHttpRequest();

//             xhr.open("POST", url, true);
//             xhr.send(JSON.stringify({
//                 text: 'Demo Request' + JSON.stringify(error) + JSON.stringify(postData),
//                  parentEmails:["agarwal.sbh@gmail.com"]

//             }));
//         })
// }

function getAddress(latitude, longitude) {
    $.ajax('https://maps.googleapis.com/maps/api/geocode/json?' +
            'latlng=' + latitude + ',' + longitude + '&key=' +
            GOOGLE_MAP_KEY)
        .then(
            function success(response) {
                console.log('User\'s Address Data is ', response)
            },
            function fail(status) {
                console.log('Request failed.  Returned status of',
                    status)
            }
        )
}