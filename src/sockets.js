import { MONGODB_URI, MONGODB_NAME } from './config.js'
import { ServerApiVersion, ObjectId } from 'mongodb';
import { DBNames } from './db.js';
import NotificationsController from './Controllers/NotificationsController.js';


export default (io,MongoClient) => {

    const changeStream = MongoClient.collection("mensajes").watch();

    changeStream.on('change', async (change) => {

      let mensajes= await  getMessage(MongoClient) 
      console.log(change.fullDocument);

      io.emit(`server:refresh:mensajes`, mensajes); 

      // Eviar a firebase los que no estan conectados

      let  disconnectUsers=  await MongoClient.collection(DBNames.config_chat_users).find({status: false}).toArray()

      disconnectUsers.forEach(user => {
        NotificationsController.sendNotify(user.FirebaseToken,user.nombre, change.fullDocument.mensaje)
      });


 
    });
    

    io.on('connection', async (socket) => {
      let data = null
      
      socket.on('client:iniEmit:conection', async(datal)=>{

        data = datal
        setConectionByUserId(MongoClient,data,true)
      })

      socket.on('client:send:message',async(data)=> {

        await MongoClient.collection(DBNames.mensajes).insertOne(data);



      } )
      // cambiar un campo en mongo conected true
      
      // socket.emit('', {


      // })

      // socket.on('', async ( data )=>{ })


      console.log('conectado....')
     
      let mensajes= await  getMessage(MongoClient) 
      
      
      socket.emit('server:refresh:mensajes', mensajes)

      



    

      socket.on('disconnect', () => {

        setConectionByUserId(MongoClient,data,false)  

              // cambiar un campo en mongo conected false


        console.log('Client disconnected');
        // Realizar acciones adicionales si es necesario
      });

    
    },
    
     
    )



    async function getMessage(MongoClient ){

      let messages = await MongoClient.collection(DBNames.mensajes).find({}).toArray()
     
      return messages;
  
  }
  async function setConectionByUserId( MongoClient,data, status) {

     console.log(data)

    const item = await MongoClient.collection(DBNames.config_chat_users).findOne({ userId: data.userId });


    // console.log(item)
    if (!item) {
      const newUser = {
        ...data,
        status
      };
      await MongoClient.collection(DBNames.config_chat_users).insertOne(newUser);
      return true;
    }

    return await MongoClient.collection(DBNames.config_chat_users).updateOne({ userId: data.userId }, { $set: { status, FirebaseToken: data.FirebaseToken } });

  }
  
}