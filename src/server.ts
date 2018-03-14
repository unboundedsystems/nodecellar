import * as bodyParser from "body-parser";
import * as express from "express";
import * as http from 'http';
import * as logger from "morgan";
import * as path from 'path';
import * as wine from './routes/wines';

var app = express();

app.set('port', process.env.PORT || 3000);
app.use(logger('dev'));  /* 'default', 'short', 'tiny', 'dev' */
app.use(bodyParser()),
app.use(express.static(path.join(__dirname, '..', 'public')));

app.get('/wines', wine.findAll);
app.get('/wines/:id', wine.findById);
app.post('/wines', wine.addWine);
app.put('/wines/:id', wine.updateWine);
app.delete('/wines/:id', wine.deleteWine);

http.createServer(app).listen(app.get('port'), function () {
    console.log("Express server listening on port " + app.get('port'));
});
