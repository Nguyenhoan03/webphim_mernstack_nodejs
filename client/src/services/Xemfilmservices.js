import axios from "axios";
const Dataxemphim = async (title,episode) => {
    try {
      const url = `${process.env.REACT_APP_API_URL}/product/${title}/${episode}`;
   
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      throw error;
    }
  };
  
  
  export {Dataxemphim}