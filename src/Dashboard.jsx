import React, { useState } from 'react';
import { Carousel } from 'react-responsive-carousel';
import "./Dashboard.css";
import RechartsComponent from './Recharts';

const Dashboard = ({ stockData = [], productData = [] }) => {
    const [currentTab, setCurrentTab] = useState('stock');

    // Prepare chart data
    const chartData = [...stockData, ...productData].map((item) => ({
        name: item.name,
        quantity: item.quantity,
    }));

    return (
        <div className="dashboard-container">
            <h1>Dashboard</h1>

            {/* Rotating Picture Carousel */}
            <Carousel autoPlay infiniteLoop showThumbs={false}>
                <div>
                    <img src="https://via.placeholder.com/800x300?text=Welcome+to+Inventory" alt="Welcome" />
                    <p className="legend">Welcome to Inventory Management</p>
                </div>
                <div>
                    <img src="https://via.placeholder.com/800x300?text=Manage+Products" alt="Manage Products" />
                    <p className="legend">Easily Manage Your Products</p>
                </div>
                <div>
                    <img src="https://via.placeholder.com/800x300?text=Track+Stocks" alt="Track Stocks" />
                    <p className="legend">Track Stocks Efficiently</p>
                </div>
            </Carousel>

            {/* Tabs for Switching Views */}
            <div className="tabs">
                <button
                    className={currentTab === 'stock' ? 'active-tab' : ''}
                    onClick={() => setCurrentTab('stock')}
                >
                    Stock Management
                </button>
                <button
                    className={currentTab === 'product' ? 'active-tab' : ''}
                    onClick={() => setCurrentTab('product')}
                >
                    Product Management
                </button>
            </div>

            {/* Tab Content */}
            <div className="tab-content">
                {currentTab === 'stock' && (
                    <div>
                        <h2>Stock Management</h2>
                        {stockData.length > 0 ? (
                            <table>
                                <thead>
                                    <tr>
                                        <th>Product Name</th>
                                        <th>Quantity</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {stockData.map((stock) => (
                                        <tr key={stock.id}>
                                            <td>{stock.name}</td>
                                            <td>{stock.quantity}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        ) : (
                            <p>No stock data available.</p> // Fallback message for empty stock data
                        )}
                    </div>
                )}
                {currentTab === 'product' && (
                    <div>
                        <h2>Product Management</h2>
                        {productData.length > 0 ? (
                            <table>
                                <thead>
                                    <tr>
                                        <th>Product Name</th>
                                        <th>Category</th>
                                        <th>Price</th>
                                        <th>Quantity</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {productData.map((product) => (
                                        <tr key={product.id}>
                                            <td>{product.name}</td>
                                            <td>{product.category}</td>
                                            <td>${product.price.toFixed(2)}</td> {/* Format price to 2 decimal places */}
                                            <td>{product.quantity}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        ) : (
                            <p>No product data available.</p> // Fallback message for empty product data
                        )}
                    </div>
                )}
            </div>

            {/* Bar Chart Component */}
            {chartData.length > 0 && (
                <div className="chart-section">
                    <h2>Product and Stock Overview</h2>
                    {/* Render the chart only if there's data */}
                    <RechartsComponent data={chartData} />
                </div>
            )}
        </div>
    );
};

export default Dashboard;