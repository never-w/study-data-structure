import { btPrint } from "hy-algokit"

class TreeNode<T> {
  left: TreeNode<T> | null = null
  right: TreeNode<T> | null = null
  parent: TreeNode<T> | null = null
  constructor(public value: T) {}
  get isLeft(): boolean {
    return !!(this.parent && this.parent.left === this)
  }
  get isRight(): boolean {
    return !!(this.parent && this.parent.right === this)
  }
}

class BSTree<T> {
  private root: TreeNode<T> | null = null

  print() {
    btPrint(this.root)
  }

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
      if (node.left) {
        this.insertNode(node.left, newNode)
      } else {
        node.left = newNode
        newNode.parent = node
      }
    } else {
      if (node.right) {
        this.insertNode(node.right, newNode)
      } else {
        node.right = newNode
        newNode.parent = node
      }
    }
  }

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

    console.log(res.reverse())
  }
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

  levelOrderTraverse() {
    if (this.root) {
      const queue = [this.root]
      while (queue.length) {
        const node = queue.shift()
        console.log(node?.value)
        if (node?.left) queue.push(node.left)
        if (node?.right) queue.push(node.right)
      }
    }
  }

  getMaxValue() {
    if (this.root) {
      let current = this.root
      while (current.right) {
        current = current.right
      }
      return current.value
    }

    return null
  }

  getNinValue() {
    if (this.root) {
      let current = this.root
      while (current.left) {
        current = current.left
      }
      return current.value
    }

    return null
  }

  search(value: T) {
    let current = this.root

    while (current) {
      if (value === current.value) {
        return current
      }

      if (value > current.value) {
        current = current.right
      } else {
        current = current.left
      }
    }

    return null
  }

  remove(value: T) {
    // 查找 value 所在的节点
    const current = this.search(value)
    if (!current) return false

    let replaceNode: TreeNode<T> | null = null

    if (current.left === null && current.right === null) {
      replaceNode = null
    } else if (current.right === null) {
      replaceNode = current.left
    } else if (current.left === null) {
      replaceNode = current.right
    } else {
      const tmpNode = this.getSuccessor(current)
      replaceNode = tmpNode
    }

    if (current === this.root) {
      this.root = null
    } else if (current.isLeft) {
      current.parent!.left = replaceNode
    } else {
      current.parent!.right = replaceNode
    }

    return true
  }
  private getSuccessor(node: TreeNode<T>) {
    let current = node.right
    while (current?.left) {
      current = current.left
    }

    if (current !== node.right) {
      current!.parent!.left = current?.right || null
      current!.right = node.right
      console.log(current)
    }

    current!.left = node.left
    return current
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

bst.print()
// bst.preOrderTraverse()
// console.log("\n\n")
// bst.preOrderTraverseUseOfStackOptimized()

// bst.inOrderTraverseUseOfStack()
// bst.inOrderTraverse()
// console.log("\n\n")
// bst.inOrderTraverseUseOfStackOptimized()

bst.postOrderTraverse()
console.log("\n\n")
bst.postOrderTraverseUseOfStackOptimized()
// bst.postOrderTraverseUseOfStack()
