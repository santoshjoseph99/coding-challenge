'use strict';

const Heap = require('heap-js').default;

const dateComparator = (a, b) => a.date.getTime() < b.date.getTime();

// Print all entries, across all of the sources, in chronological order.
module.exports = (logSources, printer) => {
  const minHeap = new Heap(dateComparator);
  minHeap.limit = logSources.length;

  logSources.forEach((logSource) => {
    minHeap.push({...logSource.pop(), logSource});
  });

  let finishedSourceCount = 0;
  while (true) {
    const logEntry = minHeap.pop();
    printer.print({date: logEntry.date, msg: logEntry.msg});
    const newLogEntry = logEntry.logSource.pop();
    if (newLogEntry) {
      minHeap.push({...newLogEntry, logSource: logEntry.logSource});
    } else {
      finishedSourceCount++;
      if (finishedSourceCount === logSources.length) {
        break;
      }
    }
  }

  return console.log('Sync sort complete.');
};
