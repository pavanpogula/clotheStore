const { ObjectId } = require("mongodb");
const { customerCollection, orderArrayCollection, paymentCollection, orderCollection } = require("../Collection");




const customerLogin = async (customerData) => {
    try {
        const { mail, password } = customerData
        const query = { mail, password };
        const data = await customerCollection.findOne(query);
        return { "data": { ...data }, "error": "" };
    } catch (error) {
        console.log("error : ", error.message)
        return { "data": {}, "error": "" };
    }
}

async function getCustomerDetailsById(id) {

    try {
      const query = { _id: new ObjectId(id) };
      const data = await customerCollection.findOne(query);
      return { ...data, "error": "" };
    } catch (error) {
      return "error"
    }
  }


const addCustomer = async (customerData) => {
    try {
        const data = await customerCollection.insertOne({...customerData, role:'customer'})
        return {
            "msg": "good"
        }
    } catch (error) {
        console.log(" addCustomer error  ", error.message);
        return {
            "msg": "bad"
        }
    }
}

const placeOrder = async({selectedPayment,selectedAddress,selectedProductArray,deliveryType,customerId,total})=>{
    try {
        console.log("insert data : ",{selectedPayment,selectedAddress,...selectedProductArray,deliveryType,customerId});
        // const query = { _id: new ObjectId(customerId) };
        const insertOrderArray = await orderArrayCollection.insertOne({
            ...selectedProductArray
        })
        const paymentData = await paymentCollection.insertOne({
                    ...selectedPayment
        });

        const ordersData = await orderCollection.insertOne({
            customerId: new ObjectId(customerId),
            deliveryType:deliveryType,
            deliveryStatus:'inProgress',
            addressData:selectedAddress,
            order_array:insertOrderArray.insertedId,
            timestamp: new Date(),
            payment:paymentData.insertedId,
            'total':total

        })




        return {
            "msg": "good"
        }
    } catch (error) {
        console.log(" addCustomer error  ", error.message);
        return {
            "msg": "bad"
        }
    }


}

module.exports={
addCustomer,
customerLogin,
getCustomerDetailsById,
placeOrder
}