'use strict';

const Heap = require('heap');

const dateComparator = (a, b) => (a.date.getTime() < b.date.getTime() ? -1 : 0);
// Print all entries, across all of the *async* sources, in chronological order.

module.exports = (logSources, printer) => {
  return new Promise((resolve, reject) => {
    resolve(console.log('Async sort complete.'));
    // const minHeap = new Heap(dateComparator);
    // minHeap.limit = logSources.length;

    // const promises = [];
    // logSources.forEach((logSource) => {
    //   promises.push({...logSource.popAsync(), logSource});
    // });
    // Promise.all(promises).then((results) => {
    //   let finishedSourceCount = 0;
    //   while (true) {
    //     const logEntry = minHeap.pop();
    //     printer.print({date: logEntry.date, msg: logEntry.msg});
    //     logEntry.logSource.popAsync().then(newLogEntry => {
    //       if (newLogEntry) {
    //         minHeap.push({...newLogEntry, logSource: logEntry.logSource});
    //       } else {
    //         finishedSourceCount++;
    //         if (finishedSourceCount === logSources.length) {
    //           break;
    //         }
    //       }
    //     })
    //   }
    // resolve(console.log('Async sort complete.'));
    // });
  });
};
