



const socket = io()
const userId= "1";    
const nombre = 'juancho' 
const FirebaseToken= "ruytrueiwopqwoeirutyurieowpoeirutyurieowpeorituyg";
const foto = 'https://d2v9ipibika81v.cloudfront.net/uploads/sites/104/2016/07/27885117831_d39c4bf5c8_k-1140x684.jpg'


socket.emit('client:iniEmit:conection',{userId : userId, FirebaseToken , nombre})
socket.on('server:refresh:mensajes',(data)=>{
   render(data)
   
})

function submit_message(){
    message = document.getElementById("message").value
    socket.emit('client:send:message',{"mensaje": message,"nombre": "juana",foto:foto})
    document.getElementById("message").value = ''

}


function render(data){
    document.getElementById("body").innerHTML= ''
    
    data.forEach(element => {
        document.getElementById("body").innerHTML+=  `${element.mensaje} </br>`
    });


   
}