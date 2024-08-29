import axios from "axios";

const ServiceUserlogin = async (email, password) => {
    try {
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/dang-nhap`, { email, password });
        if (response.status === 200) {
            const data= response.data;
           
            sessionStorage.setItem('token', data.token);
            sessionStorage.setItem('name', data.name);
            sessionStorage.setItem('id', data.id);
            sessionStorage.setItem('email', email);
            sessionStorage.setItem('refreshToken', data.refreshToken);
            sessionStorage.setItem('roles', data.roles);
            sessionStorage.setItem('permissions',data.permissions);
        return {success: true}
        } else {
         
            return {success: false}
        }
    } catch (error) {
        console.error('An error occurred during login:', error);
        throw error;
    }
};



const Userregister = async (email, password,name) => {
  try {
    const response = await axios.post(`${process.env.REACT_APP_API_URL}/dang-ky`, { email, password,name });
    if (response.status === 201) {
      return { success: true };
    } else {
      return { success: false, message: response.data.message || "Registration failed" };
    }
  } catch (error) {
    console.error("Error in Userregister:", error);
    return { success: false, message: "An error occurred during registration" };
  }
};


export { ServiceUserlogin,Userregister };
