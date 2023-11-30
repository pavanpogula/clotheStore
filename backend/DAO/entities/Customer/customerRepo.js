const { customerCollection } = require("../Collection");




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

module.exports={
addCustomer,
customerLogin,
getCustomerDetailsById
}