// import {  connect } from 'mongoose';
import { MONGODB_URI } from './config.js'
import { MongoClient, ServerApiVersion } from 'mongodb';


export class DBNames {

    static firebase_tokens = "firebase_tokens";
    static mensajes = "mensajes";
    static config_chat_users = "config_chat_users";
    static medicamentos = "medicamentos";
    static UserCopy = "UserCopy";
    static sessionTokens = "session_tokens";
    
} 

export const connectDB = async ( onConnect ) => {


    try {

        const Mongoclient = new MongoClient(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

        return Mongoclient.connect(async err => {
           
            if(onConnect){
                onConnect(Mongoclient)
            }
            
        })
        
        
    } catch (error) {

        console.log(error)
        
    }

}