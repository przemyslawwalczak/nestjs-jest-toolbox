import request from 'supertest'
import { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import { ContextFixture, ContextSetupHooks } from './interface'
import { Reference } from './util'

export const setupNestApplication = (context: ContextSetupHooks) => {
    const { metadata, withBuilder, withTestingModule, withApplication } = context

    const fixture: ContextFixture = {
        app: new Reference<INestApplication>(),
        builder: Test.createTestingModule(metadata)
    }

    beforeAll(async () => {
        if (withBuilder) {
            await withBuilder(fixture.builder)
        }

        const module = await fixture.builder.compile()

        if (withTestingModule) {
            await withTestingModule(module)
        }

        const app = module.createNestApplication()

        if (withApplication) {
            await withApplication(app)
        }

        fixture.app.instance = await app.init()
    })

    afterAll(async () => {
        const { instance } = fixture.app

        if (instance) {
            await instance.close()
        }
    })

    const app = fixture.app.asProxy()

    return {
        app,
        withHttpRequest: () => request(app.getHttpServer())
    }
}
