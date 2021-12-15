let keys = {};
if (process.env.NODE_ENV !== "production") {
  console.log("\x1b[34m%s\x1b[0m", "Set Production Config");
  keys = {
    socketUrl: "http://localhost:2058/",
    imageUrl: "http://localhost:2058/",
    baseUrl: "http://localhost:2058/",
    Recaptchakey: "6LdpeoQUAAAAAHwFEDfpcA-W5-leSH8548lZWWeb", //local/Sitekey
    frontUrl: "http://localhost:3001/",
  };
} else {
  console.log("\x1b[34m%s\x1b[0m", "Set Development Config");
  keys = {
    socketUrl: "http://localhost:2058/",
    imageUrl: "http://localhost:2058/",
    baseUrl: "http://localhost:2058/",
    Recaptchakey: "6LdpeoQUAAAAAHwFEDfpcA-W5-leSH8548lZWWeb", //local/Sitekey
    frontUrl: "http://localhost:3001/",
  };
}

function numberWithCommas(x){
  // var pricevalue = x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  // return pricevalue;
  return parseFloat(x).toLocaleString('en') 

}


export default keys;
export {
  numberWithCommas
}
