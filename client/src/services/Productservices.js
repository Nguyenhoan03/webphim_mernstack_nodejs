import axios from 'axios';


 const Producthome = async () => {
  try {
    const response = await axios.get(`${process.env.REACT_APP_API_URL}/product/product-home`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
const ProductDetail = async (title, id) => {
  try {
    console.log("idddd",id);
    const url = `${process.env.REACT_APP_API_URL}/product/${title}`;
    const response = await axios.get(url, {
      headers: {
        'Content-Type': 'application/json',
        'userId': id
      }
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

const Getallproduct =async ()=>{
    try {
      const data = axios.get(`${process.env.REACT_APP_API_URL}/product`)
      if(data){
        return data;
      }
    } catch (error) {
      throw(error)
    }
}
const Getdetailfilm =async (titlefilm)=>{
    try {
      const data = axios.get(`${process.env.REACT_APP_API_URL}/product/getdetail_xemphim/${titlefilm}`)
      if(data){
        return data;
      }
    } catch (error) {
      throw(error)
    }
}

const apiUrl = process.env.REACT_APP_API_URL;

const fetchData = async (endpoint, filters = {}) => {
  try {
    const queryParams = new URLSearchParams(filters).toString();
    const url = `${apiUrl}/product/${endpoint}${queryParams ? `?${queryParams}` : ''}`;
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error(`Error fetching data from ${endpoint}:`, error.response ? error.response.data : error.message);
    throw error;
  }
};

export const Productdanhmucphimbo = async (filters) => {
  return fetchData('product-phimbo',filters);
};

export const Productdanhmucphimbian = async (filters) => {
  return fetchData('product-phimbian',filters);
};

export const Productdanhmucphimtamly = async (filters) => {
  return fetchData('product-phimtamly',filters);
};
export const Productdanhmucphimamnhac = async (filters) => {
  return fetchData('product-phimamnhac',filters);
};

export const Productdanhmucphimhaihuoc = async (filters) => {
  return fetchData('product-phimhaihuoc',filters);
};

export const Productdanhmucphimkhoahoc = async (filters) => {
  return fetchData('product-phimkhoahoc',filters);
};

export const Productdanhmucphimkinhdien = async (filters) => {
  return fetchData('product-phimkinhdien',filters);
};

export const Productdanhmucphimcotrang = async (filters) => {
  return fetchData('product-phimcotrang',filters);
};

export const Productdanhmucphimkinhdi = async (filters) => {
  return fetchData('product-phimkinhdi',filters);
};

export const Productdanhmucphim18plus = async (filters) => {
  return fetchData('product-phim18plus', filters);
};

export const Productdanhmucphimhanhdong = async (filters) => {
  return fetchData('product-phimhanhdong', filters);
};

export const Productdanhmucphimthethao = async (filters) => {
  return fetchData('product-phimthethao',filters);
};

export const Productdanhmucphimgiadinh = async (filters) => {
  return fetchData('product-phimgiadinh',filters);
};

export const Productdanhmucphimhinhsu = async (filters) => {
  return fetchData('product-phimhinhsu',filters);
};

export const Productdanhmucphimthanthoai = async (filters) => {
  return fetchData('product-phimthanthoai',filters);
};

export const Productdanhmucphimhoathinh = async (filters) => {
  return fetchData('product-phimhoathinh',filters);
};

export const Productdanhmucphimchientranh = async (filters) => {
  return fetchData('product-phimchientranh',filters);
};

export const Productdanhmucphimtailieu = async (filters) => {
  return fetchData('product-phimtailieu',filters);
};

export const Productdanhmucphimtinhcam = async (filters) => {
  return fetchData('product-phimtinhcam',filters);
};

export const Productdanhmucphimphieuluu = async (filters) => {
  return fetchData('product-phimphieuluu',filters);
};

export const Productdanhmucphimhocduong = async (filters) => {
  return fetchData('product-phimhocduong',filters);
};

export const Productdanhmucphimvothuat = async (filters) => {
  return fetchData('product-phimvothuat',filters);
};

export const Productdanhmucphimchinhkich = async (filters) => {
  return fetchData('product-phimchinhkich',filters);
};

export const Productdanhmucphimle = async (filters) => {
  return fetchData('product-phimle',filters);
};

export const Productdanhmucphimshows = async (filters) => {
  return fetchData('product-phimshows',filters);
};

export const Productdanhmucphimsapchieu = async (filters) => {
  return fetchData('product-phimsapchieu',filters);
};

export const Productdanhmucphimvientuong = async (filters) => {
  return fetchData('product-phimvientuong',filters);
};

//product theo quốc gia phim


  export const Productquocgia_anh = async (filters) => {
    return fetchData('product-anh', filters);
  };

  export const Productquocgia_phap = async (filters) => {
    return fetchData('product-phap', filters);
  };

  export const Productquocgia_nhatban = async (filters) => {
    return fetchData('product-nhat-ban', filters);
  };

  export const Productquocgia_hanquoc = async (filters) => {
    return fetchData('product-han-quoc', filters);
  };

  export const Productquocgia_thailan = async (filters) => {
    return fetchData('product-thai-lan', filters);
  };

  export const Productquocgia_aumy = async (filters) => {
    return fetchData('product-au-my', filters);
  };

  export const Productquocgia_dailoan = async (filters) => {
    return fetchData('product-dai-loan', filters);
  };

  export const Productquocgia_hongkong = async (filters) => {
    return fetchData('product-hong-kong', filters);
  };

  export const Productquocgia_ando = async (filters) => {
    return fetchData('product-ando', filters);
  };

  export const Productquocgia_duc = async (filters) => {
    return fetchData('product-duc', filters);
  };

  export const Productquocgia_canada = async (filters) => {
    return fetchData('product-canada', filters);
  };

  export const Productquocgia_taybannha = async (filters) => {
    return fetchData('product-tay-ban-nha', filters);
  };

  export const Productquocgia_thonhiky = async (filters) => {
    return fetchData('product-tho-nhi-ky', filters);
  };

  export const Productquocgia_halan = async (filters) => {
    return fetchData('product-ha-lan', filters);
  };

  export const Productquocgia_indonesia = async (filters) => {
    return fetchData('product-indonesia', filters);
  };

  export const Productquocgia_nga = async (filters) => {
    return fetchData('product-nga', filters);
  };

  export const Productquocgia_mexico = async (filters) => {
    return fetchData('product-mexico', filters);
  };

  export const Productquocgia_balan = async (filters) => {
    return fetchData('product-ba-lan', filters);
  };

  export const Productquocgia_uc = async (filters) => {
    return fetchData('product-uc', filters);
  };

  export const Productquocgia_thuydien = async (filters) => {
    return fetchData('product-thuy-dien', filters);
  };

  export const Productquocgia_malaysia = async (filters) => {
    return fetchData('product-malaysia', filters);
  };

  export const Productquocgia_brazil = async (filters) => {
    return fetchData('product-brazil', filters);
  };

  export const Productquocgia_philippines = async (filters) => {
    return fetchData('product-philippines', filters);
  };

  export const Productquocgia_bodaonha = async (filters) => {
    return fetchData('product-bo-dao-nha', filters);
  };

  export const Productquocgia_y = async (filters) => {
    return fetchData('product-y', filters);
  };

  export const Productquocgia_danmach = async (filters) => {
    return fetchData('product-dan-mach', filters);
  };

  export const Productquocgia_uae = async (filters) => {
    return fetchData('product-uae', filters);
  };

  export const Productquocgia_nauy = async (filters) => {
    return fetchData('product-na-uy', filters);
  };

  export const Productquocgia_thuysi = async (filters) => {
    return fetchData('product-thuy-si', filters);
  };

  export const Productquocgia_chauphi = async (filters) => {
    return fetchData('product-chau-phi', filters);
  };

  export const Productquocgia_namphi = async (filters) => {
    return fetchData('product-nam-phi', filters);
  };

  export const Productquocgia_ukraina = async (filters) => {
    return fetchData('product-ukraina', filters);
  };

  export const Productquocgia_arapxeut = async (filters) => {
    return fetchData('product-a-rap-xe-ut', filters);
  };
  export const Productquocgia_trungquoc = async (filters) => {
    return fetchData('product-trung-quoc', filters);
  };
  export const Productquocgia_quocgiakhac = async (filters) => {
    return fetchData('product-quoc-gia-khac', filters);
  };



const refreshToken = async () => {
  try {
    const refreshToken = sessionStorage.getItem('refreshToken');
    if (!refreshToken) {
      alert("Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.");
      window.location.href = '/dang-nhap';
      return null;
    }

    const { data } = await axios.post(
      `${process.env.REACT_APP_API_URL}/refresh_token`,
      { token: refreshToken }
    );

    sessionStorage.setItem('token', data.tokennew);
    return data.tokennew;
  } catch (error) {
    console.error("Error refreshing token:", error);
    alert("Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.");
    window.location.href = '/dang-nhap';
    return null;
  }
};
const usercomment = async (token, titlefilm, contentcomment) => {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_API_URL}/product/comment`,
      { titlefilm, contentcomment },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        }
      }
    );

    if (response.status === 200) {
      window.location.reload();
    } else if (response.status === 401 || response.status === 403) {
      const newToken = await refreshToken();
      if (newToken) {
        return HandleRating(newToken, titlefilm, contentcomment);
      }
    } else {
      console.error('Server error:', response.data);
      return "Server error";
    }
  } catch (error) {
    if (error.response && (error.response.status === 401 || error.response.status === 403)) {
      const newToken = await refreshToken();
      if (newToken) {
        return HandleRating(newToken, titlefilm, contentcomment);
      }
    } else {
      console.error("Error in userchildcomment:", error);
    }
  }
};
const HandleRating = async (token, titlefilm, id, email, starselect) => {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_API_URL}/product/rating_star`,
      { titlefilm, id, email, starselect },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        }
      }
    );

    if (response.status === 200) {
      window.location.reload();
    } else if (response.status === 401 || response.status === 403) {
      const newToken = await refreshToken();
      if (newToken) {
        return HandleRating(newToken, titlefilm, id, email, starselect);
      }
    } else {
      console.error('Server error:', response.data);
      return "Server error";
    }
  } catch (error) {
    if (error.response && (error.response.status === 401 || error.response.status === 403)) {
      const newToken = await refreshToken();
      if (newToken) {
        return HandleRating(newToken, titlefilm, id, email,starselect);
      }
    } else {
      console.error("Error in userchildcomment:", error);
    }
  }
};

const userchildcomment = async (token, titlefilm, contentcomment, parent_id) => {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_API_URL}/product/comment`,
      { titlefilm, contentcomment, parent_id },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        }
      }
    );

    if (response.status === 200) {
      window.location.reload();
    } else if (response.status === 401 || response.status === 403) {
      const newToken = await refreshToken();
      if (newToken) {
        return userchildcomment(newToken, titlefilm, contentcomment, parent_id);
      }
    } else {
      console.error("Failed to post comment:", response.data);
    }
  } catch (error) {
    if (error.response && (error.response.status === 401 || error.response.status === 403)) {
      const newToken = await refreshToken();
      if (newToken) {
        return userchildcomment(newToken, titlefilm, contentcomment, parent_id);
      }
    } else {
      console.error("Error in userchildcomment:", error);
    }
  }
};




// Existing exports
export {
  Producthome,
  Getallproduct,
  ProductDetail,
  userchildcomment,
  usercomment,
  HandleRating,
  Getdetailfilm
};


