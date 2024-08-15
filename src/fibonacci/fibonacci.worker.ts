import {parentPort} from 'worker_threads';

function fibonacci(n: number) {
    if (n < 2) {
        return n;
    }
    return fibonacci(n-1)+fibonacci(n-2);
}

// static worker
/* parentPort.on('message', ({n,id}) => {
    const result = fibonacci(n);
    parentPort.postMessage({result, id});
}); */

// dynamic worker
module.exports = (n: number) => {
    return fibonacci(n);
}