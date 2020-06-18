import { CommunicationAdapter } from "../communication/CommunicationAdapter";
import Traffic from "../communication/Traffic";

export default function FuzzWorker(templates: Function[],
    data: Object,
    commAdapter: CommunicationAdapter) : Promise<Array<Traffic>> {
        return commAdapter.send(templates[0](data));
}
