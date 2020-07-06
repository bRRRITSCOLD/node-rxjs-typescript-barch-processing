export interface Company {
  id: number;
  name: string;
  city: string;
  countryCode: string;
  orders?: Order[];
}

export interface Order {
  id: number;
  productName: string;
  price: string;
  purchaseDate: Date;
}

export interface BatchProcessingOptions {
  /** The amount of companies to fetch in one request. */
  batchSize?: number;
  /** The amount of companies to be queued for processing. */
  maxQueueSize?: number;
  /** The number of concurrent requests to fetch companies.  Should be higher than batchSize. */
  retrieveCompaniesConcurrency?: number;
  /** The number of concurrent requests to fetch a company's orders. */
  retrieveOrdersConcurrency?: number;
  /** The number of concurrent requests to send bulk email.  Should be lower than batchSize. */
  bulkEmailConcurrency?: number;
  /** The maximum number of emails to send in one request. */
  maxBulkEmailCount?: number;
}

export const validateBatchProcessingOptions = (options: BatchProcessingOptions) => {
  if ((options.maxQueueSize as any) < (options.batchSize as any)) {
    console.warn(`Invalid options: maxQueueSize ${options.maxQueueSize} must be higher than batchSize ${options.batchSize}.`);
    return;
  }
  if ((options.maxBulkEmailCount as any) > (options.batchSize as any)) {
    console.warn(`Invalid options: maxBulkEmailCount ${options.maxBulkEmailCount} cannot be higher than ${options.batchSize}.`);
    return;
  }
};

export const defaultBatchProcessingOptions: BatchProcessingOptions = {
  batchSize: 5,
  maxQueueSize: 15,
  retrieveCompaniesConcurrency: 1,
  retrieveOrdersConcurrency: 5,
  bulkEmailConcurrency: 5,
  maxBulkEmailCount: 5,
};

export class Timer {
  public start: number;
  public constructor(private name: string) {
    this.start = Date.now();
  }
  public stop() {
    const stop = Date.now() - this.start;
    console.log(`${this.name} took ${stop}ms`);
    return stop;
  }
}
