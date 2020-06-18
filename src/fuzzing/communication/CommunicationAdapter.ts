import TemplateRenderer from "../rendering/TemplateRenderer";
import Traffic from "./Traffic";

export interface CommunicationAdapter {
    init(): void;
    send(payload: string): Promise<Array<Traffic>>;
    destroy(): void;
}