// models
import { BatchProcessingOptions, Timer } from './models';

// approaches
import { approach1AsyncAwait } from './approaches/1-async-await';
import { approach2PromiseAll } from './approaches/2-promise-all';
import { approach3Observable } from './approaches/3-observable';
import { approach4ObservableImproved } from './approaches/4-observable-improved';

export const benchmark = async (
  name: string,
  approach: (options: BatchProcessingOptions) => Promise<void>,
  repetitions: number,
  approachOptions?: BatchProcessingOptions | any,
): Promise<number> => {
  let totalTime = 0;
  for (let i = 0; i < repetitions; i++) {
    const t1 = new Timer(`Run ${i + 1}/${repetitions} ${name}`);
    await approach(approachOptions);
    totalTime += t1.stop();
  }
  const avg = Math.round(totalTime / repetitions);
  console.log(`Avg ${name}: ${avg}ms`);
  return avg;
};

const evaluateOptions = async () => {
  const avg1 = await benchmark('1-async-await', approach1AsyncAwait, 3);
  const avg2 = await benchmark('2-promise-all', approach2PromiseAll, 3);
  const avg3 = await benchmark('3-observable', approach3Observable, 3);
  const avg4 = await benchmark('4-0bservable-improved', approach4ObservableImproved, 3);
  console.log(`2 vs 1 speed-up: ${(avg1 / avg2).toFixed(2)}x`);
  console.log(`3 vs 2 speed-up: ${(avg2 / avg3).toFixed(2)}x`);
  console.log(`4 vs 1 speed-up: ${(avg1 / avg4).toFixed(2)}x`);
  console.log(`4 vs 2 speed-up: ${(avg2 / avg4).toFixed(2)}x`);
};

(async () => {
  try {
    await evaluateOptions();
    process.exit(0);
  } catch (error) {
    process.exit(1);
  }
})();
