// node_modules
import { address, commerce, company, date, random } from 'faker';

// models
import { BatchProcessingOptions, Company, Order } from '../models';

// retrieveCompanies() will return no data after this limit is reached.
const TOTAL_COMPANY_COUNT = 100;

/**
 * Enable to introduce anomalies. This will multiply the delay of
 *   `retrieveCompanyOrders()` by `ANOMALY_MULTIPLIER` for every
 *   `ANOMALY_FREQUENCY` companies.
 */
const USE_ANOMALIES = false;
const ANOMALY_FREQUENCY = 10;
const ANOMALY_MULTIPLIER = 10;

// Enable to get random delays and order counts.
const USE_RANDOMNESS = false;

const RETRIEVE_ONE_COMPANY_DELAY = () => (USE_RANDOMNESS ? random.number({ min: 4, max: 8 }) : 6);
const RETRIEVE_ONE_COMPANY_ORDER_DELAY = () => (USE_RANDOMNESS ? random.number({ min: 3, max: 7 }) : 5);
const ORDERS_PER_COMPANY = () => (USE_RANDOMNESS ? random.number({ min: 4, max: 8 }) : 6);
const SEND_BULK_EMAILS_DELAY = () => (USE_RANDOMNESS ? random.number({ min: 40, max: 80 }) : 60);

/**
 * Fetch a chunk or batch of the primary object to iterate on.
 * Examples of a datasource could be:
 *   - API `fetch('https://swapi.co/api/people/')`
 *   - DB `select * from companies limit ${limit} offset ${offset}`
 * Another example is reading a file.  Libraries that read in chunks or
 *   line-by-line can be used in RxJS more natively.a
 */
export const retrieveCompanies = async (limit: number, offset: number): Promise<Company[]> => {
  await new Promise(resolve => setTimeout(resolve, RETRIEVE_ONE_COMPANY_DELAY() * limit));
  if (offset > TOTAL_COMPANY_COUNT) {
    return [];
  }
  return [...Array(Math.min(TOTAL_COMPANY_COUNT - offset, limit)).keys()].map(
    (i): Company => ({
      id: i + offset,
      name: company.companyName(),
      city: address.city(),
      countryCode: address.countryCode(),
    }),
  );
};

/**
 * For each company, fetch the company's orders.  This serves as an example
 *   where we need to fetch additional data for each of the primary objects
 *   we are iterating over.
 * Examples of a datasource could be:
 *   - API `https://swapi.co/api/people/${person.id}/`
 *   - DB `select * from orders where company = ${company.id}`
 */
export const retrieveCompanyOrders = async (company: Company): Promise<Order[]> => {
  const ordersPerCompany = ORDERS_PER_COMPANY();
  await new Promise(resolve =>
    setTimeout(
      resolve,
      // Apply the anomaly multiplier if enabled and the index is hit.
      (USE_ANOMALIES && (company.id + 1) % ANOMALY_FREQUENCY === 0 ? ANOMALY_MULTIPLIER : 1) *
        RETRIEVE_ONE_COMPANY_ORDER_DELAY() *
        ordersPerCompany,
    ),
  );
  return [...Array(ordersPerCompany).keys()].map(
    (_i): Order => ({
      id: random.number(100000),
      productName: commerce.product(),
      price: commerce.price(),
      purchaseDate: date.past(1),
    }),
  );
};

/**
 * Send multiple emails at a time using an email API.
 * Other real-world examples could be:
 *   - Dumping the data to a CSV.
 *   - Inserting the updated data back into the DB.
 *   - Indexing the data into a elasticsearch.
 */
export const sendBulkEmails = async (_bulkEmails: Company[]): Promise<void> => {
  await new Promise(resolve => setTimeout(resolve, SEND_BULK_EMAILS_DELAY()));
};
