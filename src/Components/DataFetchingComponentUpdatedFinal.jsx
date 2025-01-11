import React, { useEffect, useState } from 'react';
import axios from 'axios';

const DataFetchingComponent = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchData();
    }, []);
    
    const fetchData = async () => {
        try {
            const response = await axios.get('https://s3.amazonaws.com/roxiler.com/product_transaction.json'); // Updated URL
            console.log(response);
            if (response.status !== 200) {
                throw new Error('Network response was not ok');
            }
            const result = response.data;
            setData(result);
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        }
    };
    
    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    return (
        <div>
            <h1>Fetched Data</h1>
            <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
    );
};

export default DataFetchingComponent;
