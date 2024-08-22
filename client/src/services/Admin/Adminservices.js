import axios from 'axios';

const Themphim = async (formdata) => {
     try {
          const response = await axios.post(`${process.env.REACT_APP_API_URL}/admin/addphim`, formdata);
          return response.data;         
     } catch (error) {
          throw(error)
     }
  
};

export default {
  Themphim,
};
