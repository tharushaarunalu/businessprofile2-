// Import express and your controller
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

// New route for navigating to the Banner.ejs file (login and register)
router.get('/book/login', (req, res) => {
    const dynamicContent = "This is dynamic content"; // Example dynamic content
    res.render('book/login', { dynamicContent });
});

router.get('/book/register', (req, res) => {
    const dynamicContent = "This is dynamic content"; // Example dynamic content
    res.render('book/register', { dynamicContent });
});

// Update the Courses route to render the correct view
router.get('/src/courses/courses', (req, res) => {
    const dynamicContent = "This is dynamic content"; // Example dynamic content
    res.render('src/courses/courses', { dynamicContent }); // Corrected the view path
});

// Route to render the courses page
router.get('/courses', (req, res) => {
    res.render('courses'); // Assuming 'courses.ejs' is in the views directory
});



module.exports = router;
