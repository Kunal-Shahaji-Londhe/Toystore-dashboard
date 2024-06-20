import React, { useEffect, useState } from 'react';
import { Chart } from 'react-google-charts';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import Grid from '@mui/material/Grid';
import axios from 'axios';
import './Dashboard.css'; // Import custom CSS for styling
import { saveAs } from 'file-saver'; // Import file-saver for downloading files
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

function Dashboard() {
    const [totalUsers, setTotalUsers] = useState(0);
    const [totalOrders, setTotalOrders] = useState(0);
    const [totalRevenue, setTotalRevenue] = useState(0);
    const [totalCategories, setTotalCategories] = useState(0);
    const [productsPerCategory, setProductsPerCategory] = useState([]);
    const [revenuePerCategory, setRevenuePerCategory] = useState([]);
    const [salesByCategory, setSalesByCategory] = useState([]);
    const [productSalesData, setProductSalesData] = useState([]);
    const [inventoryPerformance, setInventoryPerformance] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const [usersRes, ordersRes, revenueRes, categoriesRes, productsPerCategoryRes, revenuePerCategoryRes, salesByCategoryRes,productSalesRes, inventoryPerformanceRes] = await Promise.all([
                axios.get('https://ecommerceapi-2-6l87.onrender.com/api/v1/analytics/total-users'),
                axios.get('https://ecommerceapi-2-6l87.onrender.com/api/v1/analytics/total-orders'),
                axios.get('https://ecommerceapi-2-6l87.onrender.com/api/v1/analytics/total-sales-revenue'),
                axios.get('https://ecommerceapi-2-6l87.onrender.com/api/v1/analytics/total-categories'),
                axios.get('https://ecommerceapi-2-6l87.onrender.com/api/v1/analytics/products-per-category'),
                axios.get('https://ecommerceapi-2-6l87.onrender.com/api/v1/analytics/revenue-per-category'),
                axios.get('https://ecommerceapi-2-6l87.onrender.com/api/v1/analytics/sales-by-category'),
                axios.get('https://ecommerceapi-2-6l87.onrender.com/api/v1/analytics/product-sales-report'),
                axios.get('https://ecommerceapi-2-6l87.onrender.com/api/v1/analytics/inventory-performance')
            ]);

            setTotalUsers(usersRes.data.totalUsers);
            setTotalOrders(ordersRes.data.totalOrders);
            setTotalRevenue(revenueRes.data.totalSales);
            setTotalCategories(categoriesRes.data.totalCategories);
            setProductsPerCategory(productsPerCategoryRes.data);
            setRevenuePerCategory(revenuePerCategoryRes.data);
            setSalesByCategory(salesByCategoryRes.data);
            setProductSalesData(productSalesRes.data);
            setInventoryPerformance(inventoryPerformanceRes.data);
            setIsLoading(false);
        } catch (error) {
            console.error('Error fetching data:', error);
            setIsLoading(false);
        }
    };

    const downloadAsPdf = async (element, filename) => {
        const canvas = await html2canvas(element);
        const pdf = new jsPDF('p', 'pt',  [canvas.width, canvas.height]);
        pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, 0,canvas.width, canvas.height); // Adjust page size as needed (A4 size: 210x297 mm)
        pdf.save(filename);
    };

    const downloadAsExcel = (data, filename) => {
        const csvContent = [
            Object.keys(data[0]).join(','),
            ...data.map(item => Object.values(item).join(','))
        ].join('\n');
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8' });
        saveAs(blob, filename);
    };

    return (
        <div className="container">
            {isLoading ? (
                <div className="loading-container">
                    <CircularProgress size={80} />
                </div>
            ) : (
                <>
                    <Grid container spacing={4}>
                        {/* Total Users */}
                        <Grid item xs={12} sm={6} md={3}>
                            <Card className="card">
                                <CardContent>
                                    <Typography variant="h6" gutterBottom>Total Users</Typography>
                                    <Typography variant="h4">{totalUsers}</Typography>
                                </CardContent>
                            </Card>
                        </Grid>

                        {/* Total Orders */}
                        <Grid item xs={12} sm={6} md={3}>
                            <Card className="card">
                                <CardContent>
                                    <Typography variant="h6" gutterBottom>Total Orders</Typography>
                                    <Typography variant="h4">{totalOrders}</Typography>
                                </CardContent>
                            </Card>
                        </Grid>

                        {/* Total Revenue */}
                        <Grid item xs={12} sm={6} md={3}>
                            <Card className="card">
                                <CardContent>
                                    <Typography variant="h6" gutterBottom>Total Revenue</Typography>
                                    <Typography variant="h4">&#8377;{totalRevenue}</Typography>
                                </CardContent>
                            </Card>
                        </Grid>

                        {/* Total Categories */}
                        <Grid item xs={12} sm={6} md={3}>
                            <Card className="card">
                                <CardContent>
                                    <Typography variant="h6" gutterBottom>Total Categories</Typography>
                                    <Typography variant="h4">{totalCategories}</Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>

                    {/* Products Per Category */}
                    <div className="chart-container">
                        <Typography variant="h5" className="chart-title">Products Per Category</Typography>
                        <Chart
                            width={'100%'}
                            height={'400px'}
                            chartType="BarChart"
                            loader={<div>Loading Chart</div>}
                            data={[
                                ['Category', 'Product Count'],
                                ...productsPerCategory.map(({ category, productCount }) => [category, productCount])
                            ]}
                            options={{
                                title: 'Products Per Category',
                                hAxis: { title: 'Category', titleTextStyle: { color: '#333' } },
                                vAxis: { minValue: 0 },
                                legend: { position: 'none' },
                                colors: ['#FF5733'] // Custom color for the bar chart
                            }}
                        />
                    </div>

                    {/* Revenue Per Category */}
                    <div className="chart-container">
                        <Typography variant="h5" className="chart-title">Revenue Per Category</Typography>
                        <Chart
                            width={'100%'}
                            height={'400px'}
                            chartType="ColumnChart"
                            loader={<div>Loading Chart</div>}
                            data={[
                                ['Category', 'Total Revenue'],
                                ...revenuePerCategory.map(({ category, totalRevenue }) => [category, totalRevenue])
                            ]}
                            options={{
                                title: 'Revenue Per Category',
                                hAxis: { title: 'Category', titleTextStyle: { color: '#333' } },
                                vAxis: { minValue: 0 },
                                legend: { position: 'none' },
                                colors: ['#66CDAA'] // Custom color for the column chart
                            }}
                        />
                    </div>
                    {/* Product Sales Report */}
                    <Grid item xs={12} md={6}>
                        <div className="report-card">
                            <CardContent>
                                <Typography variant="h6" gutterBottom className="mb-4">Product Sales Report</Typography>
                                <table className="min-w-full">
                                    <thead>
                                        <tr>
                                            <th className="px-4 py-2">Product Name</th>
                                            <th className="px-4 py-2">Quantity Sold</th>
                                            <th className="px-4 py-2">Revenue Generated</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {productSalesData.map((product) => (
                                            <tr key={product.productId}>
                                                <td className="border px-4 py-2">{product.productName}</td>
                                                <td className="border px-4 py-2">{product.quantitySold}</td>
                                                <td className="border px-4 py-2">&#8377;{product.revenueGenerated}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                                <div className="mt-4">
                                    <button className="border-2 bg-black text-white p-2 mr-2 hover:p-3" onClick={() => downloadAsPdf(document.querySelector('.report-card'), 'product_sales_report.pdf')}>Download as PDF</button>
                                    <button className="border-2 bg-white text-black p-2 hover:p-3" onClick={() => downloadAsExcel(productSalesData, 'product_sales_report.csv')}>Download as Excel</button>
                                </div>
                            </CardContent>
                        </div>
                    </Grid>

                    {/* Inventory Performance Report */}
                    <Grid item xs={12} md={6}>
                        <div className="report-card">
                            <CardContent>
                                <Typography variant="h6" gutterBottom className="mb-4">Inventory Performance Report</Typography>
                                <table className="min-w-full">
                                    <thead>
                                        <tr>
                                            <th className="px-4 py-2">Product Name</th>
                                            <th className="px-4 py-2">Turnover Rate</th>
                                            <th className="px-4 py-2">Current Stock Level</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {inventoryPerformance.map((product) => (
                                            <tr key={product.productId}>
                                                <td className="border px-4 py-2">{product.productName}</td>
                                                <td className="border px-4 py-2">{product.turnoverRate.toFixed(2)}</td>
                                                <td className="border px-4 py-2">{product.currentStockLevel}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                                <div className="mt-4">
                                    <button className="border-2 bg-black text-white p-2 mr-2 hover:p-3" onClick={() => downloadAsPdf(document.querySelectorAll('.report-card')[1], 'inventory_performance_report.pdf')}>Download as PDF</button>
                                    <button className="border-2 bg-white text-black p-2 hover:p-3" onClick={() => downloadAsExcel(inventoryPerformance, 'inventory_performance_report.csv')}>Download as Excel</button>
                                </div>
                            </CardContent>
                        </div>
                    </Grid>
              
                </>
            )}
        </div>
    );
}

export default Dashboard;

