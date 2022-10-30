const {format}= require('timeago.js');


const helpers = {}

helpers.timeago = (timestamp) => {
   return format(timestamp);
};
helpers.ind=(value)=>{
   return Number(value + 1); //I needed human readable index, not zero based
};
helpers.time = (timestamp) => {
   const date = new Date(timestamp);
   return date.getDate() + "/"+ (date.getMonth() +1 ) + "/" + date.getFullYear() + " - " +date.toLocaleTimeString();
};

helpers.time2 = (timestamp) => {
   const date = new Date(timestamp);
   return date.getDate() + "/"+ (date.getMonth() +1 ) + "/" + date.getFullYear();
};
helpers.inde=(value)=>{
   return true(value == 1); //I needed human readable index, not zero based
}; 

helpers.eq= function(a, b) {
   return (a === b);
 };

 helpers.mym= function(a, b, c) {
   return (a > b && a<c);
 };

module.exports = helpers;