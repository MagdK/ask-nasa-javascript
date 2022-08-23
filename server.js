const express = require('express');
const app = express();


const myLogger = function (req, res, next) {
	console.log(req.path)
	next()
}

app.use(myLogger);

app.use(express.static('public'));

app.listen(process.env.PORT || 9000);