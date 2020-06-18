import Traffic from "./Traffic";

export default class PairedRequestResponse implements Traffic {
    private request : string;
    private response : string;
    public readonly metrics: { largestResponse?: number | undefined; smallestResponse?: number | undefined; responses?: number | undefined; } = {};
    public isError: boolean = false;

    constructor(request?: string, response?: string) {
        this.request = request || "No Request Sent";
        this.response = response || "No Response Received";
    }

    getRequest(): string {
        return this.request;
    }

    setRequest(request: string): void {
      this.request = request;
    }

    getResponse(): string {
        return this.response;
    }

    setResponse(response: string): void {
        this.response = response;
    }

    toString(): string {
        return `Request:
        ${this.request}

        Response:
        ${this.response}
        ---END---

        `
    }
}