export interface FuzzingStrategy {
    readonly aliases : Array<String>
    validate (config: any) : Array<String>
    getPermutations (config: any) : IterableIterator<Object>
}