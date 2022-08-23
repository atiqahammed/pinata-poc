var express = require('express');
var bodyParser = require('body-parser');
const axios = require('axios');
var app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())
const PORT = process.env.PORT || 3000; 

// For testing purposes 
app.get("/", (req, res) => { 
    res.send("<h2>It's Working!</h2>"); 
}); 

app.post("/token", async (req, res) => { 
    console.log('here')
    console.log(req.body.code)

    const params = new URLSearchParams();
    params.append('code', req.body.code)
    params.append('grant_type', 'authorization_code')
    params.append('redirect_uri', 'https://qa.loungeatlas.com/Authentication/LifeMiles/Callback/');

    const url = 'https://sso.lifemiles.net/auth/realms/lifemiles-uat/protocol/openid-connect/token';

    const config = {
        headers: {
            Accept: '*/*',
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Basic aWVnLWxvdW5nZXM6ODE2NzRlM2UtOThhNi00ZGRiLTg5YTAtMTFjMTIzYmIxYmEy'
        }
    }

    let response = {}

    try {
        const result = await axios.post(url, params, config);
        console.log(result.data);
        response = result.data
    } catch(err) {
        response = {}
    }
    

    res.send(response); 
}); 

app.listen(PORT, () => { 
    console.log(`API is listening on port ${PORT}`);
});