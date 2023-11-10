



const socket = io()
const userId= 1;
const nombre = 'juancho' 
const FirebaseToken= "rteyuwioqpoeiruyurieopw´qwpeoiruytrueiowpqwoeiruyturieowpqwoeirutyurieowpoeiruytrueiwopqwoeirutyurieowpoeirutyurieowpeorituyg";


socket.emit('client:iniEmit:conection',{userId : userId, FirebaseToken , nombre})
socket.on('server:refresh:mensajes',(data)=>{
   render(data)
   
})

function submit_message(){
    message = document.getElementById("message").value
    socket.emit('client:send:message',{"mensaje": message,"nombre": "juana"})
    document.getElementById("message").value = ''

}


function render(data){
    document.getElementById("body").innerHTML= ''
    
    data.forEach(element => {
        document.getElementById("body").innerHTML+=  `${element.mensaje} </br>`
    });


   
}