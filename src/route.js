
import CronJobs from './Jobs/CronJobs.js';
import moment from "moment";
import cron from 'node-cron';
import SessionsController from './Controllers/SessionsController.js';
import { set } from 'mongoose';


export default (app, MongoClient) => {

  // app.get('/professions',  async (req, res) => ProfessionsController.getProfessions(MongoClient,req,res))
  // app.post('/createSheduledNotification',validationMiddleware,  async (req, res) => ProfessionsController.createSheduledNotification(MongoClient,req,res))
  
  app.get('/ping', async function (req, res) {
    return res.send(true)
  })
  


  async function validationMiddleware(req, res, next) {

    console.log("validationMiddleware");
    try {
      let session = await SessionsController.getCurrentSession(MongoClient, req)
      if (session) {
        return next()
      }
    } catch (error) {
      return res.status(404).send('BAD_REQUEST');
    }
    return res.status(404).send('BAD_REQUEST');
  }
  let formattedTime = parseInt(moment.utc().startOf('day').local().format('HH'))
  let formattedTimeMin = parseInt(moment.utc().startOf('hour').local().format('mm'))
  let UTCRangeTimeInvert = []
  let UTCRangeTimeInvertTime = []

  for ( let i = 0; i <= 23 ; i++ ){

    if(formattedTime > 23){
      formattedTime = 0;
    }

    UTCRangeTimeInvert[i] = {formattedTime,utc_hour:i};
    formattedTime++;

  }
  

  for (let i = 0; i < 60; i++) {
    if(formattedTimeMin >= 60){
        formattedTimeMin = 0;
    }
    UTCRangeTimeInvertTime[i] = {formattedTimeMin, utc_minute: i};
    formattedTimeMin++;
}


  // console.log(UTCRangeTimeInvert);
  UTCRangeTimeInvert.forEach(function(valor, clave) {

    UTCRangeTimeInvertTime.forEach(function(value,clave){

  
      cron.schedule(`${value.formattedTimeMin} ${valor.formattedTime} * * *`, () => {
        
        CronJobs.run(MongoClient,valor.formattedTime+5,value.formattedTimeMin);
      });
      
    });
    
    
  }
  
  );
  
  CronJobs.run(MongoClient,5,3);
 
  


  async function validationMiddleware(req, res, next) {
    try {
      let session = await SessionsController.getCurrentSession(MongoClient, req)
      if (session) {
        return next()
      }
    } catch (error) {
      return res.status(404).send('BAD_REQUEST');
    }
    return res.status(404).send('BAD_REQUEST');
  }


 
}


