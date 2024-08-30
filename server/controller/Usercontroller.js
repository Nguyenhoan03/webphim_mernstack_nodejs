const Userservice = require('../services/Userservices') 
const Login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const data = await Userservice.Servicelogin(email, password);
       
        if (data.success) {
            res.status(200).json({ token: data.token,refreshToken: data.refreshToken, name: data.name, id: data.id,roles:data.roles,permissions:data.permissions});
        } else {
            res.status(401).json({ message: data.message });
        }
    } catch (error) {
        console.error("Error in login:", error);
        res.status(500).json("Server error");
    }
}
const Refreshtoken =async (req,res ) => {
     try {
        const refeshToken = req.body.token;
        await Userservice.Servicerefreshtoken(req,res,refeshToken);
        // return res.status(200).json({})
     } catch (error) {
        console.log(error)
     }
}

const Register = async (req, res) => {
    const { email, password,name } = req.body;
    try {
        const data = await Userservice.Serviceregister(email, password,name);
        if (data.success) {
            res.status(201).json({ message: 'User registered successfully' });
        } else {
            res.status(409).json({ message: data.message });
        }
    } catch (error) {
        console.error("Error in Register:", error);
        res.status(500).json("Server error");
    }
}
const getallusercontroller = async (req, res) => {
    try {
      const result = await Userservice.ServicegetallUser();
      
      if (result.success) {
        return res.status(200).json(result.data); 
      } else {
        return res.status(404).json({ message: result.message }); 
      }
    } catch (error) {
      console.error("Error in getallusercontroller:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  };
  const Updateroles = async (req,res,next)=>{
    try {
        const {id_user_update,edited_roles} = req.body;
        const data = await Userservice.ServiceUpdateRoles(id_user_update,edited_roles);
        console.log("firstdataaaa",data);
        if(data.success){
            return res.status(200).json("update thành công");
        }
    } catch (error) {
        
        next(error);
    }   
  }
  
module.exports={Login,Register,Refreshtoken,getallusercontroller,Updateroles}