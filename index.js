const express = require('express');
const app = express();
const port = 8000;


app.listen(port,function(err){
    if(err){
        // console.log("Error: ",err);
        console.log(`Error in running the server: ${err}`);
        //include var inside string is called interpolation
    }

    console.log(`Server is running on port: ${port}`);
});