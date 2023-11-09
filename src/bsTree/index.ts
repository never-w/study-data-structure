import { btPrint } from "hy-algokit"

interface IBSTree<T> {
  insert: (value: T) => void
  preOrderTraverse: () => void
  inOrderTraverse: () => void
  levelOrderTraverse: () => void
  getMaxValue: () => T | null
  getMinValue: () => T | null
  search: (value: T) => boolean
}

class TreeNode<T> {
  left: TreeNode<T> | null = null
  right: TreeNode<T> | null = null
  value: T
  constructor(value: T) {
    this.value = value
  }
}

/**
 * @description: 此类用于：二叉搜索树的封装
 */
class BSTree<T> implements IBSTree<T> {
  private root: TreeNode<T> | null = null

  print() {
    btPrint(this.root)
  }

  /** 插入节点 */
  insert(value: T) {
    const newNode = new TreeNode(value)

    if (!this.root) {
      this.root = newNode
    } else {
      this.insertNode(this.root, newNode)
    }
  }
  private insertNode(node: TreeNode<T>, newNode: TreeNode<T>) {
    if (newNode.value < node.value) {
      if (!node.left) {
        node.left = newNode
      } else {
        this.insertNode(node.left, newNode)
      }
    } else {
      if (!node.right) {
        node.right = newNode
      } else {
        this.insertNode(node.right, newNode)
      }
    }
  }

  /** 先序遍历 */
  preOrderTraverse() {
    this.preOrderTraverseNode(this.root)
  }
  private preOrderTraverseNode(node: TreeNode<T> | null) {
    if (node) {
      console.log(node.value)
      this.preOrderTraverseNode(node.left)
      this.preOrderTraverseNode(node.right)
    }
  }

  /** 中序遍历 */
  inOrderTraverse() {
    this.inOrderTraverseNode(this.root)
  }
  private inOrderTraverseNode(node: TreeNode<T> | null) {
    if (node) {
      this.inOrderTraverseNode(node.left)
      console.log(node.value)
      this.inOrderTraverseNode(node.right)
    }
  }

  /** 后序遍历 */
  postOrderTraverse() {
    this.postOrderTraverseNode(this.root)
  }
  private postOrderTraverseNode(node: TreeNode<T> | null) {
    if (node) {
      this.postOrderTraverseNode(node.left)
      this.postOrderTraverseNode(node.right)
      console.log(node.value)
    }
  }

  /** 层序遍历 */
  levelOrderTraverse() {
    if (!this.root) return

    const queue: TreeNode<T>[] = [this.root]

    while (queue.length) {
      const current = queue.shift()
      console.log(current?.value)

      if (current?.left) {
        queue.push(current.left)
      }

      if (current?.right) {
        queue?.push(current.right)
      }
    }
  }

  /** 取最大值 */
  getMaxValue() {
    let current = this.root
    while (current && current?.right) {
      current = current.right
    }
    return current?.value ?? null
  }

  /** 取最小值 */
  getMinValue() {
    let current = this.root
    while (current && current?.left) {
      current = current.left
    }
    return current?.value ?? null
  }

  /** 搜索相等值 */
  search(value: T) {
    let current = this.root

    while (current) {
      if (current.value === value) {
        return true
      } else if (current.value > value) {
        current = current.left
      } else {
        current = current.right
      }
    }

    return false
  }
}

export default BSTree

// 测试
const bst = new BSTree<number>()
bst.insert(11)
bst.insert(7)
bst.insert(15)
bst.insert(5)
bst.insert(3)
bst.insert(9)
bst.insert(8)
bst.insert(10)
bst.insert(13)
bst.insert(12)
bst.insert(14)
bst.insert(20)
bst.insert(18)
bst.insert(25)
bst.insert(6)

bst.print()

bst.levelOrderTraverse()

console.log("最大值:", bst.getMaxValue())
console.log("最小值:", bst.getMinValue())
