import ScheduledNotifications from './ScheduledNotifications/ScheduledNotifications.js';

class CronJobs {

    static async run(MongoClient, hour,min){
      
       try {
        ScheduledNotifications.run(MongoClient, hour,min)
       } catch (error) {
        console.log("[ERROR ScheduledNotifications]")
        // console.log(error)
       }

    }

}


export default CronJobs 