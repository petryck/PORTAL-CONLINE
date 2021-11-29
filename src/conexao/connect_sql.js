const Connection = require('tedious').Connection;  

module.exports = {
    
    conecta_sql(){
    var config = {  
    server: 'CONLINE.SQL.HEADCARGO.COM.BR',
    authentication: {
        type: 'default',
        options: {
            userName: 'hc_conline_consulta', //update me
            password: '3C23D35C-84F4-4205-80A2-D59D58A81BEF'  //update me
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