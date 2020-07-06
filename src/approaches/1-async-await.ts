//models
import { BatchProcessingOptions, defaultBatchProcessingOptions } from '../models';

// data-management
import { retrieveCompanies, retrieveCompanyOrders, sendBulkEmails } from '../data-management';

export const approach1AsyncAwait = async (options: BatchProcessingOptions = {}) => {
  options = {
    ...defaultBatchProcessingOptions,
    ...options,
  };
  for (let curOffset = 0; curOffset < Infinity; curOffset += options.batchSize as any) {
    const curBatch = await retrieveCompanies(options.batchSize as any, curOffset);
    if (curBatch.length === 0) {
      break;
    }
    for (const company of curBatch) {
      company.orders = await retrieveCompanyOrders(company);
    }
    await sendBulkEmails(curBatch);
  }
};
