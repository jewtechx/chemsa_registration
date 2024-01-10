require("dotenv").config();
const XMLhttpRequest = require("xhr2");

function sendSMS(phone: string, message: string) {
  try {
    //  var xhr = new XMLHttpRequest();
    const request = new XMLhttpRequest();
    require("dotenv").config();

    request.open("POST", "https://api.wittyflow.com/v1/messages/send");

    request.setRequestHeader("Content-Type", "application/json");

    request.onreadystatechange = function () {
      if (this.readyState === 4) {
        console.log("Status:", this.status);
        console.log("Headers:", this.getAllResponseHeaders());
        console.log("Body:", this.responseText);
      }
    };

    const body = {
      from: "PHYSAG-UG",
      to: phone,
      type: "1", // <!-- use 0 for flash sms and 1 for plain sms -->
      message: message,
      app_id: "412bd436-960d-4689-815e-9987c2a6ade0" || process.env.APP_ID,
      app_secret:
        "9rPAgJVRLHw2ENqzawVoBN3xrs1C5ZS9205inpBnU9Y" || process.env.APP_SECRET,
    };

    request.send(JSON.stringify(body));
  } catch (e) {
    throw e;
  }
}

export default sendSMS;
