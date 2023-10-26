const request = require('supertest');
const app = require('../app');
const db = require('../db');

// Function to seed the database with test data
const seedDatabase = async () => {
  // Perform any necessary setup here (e.g., database seeding)
  // You can insert test data into the database here
  await db.query(
    `INSERT INTO companies (code, name, description)
     VALUES ('testco', 'Test Company', 'A test company')`
  );
};

// Function to clean up and close the database connection
const cleanupDatabase = async () => {
  // Perform any necessary cleanup here (e.g., deleting test data)
  await db.query(`DELETE FROM companies WHERE code = 'testco'`);
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

describe('GET /companies', () => {
  it('should return a list of companies', async () => {
    const response = await request(app).get('/companies');
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('companies');
    expect(response.body.companies.length).toBeGreaterThan(0);
  });
});

describe('POST /companies', () => {
  it('should add a new company', async () => {
    const newCompany = { code: 'newco', name: 'New Company', description: 'A new company' };
    const response = await request(app)
      .post('/companies')
      .send(newCompany);
    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty('company');
    expect(response.body.company).toEqual(expect.objectContaining(newCompany));
  });
});

describe('GET /companies/:code', () => {
  it('should return details of a specific company', async () => {
    const response = await request(app).get('/companies/testco');
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('company');
    expect(response.body.company).toEqual(
      expect.objectContaining({
        code: 'testco',
        name: 'Test Company',
        description: 'A test company',
      })
    );
  });

  it('should return a 404 status for a non-existent company', async () => {
    const response = await request(app).get('/companies/nonexistent');
    expect(response.statusCode).toBe(404);
  });
});