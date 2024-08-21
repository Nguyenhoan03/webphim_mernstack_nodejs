import React from 'react';
import Chart from 'react-apexcharts';
import Leftadmincompoment from '../../../compoment/AdminCompoment/Leftadmincompoment/Leftadmincompoment';
import Right_navbarcompoment from '../../../compoment/AdminCompoment/Right_navbarcompoment/Right_navbarcompoment';
import { MdShoppingCart, MdAttachMoney, MdOutlineShoppingBag } from "react-icons/md";
import { FaUserFriends } from "react-icons/fa";
import "./Dashboard.scss"
export default function Dashboard() {
    const chartOptions = {
        series: [{
            name: 'Online Customers',
            data: [40, 70, 20, 90, 36, 80, 30, 91, 60]
        }, {
            name: 'Store Customers',
            data: [40, 30, 70, 80, 40, 16, 40, 20, 51, 10]
        }],
        options: {
            colors: ['#6ab04c', '#2980b9'],
            chart: {
                background: 'transparent',
                toolbar: {
                    show: false
                }
            },
            dataLabels: {
                enabled: false
            },
            stroke: {
                curve: 'smooth',
                width: 2
            },
            xaxis: {
                categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
                labels: {
                    style: {
                        fontSize: '14px',
                        colors: '#9aa0ac'
                    }
                }
            },
            legend: {
                position: 'top',
                horizontalAlign: 'right',
                labels: {
                    colors: '#333',
                    useSeriesColors: false
                }
            },
            grid: {
                borderColor: '#f1f1f1'
            },
            theme: {
                mode: 'light'
            }
        }
    };

    const StatusCard = ({ icon, count, title }) => {
        return (
            <div className="status-card">
                <div className="status-card__icon">
                    {icon}
                </div>
                <div className="status-card__info">
                    <h4>{count}</h4>
                    <span>{title}</span>
                </div>
            </div>
        );
    };

    return (
        <div className='dashboard-container'>
            <div className="row">
                <div className="col-md-2">
                    <Leftadmincompoment />
                </div>
                <div className="col-md-10">
                    <Right_navbarcompoment />
                    <div className="row mt-4">
                        <div className="col-12 col-md-6 col-lg-3 mb-3">
                            <StatusCard icon={<MdShoppingCart />} count="1,995" title="Tổng số phim" />
                        </div>
                        <div className="col-12 col-md-6 col-lg-3 mb-3">
                            <StatusCard icon={<MdAttachMoney />} count="$2,632" title="" />
                        </div>
                        <div className="col-12 col-md-6 col-lg-3 mb-3">
                            <StatusCard icon={<FaUserFriends />} count="1,711" title="Tổng số người dùng" />
                        </div>
                        <div className="col-12 col-md-6 col-lg-3 mb-3">
                            <StatusCard icon={<MdOutlineShoppingBag />} count="2,001" title="Daily Visits" />
                        </div>
                    </div>
                    <div className="col-12">
                        <div className="card full-height">
                            <Chart
                                options={chartOptions.options}
                                series={chartOptions.series}
                                type='line'
                                height='350'
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
