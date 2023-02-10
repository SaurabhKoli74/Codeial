const express = require('express');
const expressEjsLayouts = require('express-ejs-layouts');
const app = express();
const port = 8000;
const db = require('./config/mongoose');

//to use static files such as css,js,images, fonts
app.use(express.static('./assets'));

//to implement layouts
app.use(expressEjsLayouts); 

//extract styles and scripts from sub-pages into the layout
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);




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