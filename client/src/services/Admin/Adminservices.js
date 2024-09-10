import axios from 'axios';

const Themphim = async (formdata) => {
     try {
          const response = await axios.post(`${process.env.REACT_APP_API_URL}/admin/addphim`, formdata);
          return response.data;         
     } catch (error) {
          throw(error)
     }
};
const UpdateVIP = async (updatedItem, newVIP1Value) => {
     try {
     
       const response = await axios.post(
         `${process.env.REACT_APP_API_URL}/product/edit_packageVIP1`,
         {
           title: updatedItem,
           VIP1: newVIP1Value,
         }
       );
       console.log("firstresponse",response)
       if (response.status === 200) {
         return { success: true };
       } else {
         return { success: false };
       }
     } catch (error) {
       console.error("Error in UpdateVIP:", error);
       return { success: false };
     }
   };
   

export {
  Themphim,
  UpdateVIP
};
