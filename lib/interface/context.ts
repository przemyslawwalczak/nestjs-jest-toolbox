import { INestApplication, ModuleMetadata } from '@nestjs/common'
import { TestingModuleBuilder, TestingModule } from '@nestjs/testing'
import { Reference } from '../util'

export interface ContextSetupHooks {
    metadata: ModuleMetadata,
    withBuilder?: (builder: TestingModuleBuilder) => void | Promise<void>,
    withTestingModule?: (module: TestingModule) => void | Promise<void>,
    withApplication?: (app: INestApplication) => void | Promise<void>
}

export interface ContextFixture {
    app: Reference<INestApplication>,
    builder: TestingModuleBuilder
}
