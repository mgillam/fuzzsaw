import FuzzManager from "./fuzzManager";
import { SocketAdapter } from "../communication/SocketAdapter";

function* myGenerator() {
  yield {}
}

let Foo = new FuzzManager(SocketAdapter, {}, [], myGenerator());