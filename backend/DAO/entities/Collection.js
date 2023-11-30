const {
    DATABASE,
    ADMIN,
    CUSTOMER,
    CLOTHES,
    BRANDS,
    VARIANTS,
    PAYMENT,
    ORDERS,
    ORDER_ARRAY,
    CHUNKS
} = require("../constants");

const MongoClient = require('mongodb').MongoClient;





const url = "mongodb+srv://sxp17390:root123@cluster0.6bf1a1k.mongodb.net/?retryWrites=true&w=majority";
// const url ='mongodb://yourhost:27017/';



const client = new MongoClient(url);



const database = client.db(DATABASE);


const adminCollection = database.collection(ADMIN);
const customerCollection = database.collection(CUSTOMER);
const clotheCollection = database.collection(CLOTHES);
const brandCollection = database.collection(BRANDS);
const variantCollection = database.collection(VARIANTS);
const paymentCollection = database.collection(PAYMENT);
const orderCollection = database.collection(ORDERS);
const orderArrayCollection = database.collection(ORDER_ARRAY);
const chunksCollection = database.collection(CHUNKS);
module.exports ={
    adminCollection,
    customerCollection,
    clotheCollection,
    brandCollection,
    variantCollection,
    paymentCollection,
    orderCollection,
    orderArrayCollection,
    chunksCollection,
    database
}