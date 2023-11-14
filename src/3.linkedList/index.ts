interface ILinkedList<T> {
  append: (value: T) => void
  appendArr: (arr: T[]) => void
  traverse: () => T[]
  insert: (value: T, position: number) => boolean
  removeIndex: (position: number) => T | null
  get: (position: number) => T | null
  update: (value: T, position: number) => boolean
  indexOf: (value: T) => number
  removeValue: (value: T) => T | null
  isEmpty: () => boolean
}

export class LinkedNode<T = any> {
  value: T
  next: LinkedNode<T> | null = null
  constructor(value: T) {
    this.value = value
  }
}

export class LinkedList<T = any> implements ILinkedList<T> {
  head: LinkedNode<T> | null = null
  private size: number = 0

  private getNode(position: number) {
    let index = 0
    let current = this.head
    while (index++ < position && current) {
      current = current.next
    }
    return current
  }

  append(value: T) {
    const newNode = new LinkedNode(value)
    if (!this.head) {
      this.head = newNode
    } else {
      let current = this.head
      while (current.next) {
        current = current.next
      }
      current.next = newNode
    }
    this.size++
  }

  appendArr(arr: T[]) {
    arr.forEach((element) => {
      this.append(element)
    })
  }

  traverse() {
    const values: T[] = []
    let current = this.head
    while (current) {
      values.push(current.value)
      current = current.next
    }
    console.log(values.join("-->"))
    return values
  }

  insert(value: T, position: number) {
    if (position < 0 || position > this.size) return false

    const newNode = new LinkedNode(value)
    if (position === 0) {
      newNode.next = this.head
      this.head = newNode
    } else {
      const previous = this.getNode(position - 1)
      newNode.next = previous?.next ?? null
      previous!.next = newNode
    }
    this.size++
    return true
  }

  removeIndex(position: number) {
    if (position < 0 || position >= this.size) return null

    let current = this.head
    if (position === 0) {
      this.head = current?.next ?? null
    } else {
      const previous = this.getNode(position - 1)
      current = previous?.next ?? null
      previous!.next = current?.next ?? null
    }
    this.size--
    return current?.value ?? null
  }

  get(position: number): T | null {
    if (position < 0 || position >= this.size) return null

    return this.getNode(position)?.value ?? null
  }

  update(value: T, position: number) {
    if (position < 0 || position >= this.size) return false

    const current = this.getNode(position)
    current!.value = value
    return true
  }

  indexOf(value: T) {
    let current = this.head
    let index = 0
    while (current) {
      if (current.value === value) {
        return index
      }
      index++
      current = current.next
    }
    return -1
  }

  removeValue(value: T) {
    const position = this.indexOf(value)
    return this.removeIndex(position)
  }

  isEmpty(): boolean {
    return this.size === 0
  }
}

const list = new LinkedList()
list.appendArr([1, 2, 3])
list.traverse() // 1->2->3
list.insert(6, 0) // 头部插入
list.insert(8, 2) // 中间插入
list.insert(10, 5) // 尾部插入
list.traverse() // 6->1->8->2->3->10

list.removeIndex(0) //删除头节点
list.traverse() // 1->8->2->3->10
console.log(list.removeIndex(2)) //删除中间节点 2
list.traverse() // 1->8->3->10
console.log(list.get(3)) //10

console.log(list.update(100, 1)) // true
list.traverse() // 1->100->3->10

console.log(list.indexOf(100)) // 1

console.log(list.removeValue(1)) // 1
list.traverse() // 100->3->10

console.log(list.isEmpty()) // false
