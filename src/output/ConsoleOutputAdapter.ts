import OutputAdapter from "./OutputAdapter";
import PairedRequestResponse from '../fuzzing/communication/PairedRequestResponse';
import RealtimeBidirectionalTraffic from '../fuzzing/communication/RealtimeBidirectionalTraffic';
import chalk from 'chalk';

export default class ConsoleOutputAdapter implements OutputAdapter {
    writeLog(log: string): Promise<any> {
        throw new Error("Method not implemented.");
    }
    writeTraffic(traffic : Array<PairedRequestResponse> | Array<RealtimeBidirectionalTraffic>): Promise<any> {
        return new Promise((resolve) => {
            traffic.forEach((value: PairedRequestResponse | RealtimeBidirectionalTraffic) => {
                console.log(value.isError ? chalk.green(value.toString) : chalk.green(value.toString));
            })
            resolve(true);
        });
    }
}