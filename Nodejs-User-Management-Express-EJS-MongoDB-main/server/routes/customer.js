const express = require('express');
const router = express.Router();
const customerController = require('../controllers/customerController');
const methodOverride = require('method-override');

// Use methodOverride to support PUT and DELETE methods
router.use(methodOverride('_method'));

/**
 *  Customer Routes 
 */
router.get('/', customerController.homepage);
router.get('/about', customerController.about);
router.get('/add', customerController.addCustomer);
router.post('/add', customerController.postCustomer);
router.get('/view/:id', customerController.view);
router.get('/edit/:id', customerController.edit);
router.put('/edit/:id', customerController.editPost);
router.delete('/delete/:id', customerController.deleteCustomer);
router.post('/search', customerController.searchCustomers);

// Route for adding service descriptions to a customer's service history
router.post('/customer/:customerId/serviceDescription', customerController.addServiceDescription);
router.get('/customer/:customerId/serviceDescriptionHistory', customerController.getServiceDescriptionHistory);

// New route for navigating to the Banner.ejs file
router.get('/book/Banner', (req, res) => {
    const dynamicContent = "This is dynamic content"; // Example dynamic content
    res.render('book/Banner', { dynamicContent });
});

module.exports = router;
