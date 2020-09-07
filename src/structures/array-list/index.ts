import { FixedArray } from "structures/fixed-array";

export class ArrayList<T> {

	private _array: FixedArray<T>;
	private _size = 0;

	constructor(initialSize = 256) {
		this._array = new FixedArray(initialSize);
	}

	private isInBounds = (i: number) => !(i < 0) && i < this._size;

	/** Returns true if this list has an element with the given index */
	public has = (i: number) => this.isInBounds(i);
	public size = () => this._size;

	/** Returns the value and the index of the head element */
	public getHead = () => {
		if (this._size < 1) throw ReferenceError("Cannot get head of an empty array");
		return {
			value: this._array.get(0),
			index: 0
		};
	}
	/** Returns the value and the index of the tail element */
	public getTail = () => {
		if (this._size < 1) throw ReferenceError("Cannot get tail of an empty array");
		return {
			value: this._array.get(this._size - 1),
			index: this._size - 1
		};
	}

	/** Get an element by index */
	public get(i: number) {
		if (!this.isInBounds(i)) throw ReferenceError(`Index out of bounds for List size ${this._size}: ${i}`);
		return this._array.get(i);
	}
	/** Set an element by index */
	public set(i: number, v: T) {
		if (!this.isInBounds(i)) throw ReferenceError(`Index out of bounds for List size ${this._size}: ${i}`);
		this._array.set(i, v);
	}

	/** Add a value to the end of the list */
	public add(v: T) {

		const newIdx = this._size;
		const size = this._array.size();

		if (newIdx === size)
			this._array = this._array.copy(size * 2);

		this._array.set(newIdx, v);
		this._size++;

	}

	/** Remove an element from the list by index */
	public remove(i: number) {

		if (!this.isInBounds(i)) throw ReferenceError(`Index out of bounds for List size ${this._size}: ${i}`);

		for (let j = i + 1; j < this._array.size(); j++)
			this._array.set(j - 1, this._array.get(j));

		this._size--;

	}

	/** Removes and returns the last element in the list */
	public popTail = () => {

		if (this._size < 1) throw ReferenceError("Cannot pop from an empty array");

		const value = this.get(this._size - 1);
		this.remove(this._size - 1);

		return value;

	}

	/** Swap two elements in the list by their indices */
	public swapByIndex(aIdx: number, bIdx: number) {
		if (!this.isInBounds(aIdx)) throw ReferenceError(`Index out of bounds for List size ${this._size}: ${aIdx}`);
		if (!this.isInBounds(bIdx)) throw ReferenceError(`Index out of bounds for List size ${this._size}: ${bIdx}`);
		const a = this._array.get(aIdx);
		const b = this._array.get(bIdx);
		this._array.set(aIdx, b);
		this._array.set(bIdx, a);
	}

}