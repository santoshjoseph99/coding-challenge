'use strict';

const Heap = require('heap');

const dateComparator = (a, b) => (a.date < b.date ? -1 : 0);

// Print all entries, across all of the sources, in chronological order.
module.exports = (logSources, printer) => {
  const minHeap = new Heap(dateComparator);

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
  printer.done();
  return console.log('Sync sort complete.');
};
