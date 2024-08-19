import { DynamicModule, Inject, Module } from '@nestjs/common';
import { ConfigurableModuleClass, HTTP_MODULE_OPTIONS, OPTIONS_TYPE } from './http-client.module-definition';

@Module({})
export class HttpClientModule extends ConfigurableModuleClass {
    constructor(@Inject(HTTP_MODULE_OPTIONS) private options) {
        console.log(options)
        super();
    }

    static register(options: typeof OPTIONS_TYPE): DynamicModule {
        return {
            // custom logic
            ...super.register(options)
        }
    }

    static registerAsync(options: typeof OPTIONS_TYPE): DynamicModule {
        return {
            // custom logic
            ...super.registerAsync(options)
        }
    }
}
