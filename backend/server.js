const express = require('express');
const cors = require('cors');
const multer = require('multer');
const bodyParser = require('body-parser');
const { adminLogin, fetchAdmin, } = require('./DAO/entities/Admin/adminRepo');
const { customerLogin, addCustomer, getCustomerDetailsById, placeOrder } = require('./DAO/entities/Customer/customerRepo');
const {  addClothes,getPaymentData, getAllBrands,getAllOrders,updateOrder,getOrdersByCustomerId, getAllProductsWithImages, updateProductAdmin } = require('./DAO/entities/Clothes/clotheRepo');
const { database } = require('./DAO/entities/Collection');
const { GridFSBucket } = require('mongodb');
const { Readable } = require('stream');



const app = express();
const upload = multer();
const ImageUpload = multer({ dest: 'uploads/' });
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());




app.post("/loginAdmin",upload.any(), async (req,res) => {
    const  { mail,password} = req.body;
    console.log("adminLogin : ",mail,password)
    const data = await adminLogin({ mail,password} )
    res.json({...data});
})

app.post("/getAdminDetailsById",upload.any(), async (req,res) => {
    const  { id} = req.body;
    console.log("adminLogin : ",id)
    const data = await fetchAdmin({ id} )
    res.json({...data});
})

app.post("/loginCustomer",upload.any(), async (req,res) => {
    const  { mail,password} = req.body;
    console.log("customerLogin : ",mail,password)
    const data = await customerLogin({ mail,password} )
    res.json({...data});
})

app.post("/getCustomerDetailsById",upload.any(), async (req,res) => {
    const  { id } = req.body;
    console.log("customer fetch : ",id)
    const data = await getCustomerDetailsById({ id} )
    res.json({...data});
})





app.post("/addCustomer",upload.any(), async (req,res) => {
    const  {  mail, password,phone,street,city,country,pin,state,firstname, lastname } = req.body;
    console.log("register customer : ",{  mail, password,phone,street,city,country,pin,state,firstname, lastname })
    const data = await addCustomer({  mail, password,phone,street,city,country,pin,state,firstname, lastname })
    res.json({...data});
});



app.post('/addProduct',ImageUpload.single('productImage'),async (req, res) => {


    let  fileId = "";
    const bucket = new GridFSBucket(database, {
        bucketName: 'uploads'
      });
    
      if (!req.file) {
        return res.status(400).send('No file uploaded.');
      }
    
      const file = req.file;
      const readableStream = require('fs').createReadStream(file.path);
    
      // Store file in GridFS
      const uploadStream = bucket.openUploadStream(file.originalname);
      readableStream.pipe(uploadStream);
    
      uploadStream.on('finish',async () => {
        fileId = uploadStream.id;
        const { title, description,color, price, company, quantity, sizes, brand } = req.body;
        const timestamp = new Date();
    
        
        const productData = {
            title,
            description,
            price,
            company,
            quantity,
            sizes,
            brand,
            img: fileId,
            'color':color, 
        };

        const data = await addClothes({...productData});
    res.json({...data});
        require('fs').unlink(file.path, (err) => {
          if (err) {
            console.error('Error deleting temporary file:', err);
          }
        });
      });
    

});

app.get("/getAllProductsWithImages",upload.any(), async (req,res) => {
    const data = await getAllProductsWithImages();
    res.json({...data});
});

app.post("/updateProductAdmin",upload.any(), async (req,res) => {
    const  {  productId, title,description,price,sizes,quantity,color} = req.body;
    console.log("updateProductAdmin : ",{   productId, title,description,price,sizes,quantity,color })
    const data = await updateProductAdmin({   productId, title,description,price,sizes,quantity,color  })
    res.json({...data});
});


app.get("/getAllBrands",upload.any(), async (req,res) => {
    const data = await getAllBrands();
    res.json({...data});
});

app.post("/placeOrder",upload.any(), async (req,res) => {
    const  {  selectedPayment,selectedAddress,selectedProductArray,deliveryType,customerId,total} = req.body;
    console.log("placeOrder : ",{   selectedPayment,selectedAddress,selectedProductArray,deliveryType,customerId })
    const data = await placeOrder({   selectedPayment,selectedAddress,selectedProductArray,deliveryType,customerId,total  })
    res.json({...data});
});

app.get("/getAllOrders",upload.any(), async (req,res) => {
    const data = await getAllOrders();
    res.json({...data});
});

app.post("/getOredrsByCustId",upload.any(), async (req,res) => {
    const {customerId} = req.body
    const data = await getOrdersByCustomerId({customerId});
    res.json({...data});
});
app.post("/updateOrder",upload.any(), async (req,res) => {
    const {orderId} = req.body
    const data = await updateOrder({orderId});
    res.json({...data});
});

app.get("/payment/:paymentId",upload.any(), async (req,res) => {
    const { paymentId } = req.params;
    console.log("paymentId : ",paymentId)
    const data = await getPaymentData({paymentId});
    res.json({...data});
});

app.listen(8000, () => {
    console.log(`Server is running on port 8000.`);
});