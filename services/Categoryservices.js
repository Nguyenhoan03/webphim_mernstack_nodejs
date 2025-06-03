const {category} = require('../models');

const getallcateservices =async ()=>{
     try {
        const data = await category.findAll();
        if(data){
            return data;
        }
     } catch (error) {
        throw(error)
     }
}
module.exports={getallcateservices}