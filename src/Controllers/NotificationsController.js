import http from 'axios';
import { DBNames } from './../db.js';
import moment from "moment";




class NotificationsController {


    static async sendNotify( fcmToken, title, body, tipo = "comun") {

        console.log("#SEND title:"+title)
        console.log("body:"+body)
        const data = {
            rules_version: '2',
            notification: {
                body: body,
                title: title
            },
            priority: 'high',
            data: {
                click_action: 'FLUTTER_NOTIFICATION_CLICK',
                body: body,
                title: title,
                data: {},
                tipo: tipo
            },
            to: fcmToken
        };

        const headers = {
            'Authorization': `key=AAAAQQ_D-No:APA91bGW34jahmFD4Sic-q0eAP-S79Nq2ysoymMTzFSggByUfndYbMGCKB4waRtztS4xiFHS9TsF6jQEl4Z9c41OP--WEr2lKVBdcBH4KJ26VxQr8bSI4YspjHLTY0m4Ohfh93A8414Y`,
            'Content-Type': 'application/json'
        };

       console.log(await http.post(`https://fcm.googleapis.com/fcm/send`, data, { headers: headers })) 
        

    }

}


export default NotificationsController 