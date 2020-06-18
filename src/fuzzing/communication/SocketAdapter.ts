import { CommunicationAdapter } from "./CommunicationAdapter";
// import io from "socket.io-client";
import WebSocket from "ws";
import TemplateRenderer from "../rendering/TemplateRenderer";
import Traffic from "./Traffic";
import RealtimeBidirectionalTraffic, { TrafficDirection } from "./RealtimeBidirectionalTraffic";
import { compileScopeIntoFunction } from "squirrelly";

export class SocketAdapter implements CommunicationAdapter {
    private connectionEndpoint: string;
    private output : Array<Traffic> = [];
    private socket: any;

    constructor({connectionEndpoint }: {connectionEndpoint: string}) {
        this.connectionEndpoint = connectionEndpoint;
    }
    init(): void {
        throw new Error("Method not implemented.");
    }
    send(payload: string): Promise<Traffic[]> {
        throw new Error("Method not implemented.");
    }
    destroy(): void {
        throw new Error("Method not implemented.");
    }

    sendPayloads(payloads: Array<TemplateRenderer>, intialData: any): Promise<Array<Traffic>> {
        return new Promise(resolve => {
            var wsURI = this.connectionEndpoint;
            if(payloads.length === 0) {
                throw Error("Attempted to run socket fuzzing payloads without and payloads");
            }
            var socket = new WebSocket(wsURI);
            this.socket = socket;
            socket.on('open', () => {
                console.log('socket connected');
                let template = payloads.shift();
                if(template) {
                console.log("Message sent");
                let message = template.render(intialData);
                socket.send(message);
                this.output.push(new RealtimeBidirectionalTraffic(TrafficDirection.CLIENT_TO_SERVER, message));
                }
            });
    
            socket.on('message', (message) => {
                this.output.push(new RealtimeBidirectionalTraffic(TrafficDirection.SERVER_TO_CLIENT, message.toString()));
            });
    
            socket.on('error', (error : any) => {
                console.log('Connection ERROR!', error)
            });
    
            socket.on('close', () => {
                console.log('socket closed');
            });

            setTimeout(()=>{ this.socket.close(); resolve(this.output)}, 10000);
        })


    }

}