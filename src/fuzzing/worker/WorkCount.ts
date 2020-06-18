export default class {
    started = 0;
    finished = 0;
    allRetrieved = false;
    subsNotified = false;
    subscriptions : Function[] = [];

    constructor() {}

    subscribe(): Promise<any> {
        let subscription = new Promise((resolve) => {
            this.subscriptions.push(resolve);
        });
        return subscription;
    }

    start(): void {
        this.started++;
    }

    finish(): void {
        this.finished++;
        //Notify all subscribers
        if(this.allRetrieved && this.started === this.finished && !this.subsNotified) {
            this.subsNotified = true;
            for(let sub of this.subscriptions) {
                sub(this.finished);
            }
        }
    }

    lastRetrieved(): void {
        this.allRetrieved = true;
        if(this.started === this.finished && !this.subsNotified) {
            this.subsNotified = true;
            for(let sub of this.subscriptions) {
                sub(this.finished);
            }
        }

    }



}