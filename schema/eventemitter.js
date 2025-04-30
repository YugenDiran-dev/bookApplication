const EventEmitter = require("events")
const EmailManage = new EventEmitter();


EmailManage.on('sendmail', (email, sub, msg) => {

})

module.exports = MyEmitter;













/**class MyEmitter extends EventEmitter{
    constructor(supply){
        super()
        this.supply = supply;
    }

    sendmail(email,sub,msg){
        if(this.supply>0){
            this.supply = this.supply - 1
            this.emit('sendmail',email,sub,msg,Date.now())
            return;
        }
        this.emit('error', new Error("No chance to send mail"));
    }

}; */