var port = 8000,express = require('express'),app = express();
app.use('/',express.static(__dirname));
app.listen(port); 
