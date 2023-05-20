var express = require('express');
var router = express.Router();

// Require the controllers WHICH WE DID NOT CREATE YET!!
var mailSender_controller = require('../controllers/mailSender');


// a simple test url to check that all of our files are communicating correctly.


router.get('/test', mailSender_controller.test);
router.post('/', mailSender_controller.sendMail);
router.post('/confirmation-mail', mailSender_controller.sendConfirmationMail);
router.post('/reset-password', mailSender_controller.sendResetPasswordMail);





module.exports = router;