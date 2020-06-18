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
    async execute(config: any): Promise<any> {
        const connectionFactory = SequentialFuzzingStrategy.getConnectionFactory(config);
        console.log('config', JSON.stringify(config));
  
        let wordList = await fs.open(config.word_list, 'r').then((fileHandle) => {
                return fileHandle.readFile();
            }).then((bufferedFile) => {
                return new Promise<Array<string>>((resolve) => {
                    resolve(bufferedFile.toString("utf8").split('\n'));
                });
            }).catch((reason) => {
                throw Error(reason);
            });

        let templateRunners = config.payloads.map((payload: any) => {
            if(payload.template_src = 'inline') {
                return new SqrlTemplateRenderer(config[payload.name].string, config[payload.name].variables);
            }
        });
        let results: Array<Promise<any>> = [];
        for(let i = 0; i < config.word_locations.length; i++) {
            let defaults: any = {};
            config.word_locations.forEach((loc: { key: string, default: string }, idx: number) => {
              if(i != idx) {
                  defaults[loc.key] = loc.default;
              }
            });
            let currentKey = config.word_locations[i].key;
            results = wordList.map(word => {
                let data: any = Object.assign({}, defaults);
                data[currentKey] = word;
                return connectionFactory().sendPayloads(templateRunners, data);
            });
        }
        return Promise.all(results).then(console.log);
    }

    private static getConnectionFactory(config: any): IConnectionFactory {
        switch(config.connection.type) {
          case "websocket":
            new SocketAdapter(config.connection.endpoint);
            return (() => { let endpoint = config.connection.endpoint; return () => { return new SocketAdapter(endpoint); } })();
          default:
            throw Error(`Unsupported connection type '${config.connection.type}'`);
        }
      }

}

export interface IConnectionFactory {
    (): CommunicationAdapter
}