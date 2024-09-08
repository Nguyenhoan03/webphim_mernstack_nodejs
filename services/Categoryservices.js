const {Category} = require('../models');

const getallcateservices =async ()=>{
     try {
        const data = await Category.findAll();
        if(data){
            return data;
        }
     } catch (error) {
        throw(error)
     }
}
module.exports={getallcateservices}