function Faccina (step) {
   this.status = [':\'(',':(',':|',':)',':O'];
   this.step = step;
 };

 Faccina.prototype.getStatus = function(value) {
   if(value==null)
     return ':X'

   var offset = Math.round(value / this.step)+2;

   if(offset>4) {
     return this.status[4]
   } else if(offset<0) {
     return this.status[0]
   }

   return this.status[offset]
 }

module.exports = Faccina;
