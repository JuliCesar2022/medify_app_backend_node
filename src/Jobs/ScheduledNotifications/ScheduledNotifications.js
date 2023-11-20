import NotificationsController from '../../Controllers/NotificationsController.js';
import { DBNames } from './../../db.js';
import moment from 'moment-timezone';


// import axios from 'axios';


class ScheduledNotifications {

    static async run(MongoClient, utcHour,min){

        let fechaActualColombia = moment.utc().day(0).hours(utcHour).minutes(min).tz('America/Bogota').format('ddd MMM D YYYY HH:mm:ss [GMT]ZZ');
        let fechaFormated = new Date(Date.parse(fechaActualColombia))

        console.log(fechaFormated)

       
       

        let fechaActual = fechaFormated
        let año = fechaActual.getFullYear();
        let mes = fechaActual.getMonth() + 1; 
        let dia = fechaActual.getDate();

        mes = mes < 10 ? '0' + mes : mes;
        dia = dia < 10 ? '0' + dia : dia;

        let fechaFormateada = año + '-' + mes + '-' + dia;

        console.log(fechaFormateada)

        let data = await MongoClient.collection(DBNames.medicamentos).find({
            iniciotratamiento: { $lte: fechaFormateada },
            fintratameinto: { $gte: fechaFormateada } 
          }).toArray();


        data.forEach( async medicamento => {
        
           const frecuencia = parseInt(medicamento.frecuencia);
           const id = parseInt(medicamento._id);
           console.log(id )
           let hora = medicamento.horaInicial.split(':');

           console.log(hora+"horaaaa")

                        console.log(parseInt(hora[0]))
                        console.log(fechaFormated.getHours())
                        console.log(parseInt(hora[1]))
                        console.log(fechaFormated.getMinutes())
                        
                       
                        if(parseInt(hora[0])=== fechaFormated.getHours() && parseInt(hora[1]) === fechaFormated.getMinutes() ){
                  const medicament= await MongoClient.collection(DBNames.medicamentos).updateOne({ _id: medicamento._id }, { $set: { 'horaInicial': parseInt(hora[0])+frecuencia+":"+hora[1]  } });
                  console.log('sonar');
                    const user_firebasetoken = await MongoClient.collection(DBNames.firebase_tokens).findOne({ user_id: parseInt(medicamento.usuario_id )});
                    NotificationsController.sendNotify(user_firebasetoken.firebase_token,medicamento.name, `${user_firebasetoken.name} recuerda tu medicamento ${medicamento.medicamento} a las ${medicamento.horaInicial}`)
                    

                }
                
            });
          
        
        
          
    }
    
 
}

export default ScheduledNotifications 