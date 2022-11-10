// eslint-disable-next-line @typescript-eslint/no-explicit-any
export class Reference<T extends { [index: string | symbol]: any }> {
    instance: T | null

    constructor() {
        this.instance = null
    }

    asProxy() {
        return new Proxy({} as T, {
            get: (_, property: keyof T) => {
                if (this.instance === null) {
                    throw new Error(`Reference is not initialized.`)
                }

                return this.instance[property]
            }
        })
    }
}
