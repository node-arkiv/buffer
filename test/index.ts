import { StreamBuffer } from '../src/index';

const buf = new StreamBuffer();
buf.WriteUint8(5);
buf.WriteUint8(1);
buf.WriteUint8(2);
buf.WriteUint8(3);
buf.WriteUint8(10);
buf.WriteUint8(30);

buf.WriteString('Hello World!', 32);
console.log(buf.buf, buf.ReadBufferEnd(0));
