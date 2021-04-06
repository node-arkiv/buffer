import { SIZE } from './type';

export class StreamBuffer {
	private fp: number = 0;

	constructor(public buf: Buffer = Buffer.from('')) {

	}

	get Fp() {
		return this.fp;
	}

	set Fp(fp: number) {
		this.fp = fp;
	}

	get Length() {
		return this.buf.length;
	}

	private __size_check(size: SIZE) {
		if ( this.fp + size >= this.buf.length ) {
			const buf = Buffer.alloc(this.fp + size);
			this.buf.copy(buf, 0, 0, this.buf.length);
			this.buf = buf;
		}
	}

	public ReadUint8() {
		let ret = 0;
		ret = this.buf.readUInt8(this.fp);
		this.fp += SIZE.UINT8;
		return ret;
	}

	public WriteUint8(val: number) {
		this.__size_check(SIZE.UINT8);
		this.buf.writeUInt8(val, this.fp);
		this.fp += SIZE.UINT8;
	}

	public ReadUint16(use_be: boolean = false) {
		let ret = 0;
		if ( use_be ) {
			ret = this.buf.readUInt16BE(this.fp);
		} else {
			ret = this.buf.readUInt16LE(this.fp);
		}
		this.fp += SIZE.UINT16;
		return ret;
	}

	public WriteUint16(val: number, use_be: boolean = false) {
		this.__size_check(SIZE.UINT16);
		if ( use_be ) {
			this.buf.writeUInt16BE(val, this.fp);
		} else {
			this.buf.writeUInt16LE(val, this.fp);
		}
		this.fp += SIZE.UINT16;
	}

	public ReadUint32(use_be: boolean = false) {
		let ret = 0;
		if ( use_be ) {
			ret = this.buf.readUInt32BE(this.fp);
		} else {
			ret = this.buf.readUInt32LE(this.fp);
		}
		this.fp += SIZE.UINT32;
		return ret;
	}

	public WriteUint32(val: number, use_be: boolean = false) {
		this.__size_check(SIZE.UINT32);
		if ( use_be ) {
			this.buf.writeUInt32BE(val, this.fp);
		} else {
			this.buf.writeUInt32LE(val, this.fp);
		}
		this.fp += SIZE.UINT32;
	}

	public ReadString(len: number) {
		const b_ = this.buf.subarray(this.fp, this.fp + len);
		let ret = '';
		ret = b_.toString();
		this.fp += len;
		return ret;
	}

	public WriteString(val: string, encoding?: 'ascii' | 'utf8' | 'utf-8' | 'utf16le' | 'ucs2' | 'ucs-2' | 'base64' | 'latin1' | 'binary' | 'hex') {
		this.__size_check(val.length);
		this.buf.write(val, this.fp, encoding);
		this.fp += val.length;
	}

	public ReadBuffer(len: number) {
		const ret = this.buf.subarray(this.fp, this.fp + len);
		this.fp += len;
		return ret;
	}

	public WriteBuffer(val: Buffer) {
		this.__size_check(val.length);
		for ( const v of val ) {
			this.buf[this.fp] = v;
			this.fp++;
		}
	}

	public ReadBufferNew(len: number) {
		const b_ = this.buf.subarray(this.fp, this.fp + len);
		const ret = Buffer.from(b_);
		this.fp += len;
		return ret;
	}

	public ReadBufferEnd(fp: number = this.fp) {
		const ret = this.buf.subarray(fp, this.buf.length);
		this.fp = this.buf.length;
		return ret;
	}

}
