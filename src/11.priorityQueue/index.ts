import { MaxHeap } from "../9.heap"

class PriorityNode<T> {
  constructor(public value: T, public priority: number) {}

  /** 实现这个是用于 heap 比较值用的，这是js的api */
  valueOf() {
    return this.priority
  }
}

class PriorityQueue<T> {
  private heap: MaxHeap<PriorityNode<T>> = new MaxHeap()

  enqueue(value: T, priority: number) {
    const newNode = new PriorityNode(value, priority)
    this.heap.insert(newNode)
  }

  dequeue(): T | undefined {
    return this.heap.extract()?.value
  }

  peek(): T | undefined {
    return this.heap.peek()?.value
  }

  isEmpty(): boolean {
    return this.heap.isEmpty()
  }

  size() {
    return this.heap.size()
  }
}

// 测试
const pqueue = new PriorityQueue<string>()
pqueue.enqueue("zzt", 98)
pqueue.enqueue("kobe", 90)
pqueue.enqueue("james", 105)

while (!pqueue.isEmpty()) {
  console.log(pqueue.dequeue())
}
