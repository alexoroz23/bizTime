# bizTime

BizTime - Company & Invoice Tracker
BizTime is a simple RESTful backend API server for tracking companies and invoices. It allows you to manage companies, their invoices, and associated data.

Setup
Project Initialization

Create a project folder.
Initialize a Git repository.
Create a package.json file.
Dependencies

Install express and pg via NPM.
Add node_modules to your .gitignore file.
Database Setup

Create a PostgreSQL database named "biztime."
Load initial data from data.sql.
Configure db.js to connect to the database.
Company Routes
GET /companies: Get a list of companies.
GET /companies/[code]: Get details of a specific company.
POST /companies: Add a new company.
PUT /companies/[code]: Edit an existing company.
DELETE /companies/[code]: Delete a company.
Invoice Routes
GET /invoices: Get information on invoices.
GET /invoices/[id]: Get details of a specific invoice.
POST /invoices: Add a new invoice.
PUT /invoices/[id]: Update an existing invoice.
DELETE /invoices/[id]: Delete an invoice.
Usage
Ensure the requests and responses use JSON format.
Handle 404 status responses for not found resources.
Update GET /companies/[code] to include a list of associated invoices.
That's it! You're ready to start building your BizTime project.

For more details, refer to the project's source code and follow the instructions provided in the exercise.
