
# Transaction Table

## Deployed Link : https://mern-task-frontend-cqdw.onrender.com/

## Backend

### Data Source

- **THIRD PARTY API URL:** https://s3.amazonaws.com/roxiler.com/product_transaction.json
- **REQUEST METHOD:** GET
- **RESPONSE FORMAT:** JSON

### Initialize Database API

Create an API endpoint to fetch JSON data from the third-party API and initialize the database with seed data.


### List Transactions API

Create an API endpoint to list all transactions based on the month parameter. Supports search and pagination on product transactions.

- **Endpoint:** `/api/transaction`
- **Parameters:**
  - `search`: Search text for product title, description, or price.
  - `page`: Page number for pagination (default: 1).
  - `perPage`: Number of items per page (default: 10).
  - `month`: Month filter (January to December).

---

### Statistics API

Create an API endpoint to fetch statistics for the selected month.

- **Endpoint:** `/api/TransactionStatistic`
- **Parameters:**
  - `month`: Month filter (January to December).

### Bar Chart API

Create an API endpoint to generate data for a bar chart displaying price ranges and the number of items in each range for the selected month.

- **Endpoint:** `/api/bar-chart`
- **Parameters:**
  - `month`: Month filter (January to December).

## Frontend 

### Transactions Table

- Display a table listing transactions for the selected month.
- Default to March with a dropdown to select months (January to December).
- Support search by product title, description, or price.
- Pagination with Next and Previous buttons.


### Transactions Statistics

- Display total amount of sale, total sold items, and total not sold items for the selected month.
- Update based on the month selected in the dropdown above the table.


### Transactions Bar Chart

- Display a bar chart showing price ranges and the number of items in each range for the selected month.
- Update based on the month selected in the dropdown above the table.


---

## Acknowledgments

Acknowledge any libraries, resources, or individuals whose work you used or referenced.

