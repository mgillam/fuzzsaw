export interface FuzzingStrategy {
    readonly aliases : Array<String>
    validate (config: any) : Array<String>
    execute (config: any) : Promise<any>
}