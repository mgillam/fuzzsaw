import Traffic from "./Traffic";

export default class RealtimeBidirectionalTraffic implements Traffic {
    public direction: TrafficDirection | undefined;
    public payload: string | undefined; 
    public readonly metrics: { largestResponse?: number | undefined; smallestResponse?: number | undefined; responses?: number | undefined; } = {};
    public isError: boolean = false;

    constructor(direction?: TrafficDirection, payload?: string) {
        if(direction && payload) {
            this.direction = direction;
            this.payload = payload;
        }
    }

    toString(): string {
        return `Message ${this.direction}
        
        ${this.payload}
        ---END---


        `
    }
}

export enum TrafficDirection {
    CLIENT_TO_SERVER = "Client -> Server",
    SERVER_TO_CLIENT = "Client <- Server"
}