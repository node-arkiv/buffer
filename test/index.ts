import { StreamBuffer } from '../src/index';

const buf = new StreamBuffer();
buf.writeUint8(5);
buf.writeUint8(1);
buf.writeUint8(2);
buf.writeUint8(3);
buf.writeUint8(10);
buf.writeUint8(30);

buf.writeUint64(12323487248572435);

buf.writeString('Hello World!', 32);
console.log(buf.buf, buf.readBufferEnd(0));
