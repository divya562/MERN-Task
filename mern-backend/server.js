import express from "express"
import axios from "axios"
import cors from "cors"

const app = express()
app.use(cors({ origin: '*' }))

const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];

const THIRD_PARTY_API_URL = "https://s3.amazonaws.com/roxiler.com/product_transaction.json";

const fetchTransactions = async () => {
    try {
        const response = await axios.get(THIRD_PARTY_API_URL);
        return response.data; 
    } catch (error) {
        console.error("Error fetching transactions:", error.message);
        return []; 
    }
};

const calculateStatistics = (transactions, month) => {
    const filteredTransactions = transactions.filter(transaction => {
        const transactionDate = transaction.dateOfSale
        const date = new Date(transactionDate);
        const transactionMonth = date.getMonth();
        return transactionMonth === month;
    });
    // console.log(filteredTransactions)
    const totalSaleAmount = filteredTransactions.reduce((total, transaction) => {
        return total + parseFloat(transaction.price);
    }, 0);

    const totalSoldItems = filteredTransactions.filter(transaction => transaction.sold).length

    const totalNotSoldItems = filteredTransactions.length - totalSoldItems;

    return {
        totalSaleAmount,
        totalSoldItems,
        totalNotSoldItems
    };
};

const calculatePriceRanges = (transactions) => {
    const priceRanges = {
        "0-100": 0,
        "101-200": 0,
        "201-300": 0,
        "301-400": 0,
        "401-500": 0,
        "501-600": 0,
        "601-700": 0,
        "701-800": 0,
        "801-900": 0,
        "901-above": 0
    };

    // console.log(transactions);
    transactions.reduce((ranges, transaction) => {
        const price = parseFloat(transaction.price);

        if (price >= 0 && price <= 100) {
            ranges["0-100"]++;
        } else if (price >= 101 && price <= 200) {
            ranges["101-200"]++;
        } else if (price >= 201 && price <= 300) {
            ranges["201-300"]++;
        } else if (price >= 301 && price <= 400) {
            ranges["301-400"]++;
        } else if (price >= 401 && price <= 500) {
            ranges["401-500"]++;
        } else if (price >= 501 && price <= 600) {
            ranges["501-600"]++;
        } else if (price >= 601 && price <= 700) {
            ranges["601-700"]++;
        } else if (price >= 701 && price <= 800) {
            ranges["701-800"]++;
        } else if (price >= 801 && price <= 900) {
            ranges["801-900"]++;
        } else if (price >= 901) {
            ranges["901-above"]++;
        }

        return ranges;
    }, priceRanges);

    return priceRanges;
};

app.get('/api/transaction', async (req, res) => {
    try {
        const { search = '', page = 1, perPage = 10, month } = req.query;
        const transactions = await fetchTransactions();

        const filteredTransactions = transactions.filter(transaction => {
            const transactionDate = transaction.dateOfSale
            const date = new Date(transactionDate);
            const transactionMonth = date.getMonth();
            const inputMonthIndex = monthNames.indexOf(month);
            return transactionMonth === inputMonthIndex;

        });

        let searchTransactions = filteredTransactions
        if (search.trim() !== '') {
            const searchQuery = search.toLowerCase();
            searchTransactions = filteredTransactions.filter(transaction =>
                transaction.title.toLowerCase().includes(searchQuery) ||
                transaction.description.toLowerCase().includes(searchQuery) ||
                transaction.price.toString().includes(searchQuery)
            );
        }

        const startIndex = (page - 1) * perPage;
        const endIndex = startIndex + perPage;
        const paginatedTransactions = searchTransactions.slice(startIndex, endIndex);


        res.json(
            {
                total: searchTransactions.length,
                transactions: paginatedTransactions
            }
        );
    } catch (error) {
        console.error('Error fetching data transactions:', error.message);
        res.status(500).json({ error: 'Server error' });
    }
})

app.get('/api/TransactionStatistic', async (req, res) => {
    try {
        const { month } = req.query;
        // console.log(month);
        if (!month || !monthNames.includes(month)) {
            return res.status(400).json({ error: "Invalid month parameter" });
        }


        const transactions = await fetchTransactions();
        const parsedMonthIndex = monthNames.indexOf(month);
        const statistics = calculateStatistics(transactions, parsedMonthIndex);

        res.json(statistics);
    } catch (error) {
        console.error('Error fetching transaction statistics:', error.message);
        res.status(500).json({ error: 'Server error' });
    }
});


app.get('/api/bar-chart', async (req, res) => {
    try {
        const { month } = req.query;
        const transactions = await fetchTransactions();
        // console.log(transactions);
        const filteredTransactions = transactions.filter(transaction => {
            const transactionDate = transaction.dateOfSale
            const date = new Date(transactionDate);
            const transactionMonth = date.getMonth();
            const inputMonthIndex = monthNames.indexOf(month);
            return transactionMonth === inputMonthIndex;

        });
        // console.log(filteredTransactions);
        const priceRanges = calculatePriceRanges(filteredTransactions);
        //    console.log(priceRanges);
        res.json(priceRanges);
    } catch (error) {
        console.error('Error fetching bar chart data:', error.message);
        res.status(500).json({ error: 'Server error' });
    }
});
app.get('/api/combined-data', async (req, res) => {
    try {
        const { month } = req.query;
        const transactions = await fetchTransactions();
        const parsedMonthIndex = monthNames.indexOf(month);

        const statistics = calculateStatistics(transactions, parsedMonthIndex);

        const filteredTransactions = transactions.filter(transaction => {
            const transactionDate = transaction.dateOfSale;
            const date = new Date(transactionDate);
            const transactionMonth = date.getMonth();
            return transactionMonth === parsedMonthIndex;
        });
        const priceRanges = calculatePriceRanges(filteredTransactions);

        const combinedData = {
            statistics,
            priceRanges,
            transactions: filteredTransactions
        };

        res.json(combinedData);
    } catch (error) {
        console.error('Error fetching combined data:', error.message);
        res.status(500).json({ error: 'Server error' });
    }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

