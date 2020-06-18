export default interface Traffic {
    readonly metrics: {
        largestResponse? : number,
        smallestResponse? : number,
        responses? : number
    }

    isError: boolean
}