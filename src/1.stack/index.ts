interface IStack<T> {
  push: (element: T) => void
  pop: () => T | undefined
  peek: () => T | undefined
  isEmpty: () => boolean
  size: () => number
}

export class ArrayStack<T> implements IStack<T> {
  private stack: T[] = []

  get length() {
    return this.size()
  }

  push(element: T) {
    this.stack.push(element)
  }

  pop() {
    return this.stack.pop()
  }

  peek() {
    return this.stack[this.stack.length - 1]
  }

  isEmpty() {
    return this.stack.length === 0
  }

  size() {
    return this.stack.length
  }

  clear() {
    this.stack = []
  }
}

// 使用示例
// const stack = new ArrayStack<number>()

// stack.push(1)
// stack.push(2)
// stack.push(3)

// console.log(stack.peek()) // 输出: 3
// console.log(stack.pop()) // 输出: 3

// console.log(stack.size()) // 输出: 2

// console.log(stack.isEmpty()) // 输出: false

// stack.clear()
// console.log(stack.isEmpty()) // 输出: true
