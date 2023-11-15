import NotificationsController from '../../Controllers/NotificationsController.js';
import { DBNames } from './../../db.js';
import moment from 'moment-timezone';


// import axios from 'axios';


class ScheduledNotifications {

    static async run(MongoClient, utcHour){


        let fechaActual = new Date();
        let año = fechaActual.getFullYear();
        let mes = fechaActual.getMonth() + 1; 
        let dia = fechaActual.getDate();

        mes = mes < 10 ? '0' + mes : mes;
        dia = dia < 10 ? '0' + dia : dia;

        let fechaFormateada = año + '-' + mes + '-' + dia;

        let data = await MongoClient.collection(DBNames.medicamentos).find({
            iniciotratamiento: { $lte: fechaFormateada },
            fintratameinto: { $gte: fechaFormateada } 
          }).toArray();

       data.forEach(medicamento => {
           const frecuencia = parseInt(medicamento.frecuencia);
           let hora = medicamento.horaInicial.split(':');
           let horaProgramada = new Date();
           horaProgramada.setHours(hora[0], hora[1], 0); 
           
           const horasMedicamento = []; 
           
           while(horaProgramada.getDate() === new Date().getDate()) { 
            horasMedicamento.push(horaProgramada.toTimeString().substring(0, 5)); 
            horaProgramada.setHours(horaProgramada.getHours() + frecuencia); 
        }
        

            let dateInColombia = moment.utc().hours(utcHour).minutes(0).seconds(0).tz('America/Bogota').format('HH');

            horasMedicamento.forEach(async horaToma => {

                if(dateInColombia == horaToma.split(":")[0]){


                    console.log("Notificacion de tima a "+horaToma)
                    const user_firebasetoken = await MongoClient.collection(DBNames.firebase_tokens).findOne({ user_id: parseInt(medicamento.usuario_id )});
                    NotificationsController.sendNotify(user_firebasetoken.firebase_token,medicamento.name, `${user_firebasetoken.name} recuerda tu medicamento ${medicamento.name} a las ${horaToma}`)
                    

                }
                
            });
          });
        
        
          
    }
    
 
}

export default ScheduledNotifications 