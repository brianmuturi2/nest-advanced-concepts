import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoffeesModule } from './coffees/coffees.module';
import { SchedulerModule } from './scheduler/scheduler.module';
import { CronModule } from './cron/cron.module';
import { FibonacciModule } from './fibonacci/fibonacci.module';
import { HttpClientModule } from './http-client/http-client.module';
import { TagsModule } from './tags/tags.module';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { PaymentsModule } from './payments/payments.module';
import { DataSourceModule } from './data-source/data-source.module';
import { UsersModule } from './users/users.module';
import { ContextIdFactory } from '@nestjs/core';
import { AggregateByTenentContextIdStrategy } from './core/aggregate-by-tenant.strategy';

ContextIdFactory.apply(new AggregateByTenentContextIdStrategy());

@Module({
  imports: [EventEmitterModule.forRoot(), CoffeesModule, SchedulerModule, CronModule, FibonacciModule, HttpClientModule.register({baseUrl: 'http://nestjs.com', isGlobal: true}), TagsModule, PaymentsModule, DataSourceModule, UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
