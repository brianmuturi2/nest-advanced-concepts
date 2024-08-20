import { Module, OnApplicationBootstrap } from '@nestjs/common';
import { TagsService } from './tags.service';
import { TagsController } from './tags.controller';
import { ContextIdFactory, ModuleRef } from '@nestjs/core';

@Module({
  controllers: [TagsController],
  providers: [TagsService],
})
export class TagsModule implements OnApplicationBootstrap {
  constructor(private readonly moduleRef: ModuleRef){}

  async onApplicationBootstrap() {
    const contextId = ContextIdFactory.create();
    this.moduleRef.registerRequestByContextId({hello: 'world'}, contextId);
    const tagsService = await this.moduleRef.resolve(TagsService, contextId); // tag service is a root node of created di subtree identified uniquely with a context id which is generated automatically context id isn't passed
    console.log('tags service', tagsService);
  }
}
