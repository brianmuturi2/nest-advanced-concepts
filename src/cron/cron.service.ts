import { Injectable } from '@nestjs/common';
import { IntervalHost } from 'src/scheduler/decorators/interval-host.decorators';
import { Interval } from 'src/scheduler/decorators/interval.decorator';

@IntervalHost
export class CronService {
    @Interval(1000)
    everySecond() { 
        console.log('This will be logged every second')
    }
}
