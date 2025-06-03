const getallcateservices = require('../services/Categoryservices')
const getallcatecontroller =async (req,res,next)=>{
    try {
        const data = await getallcateservices.getallcateservices();
    
        return res.json(data);
    
    } catch (error) {
        next(error);
    }
    
} 
module.exports = {getallcatecontroller}