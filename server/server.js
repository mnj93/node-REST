const express =  require('express');
const bodyParser =  require('body-parser');

const expressValidation = require('express-validation');
require('dotenv').config();
const db = require('./config/db');
const app = express();
app.use(bodyParser.json());
app.use(function (req, res, next) {  
    res.header("Access-Control-Allow-Origin", "*");  
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");  
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, contentType,Content-Type, Accept, Authorization");  
    next();  
});  
const server = app.listen(process.env.PORT || 4001,()=>{    
    console.log('App now running on port ',server.address().port);
    //console.log(process.env.NODE_ENV);
});

require('./routes')(app);

 //error handler
 app.use(function(err, req, res, next) {
    if(process.env.NODE_ENV === 'production'){
        res.status(err.status || 500).send({
            success: "false",
            msg: 'Internal Server Error!',  
            data:[]          
        });
    }
    else{       
        if (err instanceof expressValidation.ValidationError) {
            console.log(err);
            res.status(err.status || 500).send({
                success: "false",
                msg: (err.errors[0].messages[0]),  
                data:[]          
            });
        }
        else{
            console.log('Error Message : '+err.stack);     
            res.status(err.status || 500).send({
                success: "false",
                msg: err.message,  
                data:[]          
            });
        }       
    }
    
  });