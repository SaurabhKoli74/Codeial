const express = require('express');
const cookieparser  = require('cookie-parser');
const expressEjsLayouts = require('express-ejs-layouts');
const app = express();
const port = 8000;
const db = require('./config/mongoose');
//used for session cookie
const session = require('express-session');
const passport = require('passport');
const passportLocal =require('./config/passport-local-strategy');
const MongoStore = require('connect-mongo')(session); //Downgraded connect-mongo version to downgrade it to 3
//command - npm uninstall connect-mongo
// npm i connect-mongo@3



app.use(express.urlencoded());

app.use(cookieparser());



//to use static files such as css,js,images, fonts
app.use(express.static('./assets'));

//to implement layouts
app.use(expressEjsLayouts); 

//extract styles and scripts from sub-pages into the layout
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);




//use express router
//by default it takes './routes/index' so it is necessary to crete index.js in routes otherwise explicitally we have to mention it like ./routes/about so control will start from about 

//set up the view engine
app.set('view engine', 'ejs');
app.set('views', './views');


//mongo store is used to store the session cookie in the db
app.use(session({
    name:'codeial',
    //TODO change the secret before deployment in production mode
    secret:'blahsomething',
    saveUninitialized:false,
    resave:false,
    cookie:{
        maxAge:(1000*60*100)
    },
    store:new MongoStore({
        mongooseConnection:db,
        autoRemove:'disabled'
    },
    function(error){
        console.log(err || 'connect-mongodb setup ok');
    }
    )
}));


app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);

app.use('/', require('./routes'));
app.listen(port, function (err) {
    if (err) {
        // console.log("Error: ",err);
        console.log(`Error in running the server: ${err}`);
        //include var inside string is called interpolation
        return ;
    }

    console.log(`Server is running on port: ${port}`);
});