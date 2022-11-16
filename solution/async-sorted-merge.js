'use strict';

const Heap = require('heap');

const dateComparator = (a, b) => (a.date < b.date ? -1 : 0);
// Print all entries, across all of the *async* sources, in chronological order.

module.exports = async (logSources, printer) => {
  const minHeap = new Heap(dateComparator);
  const promises = [];
  logSources.forEach((logSource) => {
    promises.push(logSource.popAsync());
  });
  const results = await Promise.all(promises);
  results.forEach((result, i) => {
    minHeap.push({...result, logSource: logSources[i]});
  });
  let finishedSourceCount = 0;
  while (true) {
    const logEntry = minHeap.pop();
    printer.print({date: logEntry.date, msg: logEntry.msg});
    const newLogEntry = await logEntry.logSource.popAsync();
    if (newLogEntry) {
      minHeap.push({...newLogEntry, logSource: logEntry.logSource});
    } else {
      ++finishedSourceCount;
      if (finishedSourceCount === logSources.length) {
        break;
      }
    }
  }
  printer.done();
  console.log('Async sort complete.');
  return;
};
