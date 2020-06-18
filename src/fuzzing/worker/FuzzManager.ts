import { CommunicationAdapter } from "../communication/CommunicationAdapter";
import { generateKeyPair } from "crypto";
import OutputAdapter from "../../output/OutputAdapter";
import ConsoleOutputAdapter from "../../output/ConsoleOutputAdapter";
import { worker } from "cluster";
import FuzzWorker from "./fuzzWorker";
import WorkCount from "./WorkCount";

export default class FuzzManager<CA extends CommunicationAdapter> {
    templates: Function[];
    communicationConfig: Object;
    dataProvider: Generator<Object, any, unknown>;
    outputAdapter: OutputAdapter;
    private workStartedCount: number = 0;
    private workFinishedCount: number = 0;
    private workCount: WorkCount = new WorkCount();

    ComAdapter: new (params: any) => CA;

    constructor(ComAdapter : new (params: any) => CA,
            communicationConfig : Object,
            templates : Array<Function>,
            dataProvider : Generator<Object>, 
            outputAdapter : OutputAdapter = new ConsoleOutputAdapter()) {
        this.ComAdapter = ComAdapter;
        this.templates = templates;
        this.communicationConfig = communicationConfig;
        this.dataProvider = dataProvider;
        this.outputAdapter = outputAdapter;
    }

    start(maxWorkerCount: number) {
        let foo = new this.ComAdapter(this.communicationConfig);
        for(let n = 1; n <= maxWorkerCount; n++) {
            let { value : data, done } = this.dataProvider.next();
            if(!done) {
                FuzzWorker(this.templates, data, foo).then((result) => { this.outputAdapter.writeTraffic(result)})
            }
        }

    }
}