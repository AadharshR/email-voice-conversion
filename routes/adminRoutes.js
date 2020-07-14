const  express = require( 'express');
const adminController = require('../controllers/adminController')
const verifyAuth = require('../middleware/verifyAuth')
const router = express();
router.post('/admin/',verifyAuth, adminController.createAdmin)
router.put('/admin/:id',verifyAuth, adminController.updateUserToAdmin)
module.exports = router;