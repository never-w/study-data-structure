interface ICircularLinkedList<T> {
  append: (value: T) => void
  traverse: () => void
  insert: (position: number, value: T) => boolean
  removeAt: (position: number) => T | null
  removeValue: (value: T) => T | null
  get: (position: number) => T | null
  update: (position: number, value: T) => boolean
  indexOf: (value: T) => number
  isEmpty: () => boolean
}

class LinkedNode<T = any> {
  value: T
  next: LinkedNode<T> | null = null
  constructor(value: T) {
    this.value = value
  }
}

class CircularLinkedList<T> implements ICircularLinkedList<T> {
  protected head: LinkedNode<T> | null = null
  // 新增属性，总是指向链表的尾部。
  protected tail: LinkedNode<T> | null = null
  protected length: number = 0

  private getNode(position: number): LinkedNode<T> | null {
    let index = 0
    let current = this.head
    while (index++ < position && current) {
      current = current.next
    }

    return current
  }

  private isTail(node: LinkedNode<T>) {
    return this.tail === node
  }

  size() {
    return this.length
  }

  peek(): T | undefined {
    return this.head?.value
  }

  append(value: T) {
    const newNode = new LinkedNode(value)

    if (!this.head) {
      // 情况一：链表本身为空
      this.head = newNode
    } else {
      // 情况二：链表不为空。
      this.tail!.next = newNode
    }

    this.tail = newNode

    // 将 tail.next 指向 head
    this.tail!.next = this.head

    this.length++
  }

  traverse() {
    const values: T[] = []

    let current = this.head
    while (current) {
      values.push(current.value)

      // 判断是否遍历到最后一个节点。
      if (this.isTail(current)) {
        current = null // 防止死循环
      } else {
        current = current.next
      }
    }

    // 打印循环链表时，新城闭环
    if (this.head && this.tail?.next === this.head) {
      values.push(this.head.value)
    }

    console.log(values.join("->"))
  }

  insert(position: number, value: T): boolean {
    // 越界处理
    if (position < 0 || position > this.length) return false

    const newNode = new LinkedNode(value)

    if (position === 0) {
      // 情况一：添加到链表头部（第一个）位置，
      newNode.next = this.head
      this.head = newNode
    } else {
      const previous = this.getNode(position - 1)
      // 插入操作，下面两行代码的顺序，一定是不变的。
      newNode.next = previous!.next
      previous!.next = newNode

      // 在尾部插入时，tail 指向新节点
      if (position === this.length) this.tail = newNode
    }

    // 在头部，尾部插入节点时，要改变 tail.next 的指向
    if (position === this.length || position === 0) {
      // 更新 tail
      this.tail!.next = this.head
    }

    this.length++
    return true
  }

  removeAt(position: number): T | null {
    // 越界处理
    if (position < 0 || position >= this.length) return null

    let removeNode: LinkedNode<T> | null = null

    if (position === 0) {
      // 情况一：删除链表头部元素。
      removeNode = this.head ?? null
      this.head = this.head?.next ?? null

      // 情况 1.1：链表中仅有头节点
      if (this.length === 1) this.tail = null
    } else {
      // 情况二：删除链表头部元素以外的元素。
      const previous = this.getNode(position - 1)
      removeNode = previous?.next ?? null
      previous!.next = previous?.next?.next ?? null

      // 情况 2.1：删除的是尾节点
      if (position === this.length - 1) this.tail = previous
    }

    // 在头部，尾部删除节点时，要改变 tail.next 的指向
    if (this.tail && (position === 0 || position === this.length - 1)) {
      // 更新 tail
      this.tail.next = this.head
    }

    this.length--
    return removeNode?.value ?? null
  }

  get(position: number): T | null {
    if (position < 0 || position >= this.length) return null

    return this.getNode(position)?.value ?? null
  }

  update(position: number, value: T): boolean {
    if (position < 0 || position >= this.length) return false

    const node = this.getNode(position)
    node!.value = value
    return true
  }

  indexOf(value: T): number {
    let index = 0
    let current = this.head

    while (current) {
      if (current.value === value) return index

      // 判断是否遍历到最后一个节点，防止死循环
      if (this.isTail(current)) {
        current = null
      } else {
        current = current.next
      }

      index++
    }
    return -1
  }

  removeValue(value: T): T | null {
    const index = this.indexOf(value)
    return this.removeAt(index)
  }

  isEmpty(): boolean {
    return this.length === 0
  }
}

// 测试
const clinkedList = new CircularLinkedList<string>()
console.log("---测试 append---")
clinkedList.append("aaa")
clinkedList.append("bbb")
clinkedList.append("ccc")
clinkedList.append("ddd")
clinkedList.traverse()

console.log("---测试 insert---")
clinkedList.insert(0, "abc")
clinkedList.traverse()
clinkedList.insert(2, "cba")
clinkedList.insert(6, "nba")
clinkedList.traverse()

console.log("---测试 removeAt---")
clinkedList.removeAt(0)
clinkedList.traverse()
clinkedList.removeAt(2)
clinkedList.traverse()
clinkedList.removeAt(4)
clinkedList.traverse()

console.log("---测试 get---")
console.log(clinkedList.get(0))
console.log(clinkedList.get(1))
console.log(clinkedList.get(2))

console.log("---测试 update---")
clinkedList.update(0, "zzt")
clinkedList.update(1, "kobe")
clinkedList.update(2, "james")
clinkedList.traverse()

console.log("---测试 indexOf---")
console.log(clinkedList.indexOf("ddd"))
console.log(clinkedList.indexOf("zzt"))
console.log(clinkedList.indexOf("kobe"))
console.log(clinkedList.indexOf("james"))

console.log("---测试 removeValue---")
clinkedList.removeValue("zzt")
console.log(clinkedList.removeValue("ddd"))
clinkedList.removeValue("kobe")
clinkedList.traverse()
console.log(clinkedList.isEmpty())
console.log(clinkedList.size())
