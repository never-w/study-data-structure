import { btPrint } from "hy-algokit"

interface IBSTree<T> {
  insert: (value: T) => void
  preOrderTraverse: () => void
  inOrderTraverse: () => void
  postOrderTraverse: () => void
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

  /** 使用栈的先序遍历 */
  preOrderTraverseUseOfStack() {
    if (this.root) {
      const stack = [this.root]
      while (!!stack.length) {
        const node = stack.pop()
        console.log(node?.value)
        if (node?.right) stack.push(node.right)
        if (node?.left) stack.push(node.left)
      }
    }
  }
  /** 优化版本（类似递归那种） */
  preOrderTraverseUseOfStackOptimized() {
    if (this.root) {
      const stack: (TreeNode<T> | null)[] = [this.root]
      while (stack.length) {
        const node = stack.pop()
        if (!node) {
          console.log(stack.pop()?.value)
          continue
        }

        if (node.right) stack.push(node.right)
        if (node.left) stack.push(node.left)
        stack.push(node)
        stack.push(null)
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

  /** 使用栈的中序遍历 */
  inOrderTraverseUseOfStack() {
    if (this.root) {
      const stack: TreeNode<T>[] = []
      let current: TreeNode<T> | null = this.root
      while (stack.length || current) {
        if (current) {
          stack.push(current)
          current = current.left
        } else {
          const node = stack.pop()
          console.log(node?.value)
          current = node?.right ?? null
        }
      }
    }
  }
  /** 优化版本（类似递归写法那种） */
  inOrderTraverseUseOfStackOptimized() {
    if (this.root) {
      const stack: (TreeNode<T> | null)[] = [this.root]
      while (stack.length) {
        const node = stack.pop()
        if (!node) {
          console.log(stack.pop()?.value)
          continue
        }

        if (node.right) stack.push(node.right)
        stack.push(node)
        stack.push(null)
        if (node.left) stack.push(node.left)
      }
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

  /** 使用栈的后续遍历 */
  postOrderTraverseUseOfStack() {
    const res = []
    if (this.root) {
      const stack = [this.root]
      while (stack.length) {
        const node = stack.pop()
        res.push(node?.value)
        if (node?.left) stack.push(node.left)
        if (node?.right) stack.push(node.right)
      }
    }

    res.reverse().forEach((node) => {
      console.log(node)
    })
  }
  // 优化统一版本（类似递归那种）
  postOrderTraverseUseOfStackOptimized() {
    if (this.root) {
      const stack: (TreeNode<T> | null)[] = [this.root]
      while (stack.length) {
        const node = stack.pop()
        if (!node) {
          console.log(stack.pop()?.value)
          continue
        }

        stack.push(node)
        stack.push(null)
        if (node.right) stack.push(node.right)
        if (node.left) stack.push(node.left)
      }
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

  /** 层序遍历，可以区分一层一层的二位数组 */
  levelOrderTraverseOptimized() {
    const res = []
    if (this.root) {
      const queue = [this.root]
      while (queue.length) {
        const len = queue.length
        const tmpArr = []
        for (let i = 0; i < len; i++) {
          const node = queue.shift()!
          tmpArr.push(node?.value)
          if (node.left) queue.push(node.left)
          if (node.right) queue.push(node.right)
        }
        res.push(tmpArr)
      }
    }
    console.log(res)
    return res
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
      if (current.value === value) {
        current.parent = parent
        return current
      }

      parent = current
      if (current.value > value) {
        current = current.left
      } else {
        current = current.right
      }
    }

    return null
  }

  // 为优化版本的 remove 操作
  //   remove(value: T) {
  //     const current = this.search(value)

  //     // 找不到元素就直接返回 false
  //     if (!current) return false

  //     // 1. 删除的节点是 叶子节点情况
  //     if (current.left === null && current.right === null) {
  //       if (!this.root) {
  //         this.root = null
  //       } else {
  //         if (current.isLeft) current.parent!.left = null
  //         if (current.isRight) current.parent!.right = null
  //       }
  //     }

  //     // 2. 删除的节点 只存在一个子节点
  //     else if (current.right === null) {
  //       if (!this.root) {
  //         this.root = current.left
  //       } else {
  //         if (current.isLeft) current.parent!.left = current.left
  //         if (current.isRight) current.parent!.right = current.left
  //       }
  //     } else if (current.left === null) {
  //       if (!this.root) {
  //         this.root = current.right
  //       } else {
  //         if (current.isLeft) current.parent!.left = current.right
  //         if (current.isRight) current.parent!.right = current.right
  //       }
  //     }

  //     // 3. 删除的节点，该左右两个子节点都存在甚至子节点还存在子节点情况
  //     else {
  //       const successor = this.getSuccessor(current)

  //       if (successor === this.root) {
  //         this.root = successor
  //       } else {
  //         if (current.isLeft) current.parent!.left = successor
  //         if (current.isRight) current.parent!.right = successor
  //       }
  //     }

  //     return true
  //   }

  remove(value: T) {
    // 1.查找 value 所在的节点
    const current = this.search(value)
    if (!current) return false

    let replaceNode: TreeNode<T> | null = null
    // 2.获取到三个东西，当前节点 / 父节点 / 当前节点是左子节点，还是右子节点
    // console.log('当前节点：', current.value, '父节点：', current.parent?.value)
    // 删除的是叶子节点
    if (current.left === null && current.right === null) {
      replaceNode = null
    }

    // 3.只有一个子节点
    else if (current.right === null) {
      // 只有左子节点
      replaceNode = current.left
    } else if (current.left === null) {
      // 只有右子节点
      replaceNode = current.right
    }

    // 4.有两个子节点
    else {
      const successor = this.getSuccessor(current)
      replaceNode = successor
    }

    if (current === this.root) {
      this.root = replaceNode
    } else if (current.isLeft) {
      current.parent!.left = replaceNode
    } else {
      current.parent!.right = replaceNode
    }

    return true
  }
  /** 比 current 大一点点的节点，一定是 current 右子树的最小值，它被称为 current 的后继。 */
  private getSuccessor(delNode: TreeNode<T>) {
    let current = delNode.right
    let successor: TreeNode<T> | null = null

    while (current) {
      successor = current
      current = current.left

      if (current) current.parent = successor
    }

    if (successor !== delNode.right) {
      successor!.parent!.left = successor!.right
      successor!.right = delNode.right
    }

    successor!.left = delNode.left
    return successor
  }
}

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

// bst.print()
// bst.remove(12)
// bst.print()
// bst.remove(13)
// bst.print()
// bst.remove(7)
// bst.print()

bst.print()
// bst.remove(11)
// bst.print()

// bst.levelOrderTraverse()
bst.levelOrderTraverseOptimized()

// console.log("最大值:", bst.getMaxValue())
// console.log("最小值:", bst.getMinValue())
