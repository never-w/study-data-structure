class DoublyNode<T> {
  prev: DoublyNode<T> | null = null
  next: DoublyNode<T> | null = null
  value: T
  constructor(value: T) {
    this.value = value
  }
}

class DoublyLinkedList<T> {
  private head: DoublyNode<T> | null = null
  private tail: DoublyNode<T> | null = null
  private length: number = 0

  private getNode(position: number) {
    let index = 0
    let current = this.head
    while (index++ < position && current) {
      current = current.next
    }

    return current
  }

  append(value: T) {
    const newNode = new DoublyNode(value)

    if (!this.head) {
      this.head = newNode
      this.tail = newNode
    } else {
      this.tail!.next = newNode
      newNode.prev = this.tail
      this.tail = newNode
    }

    this.length++
  }

  prepend(value: T) {
    const newNode = new DoublyNode(value)

    if (!this.head) {
      this.head = newNode
      this.tail = newNode
    } else {
      newNode.next = this.head
      this.head.prev = newNode
      this.head = newNode
    }

    this.length++
  }

  postTraverse() {
    const values = []
    let current = this.tail
    while (current) {
      values.push(current.value)
      current = current.prev
    }

    console.log(values.join("->"))
  }

  insert(position: number, value: T) {
    if (position < 0 || position > this.length) return false

    if (position === 0) {
      this.prepend(value)
    } else {
      const newNode = new DoublyNode(value)
      const current = this.getNode(position) as DoublyNode<T>

      current.prev!.next = newNode
      newNode.prev = current.prev
      newNode.next = current
      current.prev = newNode

      this.length++
    }

    return true
  }

  removeAt(position: number) {
    if (position < 0 || position >= this.length) return null

    let current = this.head
    if (position === 0) {
      // 删除的是头节点。
      if (this.length == 1) {
        // 链表仅有一个节点
        this.head = null
        this.tail = null
      } else {
        // 链表有大于1个节点
        this.head = this.head!.next
        this.head!.prev = null
      }
    } else if (position === this.length) {
      // 删除的是尾节点
      current = this.tail
      this.tail = this.tail!.prev
      this.tail!.next = null
    } else {
      // 删除的是中间的节点
      current = this.getNode(position) as DoublyNode<T>
      current.prev!.next = current.next
      current.next!.prev = current.prev
    }

    this.length--
    return current?.value ?? null
  }

  traverse() {
    const values: T[] = []
    let current = this.head
    while (current) {
      values.push(current.value)
      current = current.next
    }

    console.log(values.join("->"))
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
      current = current.next
      index++
    }

    return -1
  }

  remove(value: T): T | null {
    const index = this.indexOf(value)
    return this.removeAt(index)
  }

  isEmpty(): boolean {
    return this.length === 0
  }

  size() {
    return this.length
  }
}

const dlinkedList = new DoublyLinkedList<string>()
console.log("----------- append / prepend ----------")
dlinkedList.append("aaa")
dlinkedList.append("bbb")
dlinkedList.append("ccc")
dlinkedList.append("ddd")

dlinkedList.prepend("abc")
dlinkedList.prepend("cba")

dlinkedList.traverse()
dlinkedList.postTraverse()

console.log("----------- insert ----------")
dlinkedList.insert(0, "zzt")
dlinkedList.insert(7, "kobe")
dlinkedList.insert(3, "james")

dlinkedList.traverse()
dlinkedList.postTraverse()

console.log("----------- removeAt ----------")
dlinkedList.removeAt(0)
dlinkedList.removeAt(7)
dlinkedList.removeAt(2)
dlinkedList.traverse()
dlinkedList.postTraverse()

console.log("----------- 其它方法测试 ----------")
console.log("----------- get ---------")
console.log(dlinkedList.get(0))
console.log(dlinkedList.get(1))
console.log(dlinkedList.get(2))

console.log("----------- update ---------")
dlinkedList.update(1, "zzt")
dlinkedList.update(2, "kobe")
dlinkedList.traverse()

console.log("----------- indexof ---------")
console.log(dlinkedList.indexOf("cba"))
console.log(dlinkedList.indexOf("zzt"))
console.log(dlinkedList.indexOf("kobe"))
console.log(dlinkedList.indexOf("james"))

console.log("----------- rmove ---------")
dlinkedList.remove("zzt")
dlinkedList.remove("kobe")
dlinkedList.remove("cba")
dlinkedList.traverse()
console.log(dlinkedList.isEmpty())
console.log(dlinkedList.size())
