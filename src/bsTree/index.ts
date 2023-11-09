import { btPrint } from "hy-algokit"

interface IBSTree<T> {
  insert: (value: T) => void
  preOrderTraverse: () => void
  inOrderTraverse: () => void
  levelOrderTraverse: () => void
  getMaxValue: () => T | null
  getMinValue: () => T | null
  search: (value: T) => TreeNode<T> | null
  remove: (value: T) => boolean
}

class TreeNode<T> {
  parent: TreeNode<T> | null = null
  left: TreeNode<T> | null = null
  right: TreeNode<T> | null = null
  value: T
  constructor(value: T) {
    this.value = value
  }

  get isLeft(): boolean {
    return !!(this.parent && this.parent.left === this)
  }
  get isRight(): boolean {
    return !!(this.parent && this.parent.right === this)
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

  // 自己实现不使用递归方式 添加数据
  //   insert(value: T) {
  //     const newNode = new TreeNode(value)
  //     let current = this.root
  //     let previous = null
  //     let left = false
  //     let right = false

  //     if (!current) {
  //       this.root = newNode
  //     } else {
  //       while (current) {
  //         if (current.value === value) {
  //           left = false
  //           right = false
  //           return
  //         } else if (current.value > value) {
  //           previous = current
  //           current = current.left
  //           left = true
  //           right = false
  //         } else {
  //           previous = current
  //           current = current.right
  //           right = true
  //           left = false
  //         }
  //       }
  //     }

  //     if (left && previous) {
  //       previous.left = newNode
  //     }

  //     if (right && previous) {
  //       previous.right = newNode
  //     }
  //   }

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
    let parent: TreeNode<T> | null = null

    while (current) {
      if (current.value === value) return current

      parent = current
      if (current.value > value) {
        current = current.left
      } else {
        current = current.right
      }

      if (current) current.parent = parent
    }

    return null
  }

  remove(value: T) {
    const current = this.search(value)

    // 找不到元素就直接返回 false
    if (!current) return false

    // 1. 删除的节点是 叶子节点情况
    if (current.left === null && current.right === null) {
      if (!this.root) {
        this.root = null
      } else {
        if (current.isLeft) current.parent!.left = null
        if (current.isRight) current.parent!.right = null
      }
    }

    return true
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
bst.remove(12)
bst.print()

// bst.levelOrderTraverse()

// console.log("最大值:", bst.getMaxValue())
// console.log("最小值:", bst.getMinValue())
