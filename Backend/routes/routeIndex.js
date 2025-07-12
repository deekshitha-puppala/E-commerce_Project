const express = require('express');
const router = express.Router();

const userRouter = require("./user");
const productRouter = require('./product');
const marketplaceRouter = require('./marketplace');
const imageUploadRouter = require('./Imageupload'); // <-- Add this line (ensure filename matches)
const fileUploadRouter = require('./Fileupload');
router.use('/product', productRouter);
router.use('/marketplace', marketplaceRouter);
router.use('/user', userRouter);
router.use('/image', imageUploadRouter); // <-- Mount your image upload route
router.use('/file',fileUploadRouter);
module.exports = router;
