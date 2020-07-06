//models
import { BatchProcessingOptions, defaultBatchProcessingOptions } from '../models';

// data-management
import { retrieveCompanies, retrieveCompanyOrders, sendBulkEmails } from '../data-management';

export const approach2PromiseAll = async (options: BatchProcessingOptions = {}) => {
  options = {
    ...defaultBatchProcessingOptions,
    ...options,
  };
  for (let curOffset = 0; curOffset < Infinity; curOffset += options.batchSize as any) {
    const curBatch = await retrieveCompanies(options.batchSize as any, curOffset);
    if (curBatch.length === 0) {
      break;
    }
    await Promise.all(
      curBatch.map(async (company: any) => {
        company.orders = await retrieveCompanyOrders(company);
      }),
    );
    await sendBulkEmails(curBatch);
  }
};
