const { ObjectId } = require("mongodb");
const { adminCollection } = require("../Collection");




const adminLogin = async (professorData) => {
    try {
        const { mail, password } = professorData
        const query = { mail, password };
        const data = await adminCollection.findOne(query);
        return { "data": { ...data }, "error": "" };
    } catch (error) {
        console.log("error : ", error.message)
        return { "data": {}, "error": "" };
    }
}

async function fetchAdmin(id) {

    try {
      const query = { _id: new ObjectId(id) };
      const data = await adminCollection.findOne(query);
      return { ...data, "error": "" };
    } catch (error) {
      return "error"
    }
  }





module.exports = {
    adminLogin,
    fetchAdmin
}