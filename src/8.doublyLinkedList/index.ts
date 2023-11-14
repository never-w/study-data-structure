class DoublyNode<T> {
  prev: DoublyNode<T> | null = null
  next: DoublyNode<T> | null = null
  value: T
  constructor(value: T) {
    this.value = value
  }
}
