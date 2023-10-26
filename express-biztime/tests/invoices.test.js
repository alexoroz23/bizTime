const request = require('supertest');
const app = require('../app');
const db = require('../db');

// Function to seed the database with test data
const seedDatabase = async () => {
  // Perform any necessary setup here (e.g., database seeding)
  // You can insert test data into the database here
  await db.query(
    `INSERT INTO invoices (comp_code, amt)
     VALUES ('testco', 100.00)`
  );
};

// Function to clean up and close the database connection
const cleanupDatabase = async () => {
  // Perform any necessary cleanup here (e.g., deleting test data)
  await db.query(`DELETE FROM invoices WHERE comp_code = 'testco'`);
  // Close the database connection
  db.end();
};

// Set up the test environment
beforeAll(async () => {
  await seedDatabase();
});

// Clean up the test environment
afterAll(async () => {
  await cleanupDatabase();
});

describe('GET /invoices', () => {
  it('should return a list of invoices', async () => {
    const response = await request(app).get('/invoices');
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('invoices');
    expect(response.body.invoices.length).toBeGreaterThan(0);
  });
});

describe('POST /invoices', () => {
  it('should add a new invoice', async () => {
    const newInvoice = { comp_code: 'testco', amt: 200.00 };
    const response = await request(app)
      .post('/invoices')
      .send(newInvoice);
    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty('invoice');
    expect(response.body.invoice).toEqual(expect.objectContaining(newInvoice));
  });
});

describe('GET /invoices/:id', () => {
  it('should return details of a specific invoice', async () => {
    const response = await request(app).get('/invoices/1');
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('invoice');
    expect(response.body.invoice).toEqual(
      expect.objectContaining({
        id: 1,
        comp_code: 'testco',
        amt: 100.00,
        paid: false,
        add_date: expect.any(String), // You can validate the date format
        paid_date: null,
      })
    );
  });

  it('should return a 404 status for a non-existent invoice', async () => {
    const response = await request(app).get('/invoices/999');
    expect(response.statusCode).toBe(404);
  });
});
