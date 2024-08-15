import { Injectable } from '@nestjs/common';

@Injectable()
export class RewardsService {
    grantTo() {
        console.log('Hello from Lazy loaded rewards service')
    }
}
