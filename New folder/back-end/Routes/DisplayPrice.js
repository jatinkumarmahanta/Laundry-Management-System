const express = require('express');
const Request = require('../models/Request');
const router = express.Router();


router.post('/price', (req, res) => {
    try {
        res.send([global.price])
        // console.log(global.price.map(item => item));
    } catch (error) {
        console.error(error.message);
        res.send("server error");
    }
})
router.get('/price', (req, res) => {
    try {
        res.send([global.price])
        // console.log(global.price.map(item => item));
    } catch (error) {
        console.error(error.message);
        res.send("server error");
    }
})

router.get('/request', (req, res) => {
    try {
        res.send([global.request])

    } catch (error) {
        console.error(error.message);
        res.send("server error");
    }
})



router.post('/requestStatus', (req, res) => {
    try {
        res.send([global.request])

    } catch (error) {
        console.error(error.message);
        res.send("server error");
    }
})
router.get('/aprovedRequest', (req, res) => {
    try {
        res.send([global.request])

    } catch (error) {
        console.error(error.message);
        res.send("server error");
    }
})

router.put('/request/:id', async (req, res) => {
    try {
      const requestId = req.params.id;
      const request = await Request.findById(requestId);
  
      if (!request) {
        return res.status(404).json({ error: 'Request not found' });
      }
  
      request.paid = true;
      request.total = 0;
  
      await request.save();
  
      res.json(request);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Server error' });
    }
  });
  
  
  
// const express = require('express');
// const router = express.Router();
router.put('/updateRequest/:id', async (req, res) => {
    const { id } = req.params;
    const request = await Request.findById(id);
  
    if (!request) {
      return res.status(404).json({ success: false, message: 'Request not found' });
    }
  
    Object.assign(request, req.body); // Update the request object with the new data
  
    try {
      const updatedRequest = await request.save(); // Save the updated request object
  
      return res.status(200).json({ success: true, message: 'Request updated successfully', data: updatedRequest });
    } catch (error) {
      console.error(error.message);
      return res.status(500).json({ success: false, message: 'Server error' });
    }
  });
  


module.exports = router;


