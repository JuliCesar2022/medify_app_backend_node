import NotificationsController from '../../Controllers/NotificationsController.js';
import { DBNames } from './../../db.js';
// import axios from 'axios';


class ScheduledNotifications {

    static async run(MongoClient, hour){

        // Obtén la fecha actual
        let fechaActual = new Date();

        // Formatea la fecha al formato 'AAAA-MM-DD'
        let año = fechaActual.getFullYear();
        let mes = fechaActual.getMonth() + 1; // getMonth() devuelve un índice basado en 0, así que suma 1
        let dia = fechaActual.getDate();

        // Asegúrate de que el día y el mes sean de dos dígitos
        mes = mes < 10 ? '0' + mes : mes;
        dia = dia < 10 ? '0' + dia : dia;

        // Construye la cadena de fecha
        let fechaFormateada = año + '-' + mes + '-' + dia;

        let data = await MongoClient.collection(DBNames.medicamentos).find({
            iniciotratamiento: { $lte: fechaFormateada },
            fintratameinto: { $gte: fechaFormateada } // Asegúrate de corregir la ortografía en tu base de datos.
          }).toArray();

       

        
        //   console.log(tokens);
        

        // console.log(data);

       



     
                    
      
        

    }
    
 
}

export default ScheduledNotifications 