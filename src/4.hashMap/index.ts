interface IHashTable<T> {
  put: (key: string, value: T) => void
  get: (key: string) => T | undefined
  delete: (key: string) => T | undefined
}

class HashTable<T> implements IHashTable<T> {
  /** 存储数据的数组 */
  storage: [string, T][][] = []
  /** 当前插入的元素个数 */
  private count: number = 0
  /**
   * 最大容量
   * 哈希表的容量，最好是质数
   * 质数也称为素数，表示在大于 1 的自然数中，只能被 1 和自己整除的数。
   */
  private limit: number = 7

  /** hash函数 */
  private hashFunction(key: string, len: number) {
    let hashcode = 0
    for (let i = 0; i < key.length; i++) {
      // 霍纳法则计算hashcode
      hashcode = 31 * hashcode + key.charCodeAt(i)
    }
    // 计算出索引,取余操作保证索引值在数组长度范围内
    let index = hashcode % len
    return index
  }

  /**
   * 扩容和缩容
   * 一般在 loadFactor > 0.75 的时候扩容。
   * 一般在 loadFactor < 0.25 时。且数组长度大于最小长度的情况下（比如 7）
   */
  private resize(newLength: number) {
    this.limit = newLength

    const oldStorage = this.storage
    this.storage = []
    this.count = 0

    oldStorage.forEach((bucket) => {
      if (bucket) {
        bucket.forEach((tuple) => {
          this.put(tuple[0], tuple[1])
        })
      }
    })
  }

  //   private isPrime(num: number) {
  //     for (let i = 2; i < num; i++) {
  //       const remainder = num % i
  //       if (remainder === 0) {
  //         return false
  //       }
  //     }
  //     return true
  //   }
  /** 这个是优化版，判断质数函数 */
  private isPrime(num: number): boolean {
    const sqrt = Math.sqrt(num)
    for (let i = 2; i < sqrt; i++) {
      if (num % i === 0) return false
    }
    return true
  }

  private getNextPrime(num: number) {
    let nextPrime = num
    while (!this.isPrime(nextPrime)) {
      nextPrime++
    }
    return nextPrime
  }

  /** 插入和修改 */
  put(key: string, value: T) {
    const index = this.hashFunction(key, this.limit)

    let bucket = this.storage[index]
    if (!bucket) {
      bucket = []
      this.storage[index] = bucket
    }

    let isUpdate = false

    for (let i = 0; i < bucket.length; i++) {
      const tuple = bucket[i]
      const [tupleKey] = tuple
      if (key === tupleKey) {
        tuple[1] = value
        isUpdate = true
        break
      }
    }

    if (!isUpdate) {
      bucket.push([key, value])
      this.count++

      // loadFactor ? 0.75，那么在该位置进行添加
      const loadFactor = this.count / this.limit
      if (loadFactor > 0.75) {
        const newSize = this.limit * 2
        const primeSize = this.getNextPrime(newSize)
        this.resize(primeSize)
      }
    }
  }

  get(key: string) {
    const index = this.hashFunction(key, this.limit)

    let bucket = this.storage[index]
    if (!bucket) return

    for (let i = 0; i < bucket.length; i++) {
      const tuple = bucket[i]
      const [tupleKey, tupleValue] = tuple
      if (key === tupleKey) {
        return tupleValue
      }
    }
  }

  delete(key: string) {
    const index = this.hashFunction(key, this.limit)

    let bucket = this.storage[index]
    if (!bucket) return

    for (let i = 0; i < bucket.length; i++) {
      const tuple = bucket[i]
      const [tupleKey, tupleValue] = tuple
      if (key === tupleKey) {
        tuple.splice(i, 1)
        this.count--

        const loadFactor = this.count / this.limit
        if (loadFactor < 0.25 && this.limit > 7) {
          const newSize = Math.floor(this.limit / 2)
          const primeSize = this.getNextPrime(newSize)
          this.resize(primeSize)
        }

        return tupleValue
      }
    }
  }
}

// 测试
const hashTable = new HashTable()
// length: 7
// count: 8
// loadFactor: 8 / 7 = 1.1xxxxx
hashTable.put("aaa", 100)
hashTable.put("aaa", 200)
hashTable.put("bbb", 300)
hashTable.put("ccc", 400)
hashTable.put("abc", 111)
hashTable.put("cba", 222)
console.log(hashTable.storage)

hashTable.put("nba", 333)
hashTable.put("mba", 444)
console.log(hashTable.storage)

// 如果loadFactor > 0.75进行扩容操作
hashTable.delete("nba")
hashTable.delete("mba")
hashTable.delete("abc")
hashTable.delete("cba")
hashTable.delete("aaa")
console.log(hashTable.storage)
