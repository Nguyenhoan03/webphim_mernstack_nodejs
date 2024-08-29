import React, { useEffect, useState } from 'react';
import Leftadmincompoment from '../../../compoment/AdminCompoment/Leftadmincompoment/Leftadmincompoment';
import Right_navbarcompoment from '../../../compoment/AdminCompoment/Right_navbarcompoment/Right_navbarcompoment';
import { MdShoppingCart, MdAttachMoney, MdOutlineShoppingBag } from "react-icons/md";
import { FaUserFriends } from "react-icons/fa";
import { Getalluser } from '../../../services/Users';

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
                                            <select className="form-control" value={data.roles}>
                                                <option>{data.roles}</option>
                                                <option>Admin</option>
                                            </select>
                                        </td>
                                        <td>
                                            <select className="form-control">
                                                <option>Not Purchased</option>
                                                <option>VIP1</option>
                                                <option>VIP2</option>
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
