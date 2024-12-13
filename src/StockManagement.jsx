import React, { useState, useEffect } from 'react';
import { db } from './firebaseConfig';
import { collection, getDocs, addDoc, updateDoc, doc } from 'firebase/firestore';
import { Bar } from 'react-chartjs-2'; // Import Bar chart from react-chartjs-2
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import './StockManagement.css'; // Import the CSS file

// Register necessary Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const StockManagement = () => {
    const [products, setProducts] = useState([]);
    const [newProduct, setNewProduct] = useState({
        id: null,
        name: '',
        quantity: '',
    });
    const [sale, setSale] = useState({
        productId: '',
        quantity: '',
    });

    // Fetch products from Firestore when the component mounts
    useEffect(() => {
        const fetchProducts = async () => {
            const productCollection = collection(db, 'products');
            const productSnapshot = await getDocs(productCollection);
            const productList = productSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setProducts(productList);
        };
        fetchProducts();
    }, []);

    // Handle input changes for new product and sale
    const handleNewProductChange = (e) => {
        const { name, value } = e.target;
        setNewProduct((prevProduct) => ({
            ...prevProduct,
            [name]: value,
        }));
    };

    const handleSaleChange = (e) => {
        const { name, value } = e.target;
        setSale((prevSale) => ({
            ...prevSale,
            [name]: value,
        }));
    };

    // Add or Update product in Firestore
    const addOrUpdateProduct = async () => {
        const quantity = parseInt(newProduct.quantity);
        if (!newProduct.name || isNaN(quantity) || quantity <= 0) {
            alert("Please enter a valid product name and quantity.");
            return;
        }

        if (newProduct.id) {
            // Update existing product
            const productRef = doc(db, 'products', newProduct.id);
            await updateDoc(productRef, { name: newProduct.name, quantity });
        } else {
            // Add new product
            const productsCollection = collection(db, 'products');
            await addDoc(productsCollection, { name: newProduct.name, quantity });
        }

        setNewProduct({ id: null, name: '', quantity: '' }); // Reset form
    };

    // Sell product and update the stock
    const sellProduct = async () => {
        const productToSell = products.find((product) => product.id === sale.productId);
        const quantityToSell = parseInt(sale.quantity);

        if (!productToSell) {
            alert("Please select a valid product.");
            return;
        }

        if (isNaN(quantityToSell) || quantityToSell <= 0) {
            alert("Please enter a valid sale quantity.");
            return;
        }

        if (productToSell.quantity < quantityToSell) {
            alert("Insufficient stock available.");
            return;
        }

        const updatedQuantity = productToSell.quantity - quantityToSell;

        // Update product quantity in Firestore
        const productRef = doc(db, 'products', productToSell.id);
        await updateDoc(productRef, { quantity: updatedQuantity });

        setSale({ productId: '', quantity: '' }); // Reset sale form
    };

    // Set product for editing
    const editProduct = (product) => {
        setNewProduct({ id: product.id, name: product.name, quantity: product.quantity });
    };

    // Prepare data for the bar chart
    const chartData = {
        labels: products.map((product) => product.name),
        datasets: [
            {
                label: 'Stock Quantity',
                data: products.map((product) => product.quantity),
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
            },
        ],
    };

    const chartOptions = {
        responsive: true,
        plugins: {
            title: {
                display: true,
                text: 'Stock Quantity Bar Chart',
            },
        },
        scales: {
            y: {
                beginAtZero: true,
            },
        },
    };

    return (
        <div className="stock-management-container">
            <h2 className="stock-management-title">Stock Management</h2>

            <h3 className="current-stock-title">Current Stock</h3>
            <table className="stock-table">
                <thead>
                    <tr>
                        <th>Product Name</th>
                        <th>Quantity in Stock</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product) => (
                        <tr key={product.id}>
                            <td>{product.name}</td>
                            <td>{product.quantity}</td>
                            <td>
                                <button onClick={() => editProduct(product)} className="edit-button">Edit</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <h3 className="form-title">{newProduct.id ? 'Update Product' : 'Add New Product'}</h3>
            <input
                className="product-input"
                type="text"
                name="name"
                placeholder="Product Name"
                value={newProduct.name}
                onChange={handleNewProductChange}
            />
            <input
                className="product-input"
                type="number"
                name="quantity"
                placeholder="Initial Quantity"
                value={newProduct.quantity}
                onChange={handleNewProductChange}
            />
            <button onClick={addOrUpdateProduct} className="submit-button">
                {newProduct.id ? 'Update Product' : 'Add Product'}
            </button>

            <h3 className="sell-product-title">Sell Product</h3>
            <select
                name="productId"
                value={sale.productId}
                onChange={handleSaleChange}
                className="product-select"
            >
                <option value="">Select Product</option>
                {products.map((product) => (
                    <option key={product.id} value={product.id}>
                        {product.name}
                    </option>
                ))}
            </select>
            <input
                className="sale-input"
                type="number"
                name="quantity"
                placeholder="Quantity to Sell"
                value={sale.quantity}
                onChange={handleSaleChange}
            />
            <button onClick={sellProduct} className="sell-button">Sell Product</button>

            {/* Display Bar Chart */}
            <h3 className="chart-title">Stock Quantity Chart</h3>
            <div className="chart-container">
                <Bar data={chartData} options={chartOptions} />
            </div>
        </div>
    );
};

export default StockManagement;
