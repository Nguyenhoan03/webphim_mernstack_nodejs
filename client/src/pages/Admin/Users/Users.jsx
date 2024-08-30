import React, { useEffect, useState } from 'react';
import Leftadmincompoment from '../../../compoment/AdminCompoment/Leftadmincompoment/Leftadmincompoment';
import Right_navbarcompoment from '../../../compoment/AdminCompoment/Right_navbarcompoment/Right_navbarcompoment';
import { MdShoppingCart, MdAttachMoney, MdOutlineShoppingBag } from "react-icons/md";
import { FaUserFriends } from "react-icons/fa";
import { Getalluser } from '../../../services/Users';
import { Update_user_roles } from '../../../services/Users';
import { Update_user_permission } from '../../../services/Users';
export default function Users() {
    const [datauser, setdatauser] = useState([]);

    useEffect(() => {
        const fetchAllUsers = async () => {
            try {
                const data = await Getalluser();
                if (data) {
                    setdatauser(data.data);
                }
            } catch (error) {
                console.error(error);
            }
        };
        fetchAllUsers();
    }, []);

    const StatusCard = ({ icon, count, title }) => (
        <div className="card text-center shadow-sm">
            <div className="card-body">
                <div className="display-4">
                    {icon}
                </div>
                <h4 className="card-title mt-2">{count}</h4>
                <p className="card-text">{title}</p>
            </div>
        </div>
    );
   const handleRoleChange =async (e,index)=>{
    try {
        const edited_roles = e.target.value;
        const id_user_update = datauser[index].id;
        const data = await Update_user_roles(id_user_update,edited_roles);
         if(data && data.success){
              alert("update quyền người dùng" +datauser[index].username+ "thành công");
              window.location.reload();
        }
    } catch (error) {
        console.log(error)
    }    
     

   }
   const handlePermissionChange =async (e,index)=>{
      try {
        const edited_Permissions = e.target.value;
        
        const id_user_update = datauser[index].id;
        console.log("firstedited_Permissions",edited_Permissions)
        const data = await Update_user_permission(id_user_update,edited_Permissions);


      } catch (error) {
        
      }
   }
    return (
        <div className="container-fluid">
            <div className="row">
                <aside className="col-md-2">
                    <Leftadmincompoment />
                </aside>
                <main className="col-md-10">
                    <Right_navbarcompoment />
                    <div className="row mt-4">
                        <div className="col-12 col-md-6 col-lg-3 mb-3">
                            <StatusCard icon={<MdShoppingCart />} count="1,995" title="Total Sales" />
                        </div>
                        <div className="col-12 col-md-6 col-lg-3 mb-3">
                            <StatusCard icon={<MdAttachMoney />} count="$2,632" title="Total Income" />
                        </div>
                        <div className="col-12 col-md-6 col-lg-3 mb-3">
                            <StatusCard icon={<FaUserFriends />} count="1,711" title="Total Orders" />
                        </div>
                        <div className="col-12 col-md-6 col-lg-3 mb-3">
                            <StatusCard icon={<MdOutlineShoppingBag />} count="2,001" title="Daily Visits" />
                        </div>
                    </div>
                    <div className="table-responsive mt-4">
                        <table className="table table-bordered table-hover">
                            <thead className="thead-dark">
                                <tr>
                                    <th>Email</th>
                                    <th>Password</th>
                                    <th>Username</th>
                                    <th>Role</th>
                                    <th>Purchased Package</th>
                                </tr>
                            </thead>
                            <tbody>
                                {datauser.map((data, index) => (
                                    <tr key={index}>
                                        <td>{data.email}</td>
                                        <td>{data.password}</td>
                                        <td>{data.username}</td>
                                        <td>
                                            <select className="form-control" value={data.roles} onChange={(e) => handleRoleChange(e,index)}>
                                                <option value="user" selected={data.roles === "user"}>User</option>
                                                <option value="admin" selected={data.roles === "admin"}>Admin</option>
                                            </select>
                                        </td>

                                        <td>
                                        <select
                                            className="form-control"
                                            value={data.permissions[0]} // Assuming one permission per user
                                            onChange={(e) => handlePermissionChange(e, index)}
                                        >
                                            <option value="No_Permissions">Not Purchased</option>
                                            <option value="VIP1">VIP1</option>
                                            <option value="VIP2">VIP2</option>
                                        </select>
                                        </td>

                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </main>
            </div>
        </div>
    );
}
