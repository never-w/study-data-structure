interface IQueue<T> {
  addFront: (value: T) => void
  removeBack: () => T | undefined
  enqueue: (element: T) => void
  dequeue: () => T | undefined
  peek: () => T | undefined
  isEmpty: () => boolean
  size: () => number
}

class ArrayDeque<T> implements IQueue<T> {
  private queue: T[] = []

  addFront(value: T) {
    this.queue.unshift(value)
  }
  removeBack(): T | undefined {
    return this.queue.pop()
  }
  enqueue(element: T) {
    this.queue.push(element)
  }
  dequeue() {
    return this.queue.shift()
  }
  peek() {
    return this.queue[0]
  }
  isEmpty() {
    return this.queue.length === 0
  }
  size() {
    return this.queue.length
  }
}

// 测试
const deque = new ArrayDeque<string>()
deque.enqueue("aaa")
deque.enqueue("bbb")
deque.enqueue("ccc")
deque.addFront("abc")
deque.addFront("cba")
while (!deque.isEmpty()) {
  console.log(deque.removeBack())
}
