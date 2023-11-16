import { cbtPrint } from "hy-algokit"

interface IHeap<T> {
  insert: (value: T) => void
  extract: () => T | undefined
  peek: () => T | undefined
  size: () => number
  isEmpty: () => boolean
}

/** 最大堆 */
class MaxHeap<T> implements IHeap<T> {
  data: T[] = []
  private length: number = 0

  /* 
    i 是数组的index
    父节点位置是：arr[(i-1)/2]
    左子节点：arr[2*i + 1]
    右子节点：arr[2*i + 2]
    -----------------------------------
    private getLeftIndex(index: number) {
      return 2 * index + 1
    }
    private getRightIndex(index: number) {
      return 2 * index + 2
    }
    private getParentIndex(index: number) {
      if (index === 0) {
        return undefined
      }
      return Math.floor((index - 1) / 2) ===>相等 (i - 1) >> 1
    } 
    */

  private swap(i: number, j: number) {
    ;[this.data[i], this.data[j]] = [this.data[j], this.data[i]]
  }

  /** 上滤操作 */
  private heapfy_up() {
    let index = this.length - 1

    while (index > 0) {
      let parentIndex = Math.floor((index - 1) / 2)

      if (this.data[index] <= this.data[parentIndex]) break

      this.swap(index, parentIndex)
      index = parentIndex
    }
  }

  /** 下滤操作 */
  private heapfy_down() {
    let index = 0

    while (2 * index + 1 < this.length) {
      // 1.定义索引位置
      let leftChildIndex = 2 * index + 1
      let rightChildIndex = leftChildIndex + 1

      // 2.找到左右子节点较大的值
      let largeIndex = leftChildIndex
      if (rightChildIndex < this.length && this.data[rightChildIndex] > this.data[leftChildIndex]) {
        largeIndex = rightChildIndex
      }

      // 3.较大的之和 index 位置进行比较
      if (this.data[index] >= this.data[largeIndex]) break

      // 4.变换位置
      this.swap(index, largeIndex)
      index = largeIndex
    }
  }

  insert(value: T) {
    // 1.将元素放到数组的尾部
    this.data.push(value)
    this.length++

    // 2.上滤操作，维护最大堆的特性
    this.heapfy_up()
  }

  extract(): T | undefined {
    // 1.判断元素的个数为 0 或者 1 的情况
    if (this.length === 0) return
    if (this.length === 1) {
      this.length--
      return this.data.pop()
    }

    // 2.提取返回的最大值
    const topvalue = this.data[0]
    this.data[0] = this.data.pop()!
    this.length--

    // 3.维护最大堆的特性，下滤操作
    this.heapfy_down()

    return topvalue
  }

  peek(): T | undefined {
    return this.data[0]
  }

  size() {
    return this.length
  }

  isEmpty() {
    return this.length === 0
  }

  print() {
    cbtPrint(this.data)
  }
}

/** 最小堆 */
class MinHeap<T> implements IHeap<T> {
  data: T[] = []
  private length: number = 0

  private swap(i: number, j: number) {
    ;[this.data[i], this.data[j]] = [this.data[j], this.data[i]]
  }

  /** 上滤操作 */
  private heapfy_up() {
    let index = this.length - 1

    while (index > 0) {
      let parentIndex = Math.floor((index - 1) / 2)

      if (this.data[index] >= this.data[parentIndex]) break

      this.swap(index, parentIndex)
      index = parentIndex
    }
  }

  /** 下滤操作 */
  private heapfy_down() {
    let index = 0

    while (2 * index + 1 < this.length) {
      // 1.定义索引位置
      let leftChildIndex = 2 * index + 1
      let rightChildIndex = leftChildIndex + 1

      // 2.找到左右子节点较大的值
      let lesserIndex = leftChildIndex
      if (rightChildIndex < this.length && this.data[rightChildIndex] < this.data[leftChildIndex]) {
        lesserIndex = rightChildIndex
      }

      // 3.较大的之和 index 位置进行比较
      if (this.data[index] <= this.data[lesserIndex]) break

      // 4.变换位置
      this.swap(index, lesserIndex)
      index = lesserIndex
    }
  }

  insert(value: T) {
    // 1.将元素放到数组的尾部
    this.data.push(value)
    this.length++

    // 2.上滤操作，维护最大堆的特性
    this.heapfy_up()
  }

  extract(): T | undefined {
    // 1.判断元素的个数为 0 或者 1 的情况
    if (this.length === 0) return
    if (this.length === 1) {
      this.length--
      return this.data.pop()
    }

    // 2.提取返回的最大值
    const topvalue = this.data[0]
    this.data[0] = this.data.pop()!
    this.length--

    // 3.维护最大堆的特性，下滤操作
    this.heapfy_down()

    return topvalue
  }

  peek(): T | undefined {
    return this.data[0]
  }

  size() {
    return this.length
  }

  isEmpty() {
    return this.length === 0
  }

  print() {
    cbtPrint(this.data)
  }
}

// 测试
const arr = [9, 11, 20, 56, 23, 45, 10]
const heap = new MaxHeap<number>()
for (const item of arr) {
  heap.insert(item)
}
heap.print()

// 测试
const arr1 = [9, 11, 20, 56, 23, 45]
const heap1 = new MinHeap<number>()
for (const item of arr1) {
  heap1.insert(item)
}
heap1.print()
