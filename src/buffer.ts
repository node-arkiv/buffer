import { SIZE } from './type';

export class StreamBuffer {

	public fp: number = 0;

	constructor(public buf: Buffer = Buffer.from('')) {

	}

	get length() {
		return this.buf.length;
	}

	private __size_check(size: SIZE) {
		if ( this.fp + size >= this.buf.length ) {
			const buf = Buffer.alloc(this.fp + size);
			this.buf.copy(buf, 0, 0, this.buf.length);
			this.buf = buf;
		}
	}

	public readUint8() {
		let ret = 0;
		ret = this.buf.readUInt8(this.fp);
		this.fp += SIZE.UINT8;
		return ret;
	}

	public writeUint8(val: number) {
		this.__size_check(SIZE.UINT8);
		this.buf.writeUInt8(val, this.fp);
		this.fp += SIZE.UINT8;
	}

	public readInt8() {
		let ret = 0;
		ret = this.buf.readInt8(this.fp);
		this.fp += SIZE.INT8;
		return ret;
	}

	public writeInt8(val: number) {
		this.__size_check(SIZE.INT8);
		this.buf.writeInt8(val, this.fp);
		this.fp += SIZE.INT8;
	}

	public readUint16(use_be: boolean = false) {
		let ret = 0;
		if ( use_be ) {
			ret = this.buf.readUInt16BE(this.fp);
		} else {
			ret = this.buf.readUInt16LE(this.fp);
		}
		this.fp += SIZE.UINT16;
		return ret;
	}

	public writeUint16(val: number, use_be: boolean = false) {
		this.__size_check(SIZE.UINT16);
		if ( use_be ) {
			this.buf.writeUInt16BE(val, this.fp);
		} else {
			this.buf.writeUInt16LE(val, this.fp);
		}
		this.fp += SIZE.UINT16;
	}

	public readInt16(use_be: boolean = false) {
		let ret = 0;
		if ( use_be ) {
			ret = this.buf.readInt16BE(this.fp);
		} else {
			ret = this.buf.readInt16LE(this.fp);
		}
		this.fp += SIZE.INT16;
		return ret;
	}

	public writeInt16(val: number, use_be: boolean = false) {
		this.__size_check(SIZE.INT16);
		if ( use_be ) {
			this.buf.writeInt16BE(val, this.fp);
		} else {
			this.buf.writeInt16LE(val, this.fp);
		}
		this.fp += SIZE.INT16;
	}

	public readUint32(use_be: boolean = false) {
		let ret = 0;
		if ( use_be ) {
			ret = this.buf.readUInt32BE(this.fp);
		} else {
			ret = this.buf.readUInt32LE(this.fp);
		}
		this.fp += SIZE.UINT32;
		return ret;
	}

	public writeUint32(val: number, use_be: boolean = false) {
		this.__size_check(SIZE.UINT32);
		if ( use_be ) {
			this.buf.writeUInt32BE(val, this.fp);
		} else {
			this.buf.writeUInt32LE(val, this.fp);
		}
		this.fp += SIZE.UINT32;
	}

	public readInt32(use_be: boolean = false) {
		let ret = 0;
		if ( use_be ) {
			ret = this.buf.readInt32BE(this.fp);
		} else {
			ret = this.buf.readInt32LE(this.fp);
		}
		this.fp += SIZE.INT32;
		return ret;
	}

	public writeInt32(val: number, use_be: boolean = false) {
		this.__size_check(SIZE.UINT32);
		if ( use_be ) {
			this.buf.writeInt32BE(val, this.fp);
		} else {
			this.buf.writeInt32LE(val, this.fp);
		}
		this.fp += SIZE.INT32;
	}

	public readUint64(use_be: boolean = false) {
		let ret: bigint = 0n;
		if ( use_be ) {
			ret = this.buf.readBigUInt64BE(this.fp);
		} else {
			ret = this.buf.readBigUInt64LE(this.fp);
		}
		this.fp += SIZE.UINT64;
		return ret;
	}

	public writeUint64(val: string|bigint|number, use_be: boolean = false) {
		this.__size_check(SIZE.UINT64);

		if ( typeof val === 'string' || typeof val === 'number' ) {
			val = BigInt(val) as bigint;
		}

		if ( use_be ) {
			this.buf.writeBigUInt64BE(val, this.fp);
		} else {
			this.buf.writeBigUInt64LE(val, this.fp);
		}
		this.fp += SIZE.UINT64;
	}

	public readInt64(use_be: boolean = false) {
		let ret: bigint = 0n;
		if ( use_be ) {
			ret = this.buf.readBigInt64BE(this.fp);
		} else {
			ret = this.buf.readBigInt64LE(this.fp);
		}
		this.fp += SIZE.INT64;
		return ret;
	}

	public writeInt64(val: string|bigint|number, use_be: boolean = false) {
		this.__size_check(SIZE.UINT64);

		if ( typeof val === 'string' || typeof val === 'number' ) {
			val = BigInt(val) as bigint;
		}

		if ( use_be ) {
			this.buf.writeBigInt64BE(val, this.fp);
		} else {
			this.buf.writeBigInt64LE(val, this.fp);
		}
		this.fp += SIZE.INT64;
	}

	public readString(len: number) {
		const b_ = this.buf.subarray(this.fp, this.fp + len);
		let ret = '';
		ret = b_.toString();
		this.fp += len;
		return ret;
	}

	public writeString(val: string, len: number = val.length, encoding?: 'ascii' | 'utf8' | 'utf-8' | 'utf16le' | 'ucs2' | 'ucs-2' | 'base64' | 'latin1' | 'binary' | 'hex') {
		this.__size_check(len);
		this.buf.write(val, this.fp, len, encoding);
		this.fp += len;
	}

	public readBuffer(len: number) {
		const ret = this.buf.subarray(this.fp, this.fp + len);
		this.fp += len;
		return ret;
	}

	public writeBuffer(val: Buffer) {
		this.__size_check(val.length);
		for ( const v of val ) {
			this.buf[this.fp] = v;
			this.fp++;
		}
	}

	public readBufferNew(len: number) {
		const b_ = this.buf.subarray(this.fp, this.fp + len);
		const ret = Buffer.from(b_);
		this.fp += len;
		return ret;
	}

	public readBufferEnd(fp: number = this.fp) {
		const ret = this.buf.subarray(fp, this.buf.length);
		this.fp = this.buf.length;
		return ret;
	}

}
