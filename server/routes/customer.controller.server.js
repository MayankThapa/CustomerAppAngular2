var Customer = require('../model/customer');
var express = require('express');
const router = express.Router();

router.post('/saveCustomer', function (req, res) {
    var customer = new Customer(req.body)
    customer.save(function (err, savedCustomer) {
        if (err) {
            res.status(400).send('Error occurred while creating Customer');
        } else {
            res.status(201).send(savedCustomer);
        }
    });

})

router.put('/editCustomer/:id', function (req, res) {
    Customer.findOneAndUpdate({ _id: req.params.id }, req.body, function (err, savedCustomer) {
        if (err) {
            res.status(400).send('Error occurred while creating Customer');
        } else {
            res.status(201).send(savedCustomer);
        }
    });

})

router.get('/getCustomers', function (req, res) {
    Customer.find()
        .sort('created_at')
        .exec(function (err, customer) {
            if (err) return res.send({ success: false, message: err })
            if (!customer) return res.send({ success: true, message: 'No customer Found' })
            res.send({ success: true, message: 'Data Found', data: customer })
        })

})

router.delete('/deleteCustomer/:id', function (req, res) {
    Customer.findOneAndRemove({ _id: req.params.id })
        .exec(function (err, customer) {
            if (err) return res.send({ success: false, message: err })
            if (!customer) return res.send({ success: true, message: 'No customer Found' })
            res.send({ success: true, message: 'Data Deleted', data: customer })
        })

})

router.get('/searchKeyword/:keyword', function (req, res) {
    Customer.find({ "name": { "$regex": req.params.keyword, "$options": "i" } })
        .exec(function (err, customers) {
            if (err) return res.send({ success: false, message: err })
            if (!customers) return res.send({ success: true, message: 'No customer Found' })
            res.send({ success: true, message: 'Data Found', data: customers })
        })

})

module.exports = router;