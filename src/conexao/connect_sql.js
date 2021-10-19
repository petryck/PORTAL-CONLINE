const Connection = require('tedious').Connection;  

module.exports = {
    
    conecta_sql(){
    var config = {  
    server: 'CONLINE.SQL.HEADCARGO.COM.BR',
    authentication: {
        type: 'default',
        options: {
            userName: 'hc_conline_consulta', //update me
            password: '85DF158A-55ED-42EA-A7DA-F859E6B6D6EA'  //update me
        }
    },
    options: {
        // If you are on Microsoft Azure, you need encryption:
        // encrypt: false,
        rowCollectionOnDone: true,
        "port": 9322,
        database: 'headcargo_conline' ,
    }
};  
CONEXA_HEAD = new Connection(config);  


// CONEXA_HEAD.connect();

CONEXA_HEAD.connect(function(err) {
      
    if(err){
        console.log("ERRO AO ACESSAR DB --> SQLSERVER");   
      setTimeout(conecta_sql, 2000);
    }else{
        console.log('CONECTADO DB --> SQLSERVER')
      
    }

  }); 

//   CONEXA_HEAD.on('error', function(err) {
//     conecta_sql(); 
//   })

  
  
    }

    
}