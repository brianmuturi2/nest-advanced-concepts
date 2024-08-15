import { Injectable, OnApplicationBootstrap, OnApplicationShutdown } from "@nestjs/common";
import { randomUUID } from "crypto";
import { from } from "form-data";
import { join } from "path";
import { filter, firstValueFrom, fromEvent, map, Observable } from "rxjs";
import { Worker } from "worker_threads";

@Injectable()
export class FibonacciWorkerHost implements OnApplicationBootstrap, OnApplicationShutdown {

    private worker: Worker;
    private message$: Observable<{id: string; result: number;}>;

    onApplicationBootstrap() {
        this.worker = new Worker(join(__dirname, 'fibonacci.worker.js'));
        this.message$ = fromEvent(this.worker, 'message') as unknown as Observable<{id: string; result: number;}>
    }

    async onApplicationShutdown(signal?: string) {
        this.worker.terminate();
    }

    run(n: number) {
        const uniqueId = randomUUID();
        this.worker.postMessage({n, id: uniqueId});
        return firstValueFrom(
            this.message$.pipe(
                filter(({id}) => id === uniqueId),
                map(({result}) => result)
            )
        )
    }
}