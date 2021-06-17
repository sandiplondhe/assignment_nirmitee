const express=require('express')
const router=express.Router();
const multer=require('multer');
const mongoose=require('mongoose');
const Product=require('./../models/Product');

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
      cb(null, './uploads/');
    },
    filename: function(req, file, cb) {
      cb(null, new Date().toISOString().replace(/[\/\\:]/g, "_") + file.originalname)
    }
  });
  const fileFilter = (req, file, cb) => {
    // reject a file
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
      cb(null, true);
    } else {
      cb(null, false);
    }
  };
  
  const upload = multer({
    storage: storage,
    limits: {
      fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
  });

// @get all product
router.get("/",async (req, res, next) => {
  await Product.find()
    .exec()
    .then(docs => {
      const response = {
        count: docs.length,
        products: docs.map(doc => {
          return {
            title: doc.title,
            category: doc.category,
            price: doc.price,
            selectedFile: doc.selectedFile,
            _id: doc._id,
          };
        })
      };
        res.status(200).json(response);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

// @store product data
router.post('/',upload.single('selectedFile'),async (req,res)=>{
    try {
      const product = new Product({
        _id: new mongoose.Types.ObjectId(),
        title: req.body.title,
        category: req.body.category,
        price: req.body.price,
        selectedFile: req.file.path 
       });
        await product.save()
        .then(result => {
          return res.status(201).json({
            message: "Created product successfully",
            success:true
          });
        })
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        message:"Unable to create product",
        success:false
    })
    }
})

// @remove product
router.delete("/:productId", async (req, res) => {
  const id = req.params.productId;
    await  Product.findOneAndDelete({ _id: id })
    .exec()
    .then(result => {
      return res.status(200).json({
          message: 'Product deleted',
      });
    })
    .catch(err => {
      console.log(err);
      return res.status(500).json({
        error: err
      });
    });
});

// @update product
router.patch("/:productId", async (req, res) => {
  const id = req.params.productId;
  const updateOps = {};
  for (const ops in req.body) {
    updateOps[ops.propName] = ops.value;
  }
  await Product.updateOne({ _id: id }, { $set: updateOps })
    .exec()
    .then(result => {
      return res.status(200).json({
          message: 'Product updated',
      });
    })
    .catch(err => {
      console.log(err);
      return res.status(500).json({
        error: err
      });
    });
});



module.exports=router;
