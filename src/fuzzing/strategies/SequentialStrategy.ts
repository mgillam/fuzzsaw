import { FuzzingStrategy } from "./FuzzingStrategy";
import { CommunicationAdapter } from "../communication/CommunicationAdapter";
import { SocketAdapter } from "../communication/SocketAdapter";
import { SqrlTemplateRenderer } from "../rendering/SqrlTemplateRenderer";
import { promises as fs } from 'fs';

export class SequentialFuzzingStrategy implements FuzzingStrategy {
    public readonly aliases = ["sequential", "sniper"];

    validate(config: any): String[] {
        console.warn('Config file validation has not been implemented for this strategy. Proceeding anyway.');
        return [];
    }

    *getPermutations(config: any): IterableIterator<Object> {
        throw new Error("Method not implemented.");
    }
    
}