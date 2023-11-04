interface IQueue<T> {
  enqueue: (element: T) => void
  dequeue: () => T | undefined
  peek: () => T | undefined
  isEmpty: () => boolean
  size: () => number
}

export class ArrayQueue<T> implements IQueue<T> {
  private queue: T[] = []

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
