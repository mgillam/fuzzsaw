import PairedRequestResponse from "../fuzzing/communication/PairedRequestResponse";
import RealtimeBidirectionalTraffic from "../fuzzing/communication/RealtimeBidirectionalTraffic";
import Traffic from "../fuzzing/communication/Traffic";

export default interface OutputAdapter {
    writeTraffic (traffic: Array<Traffic>): Promise<any>
    writeLog (log: string): Promise<any>
}