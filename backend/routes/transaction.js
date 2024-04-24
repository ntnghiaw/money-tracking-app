const express = require('express');
const router = express.Router();

router.post('/ocr', async (req, res) => {
    const imageUrl = req.query.imageUrl;
    const options = {
        method: 'POST',
        headers: {
          accept: 'application/json',
          'content-type': 'application/json',
          apikey: '8f7d0240f8a911ee9433edbb2578dfab'
        },
        body: JSON.stringify({
          headers: {'x-custom-key': 'string'},
          refresh: false,
          incognito: false,
          extractTime: false,
          url: imageUrl
        })
      };
    
    fetch('https://api.taggun.io/api/receipt/v1/verbose/url', options)
        .then(response => response.json())
        .then(result => res.json(result.totalAmount))
        .catch(err => console.error(err));
  
   
  });

module.exports = router;
