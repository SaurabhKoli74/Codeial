const express = require('express');
const expressEjsLayouts = require('express-ejs-layouts');
const app = express();
const port = 8000;

app.use(expressEjsLayouts);



//use express router
//by default it takes './routes/index' so it is necessary to crete index.js in routes otherwise explicitally we have to mention it like ./routes/about so control will start from about 
app.use('/', require('./routes'));

//set up the view engine
app.set('view engine', 'ejs');
app.set('views', './views');

app.listen(port, function (err) {
    if (err) {
        // console.log("Error: ",err);
        console.log(`Error in running the server: ${err}`);
        //include var inside string is called interpolation
        return ;
    }

    console.log(`Server is running on port: ${port}`);
});