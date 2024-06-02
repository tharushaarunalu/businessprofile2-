const Customer = require('../models/Customer');

exports.homepage = async (req, res) => {
  const messages = await req.flash('info');

  const locals = {
    title: 'NodeJs',
    description: 'Free NodeJs User Management System',
  };

  let perPage = 12;
  let page = req.query.page || 1;

  try {
    const customers = await Customer.aggregate([{ $sort: { createdAt: -1 } }])
      .skip(perPage * page - perPage)
      .limit(perPage)
      .exec();
    const count = await Customer.countDocuments({});

    res.render('index', {
      locals,
      customers,
      current: page,
      pages: Math.ceil(count / perPage),
      messages,
    });
  } catch (error) {
    console.log(error);
  }
};

exports.about = async (req, res) => {
  const locals = {
    title: 'About',
    description: 'Free NodeJs User Management System',
  };

  try {
    res.render('about', locals);
  } catch (error) {
    console.log(error);
  }
};

exports.addCustomer = async (req, res) => {
  const locals = {
    title: 'Add New Customer - NodeJs',
    description: 'Free NodeJs User Management System',
  };

  res.render('customer/add', locals);
};

exports.postCustomer = async (req, res) => {
  console.log(req.body);

  const newCustomer = new Customer({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    tel: req.body.tel,
    email: req.body.email,
    vehicleNumber: req.body.vehicleNumber,
    vehicleType: req.body.vehicleType,
    vehicleModel: req.body.vehicleModel,
    details: req.body.details,
  });

  try {
    await newCustomer.save();
    await req.flash('info', 'New customer has been added.');

    res.redirect('/');
  } catch (error) {
    console.log(error);
  }
};

exports.view = async (req, res) => {
  try {
    const customer = await Customer.findById(req.params.id);

    const locals = {
      title: 'View Customer Data',
      description: 'Free NodeJs User Management System',
    };

    res.render('customer/view', {
      locals,
      customer,
    });
  } catch (error) {
    console.log(error);
  }
};

exports.edit = async (req, res) => {
  try {
    const customer = await Customer.findById(req.params.id);

    const locals = {
      title: 'Edit Customer Data',
      description: 'Free NodeJs User Management System',
    };

    res.render('customer/edit', {
      locals,
      customer,
    });
  } catch (error) {
    console.log(error);
  }
};

exports.editPost = async (req, res) => {
  try {
    await Customer.findByIdAndUpdate(req.params.id, {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      tel: req.body.tel,
      email: req.body.email,
      vehicleNumber: req.body.vehicleNumber,
      vehicleType: req.body.vehicleType,
      vehicleModel: req.body.vehicleModel,
      details: req.body.details,
      updatedAt: Date.now(),
    });
    await res.redirect(`/edit/${req.params.id}`);

    console.log('redirected');
  } catch (error) {
    console.log(error);
  }
};

exports.deleteCustomer = async (req, res) => {
  try {
    await Customer.deleteOne({ _id: req.params.id });
    res.redirect('/');
  } catch (error) {
    console.log(error);
  }
};

exports.searchCustomers = async (req, res) => {
  const locals = {
    title: 'Search Customer Data',
    description: 'Free NodeJs User Management System',
  };

  try {
    let searchTerm = req.body.searchTerm;
    const searchNoSpecialChar = searchTerm.replace(/[^a-zA-Z0-9 ]/g, '');

    const customers = await Customer.find({
      $or: [
        { firstName: { $regex: new RegExp(searchNoSpecialChar, 'i') } },
        { lastName: { $regex: new RegExp(searchNoSpecialChar, 'i') } },
        { vehicleNumber: { $regex: new RegExp(searchNoSpecialChar, 'i') } },
        { vehicleType: { $regex: new RegExp(searchNoSpecialChar, 'i') } },
        { vehicleModel: { $regex: new RegExp(searchNoSpecialChar, 'i') } },
      ],
    });

    res.render('search', {
      customers,
      locals,
    });
  } catch (error) {
    console.log(error);
  }
};

exports.getServiceDescriptionHistory = async (req, res) => {
  try {
    const customer = await Customer.findById(req.params.customerId);
    res.json(customer.serviceHistory || []);
  } catch (error) {
    console.error('Error fetching service description history:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.addServiceDescription = async (req, res) => {
  try {
    const { customerId } = req.params;
    const { serviceDescription, servicePrice } = req.body;

    const customer = await Customer.findById(customerId);
    if (!customer) {
      return res.status(404).json({ message: 'Customer not found' });
    }

    customer.serviceHistory.push({
      description: serviceDescription,
      price: servicePrice,
      date: new Date(),
    });

    await customer.save();
    res.status(200).json({ message: 'Service description added', serviceHistory: customer.serviceHistory });
  } catch (error) {
    console.error('Error adding service description:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }

  // customer.js

const express = require('express');
const router = express.Router();



module.exports = router;

};
