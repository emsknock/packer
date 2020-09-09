import { ArrayList } from "structures/array-list";

export class PriorityQueue<T> {

	private _list = new ArrayList<{ value: T, priority: number }>();

	private parentOf = (i: number) => {
		if (i === 0) return null;
		const parentIdx = ~~((i - 1)/2); // Double tilde is equivalent to floor()
		return this._list.has(parentIdx)
			? ({ ...this._list.get(parentIdx), index: parentIdx })
			: null;
	}

	private rChildOf = (i: number) => {
		const childIndex = 2 * i + 2;
		return this._list.has(childIndex)
			? ({ ...this._list.get(childIndex), index: childIndex })
			: null;
	}

	private lChildOf = (i: number) => {
		const childIndex = 2 * i + 1;
		return this._list.has(childIndex)
			? ({ ...this._list.get(childIndex), index: childIndex })
			: null;
	}

	public size = () => this._list.size();

	public push(value: T, priority: number) {

		const list = this._list;
		list.add({ value, priority });

		let nodeIdx = list.getTail().index;
		while (true) {

			const parent = this.parentOf(nodeIdx);

			if (!parent) break;
			if (priority < parent.priority) break;

			list.swapByIndex(nodeIdx, parent.index);
			nodeIdx = parent.index;

		}

		for(const node of list["_array"]["_array"]) {
			const idx = list["_array"]["_array"].indexOf(node);
			const l = this.lChildOf(idx)?.priority ?? -Infinity;
			const r = this.rChildOf(idx)?.priority ?? -Infinity;
			if (node.priority < l || node.priority < r) {

				console.error(node, list["_array"]["_array"]);
				throw Error("Heap property not satisfied");
			}
		}

	}

	/**
	 * Retrieve and remove the most prioritised element in the queue.
	 */
	public pop() {

		const list = this._list;

		list.swapByIndex(0, list.getTail().index);
		const { value } = list.popTail();

		// The heap is either empty or has a single node left, so we can skip the rest of max-heapify
		if (list.size() < 2) return value;

		let nodeIdx = 0;
		while (true) {

			const { priority } = list.get(nodeIdx);
			const rChild = this.rChildOf(nodeIdx);
			const lChild = this.lChildOf(nodeIdx);

			// If neither child exist, the node is a leaf and max-heapify is complete
			if (!rChild && !lChild) break;

			// - If either child doesn't exist (one must as per above),
			//   the one that does exist is automatically the max child
			// - If both exist, the max child is the one with a higher priority
			// - If both exist and have equal priority, it doesn't matter which one
			//   is used as the max child
			const maxChild = !rChild || !lChild
				? (rChild ?? lChild)!
				: rChild.priority > lChild.priority
					? rChild
					: lChild;

			if (maxChild.priority < priority) break;

			list.swapByIndex(nodeIdx, maxChild.index);
			nodeIdx = maxChild.index;

		}

		return value;

	}

}