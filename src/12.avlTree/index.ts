import { btPrint } from 'hy-algokit'

class AVLTreeNode<T> {
  value: T
  left: AVLTreeNode<T> | null = null
  right: AVLTreeNode<T> | null = null
  parent: AVLTreeNode<T> | null = null
  constructor(value: T) {
    this.value = value
  }

  private getHeight(): number {
    const leftHeight = this.left?.getHeight() ?? 0
    const rightHeight = this.right?.getHeight() ?? 0
    return Math.max(leftHeight, rightHeight) + 1
  }
  private getBalanceFactor(): number {
    const leftHeight = this.left?.getHeight() ?? 0
    const rightHeight = this.right?.getHeight() ?? 0
    return leftHeight - rightHeight
  }

  get isLeft(): boolean {
    return !!(this.parent && this.parent.left === this)
  }
  get isRight(): boolean {
    return !!(this.parent && this.parent.right === this)
  }
  get isBalanced() {
    const factor = this.getBalanceFactor()
    return factor >= -1 && factor <= 1
  }

  /** 
       旋转不平衡的节点，要先找到不平衡节点的轴心；
       轴心是该不平衡节点，左、右子节点中，高度更高的子节点。
       如果左、右子节点，高度相等怎么办呢？

       事实上，基本不会出现这种情况；
       因为一个节点的左、右子节点高度要是相等，那么该节点就应该是平衡的。
     */
  public higherChild() {
    const leftHeight = this.left?.getHeight() ?? 0
    const rightHeight = this.right?.getHeight() ?? 0

    if (leftHeight > rightHeight) return this.left
    if (leftHeight < rightHeight) return this.right

    // 这里是第三种情况表示高度相等情况，但是这种情况基本不可能
    return this.isLeft ? this.left : this.right
  }

  /** LL情况 --> 进行右旋转 --> 一共进行四部曲 */
  rightRotation() {
    const isLeft = this.isLeft
    const isRight = this.isRight

    // 1. 处理pivot节点
    const pivot = this.left!
    pivot.parent = this.parent

    // 2. 处理pivot的right
    this.left = pivot.right
    if (pivot.right) {
      pivot.right.parent = this
    }

    // 3. 处理this（轴心的父节点）
    pivot.right = this
    this.parent = pivot

    // 4. 挂载pivot
    if (!pivot.parent) {
      // 4.1 pivot作为根节点
      return pivot
    } else if (isLeft) {
      // 4.2 pivot作为父节点的左子节点
      pivot.parent.left = pivot
    } else if (isRight) {
      // 4.3 pivot作为父节点的右子节点
      pivot.parent.right = pivot
    }

    return pivot
  }

  /** RR情况 --> 进行左旋转 --> 四部曲 */
  leftRotation() {
    const isLeft = this.isLeft
    const isRight = this.isRight

    // 1. 处理pivot节点
    const pivot = this.right!
    pivot.parent = this.parent

    // 2. 处理pivot的left
    this.right = pivot.left
    if (pivot.left) {
      pivot.left.parent = this
    }

    // 3. 处理this（轴心的父节点）
    this.parent = pivot
    pivot.left = this

    // 4. 挂载pivot
    if (!pivot.parent) {
      // 4.1 pivot作为根节点
      return pivot
    } else if (isLeft) {
      // 4.2 pivot作为父节点的左子节点
      pivot.parent.left = pivot
    } else if (isRight) {
      // 4.3 pivot作为父节点的右子节点
      pivot.parent.right = pivot
    }

    return pivot
  }
}

class AVLTree<T> {
  root: AVLTreeNode<T> | null = null

  /** 再平衡 */
  reBalance(root: AVLTreeNode<T>) {
    const pivot = root.higherChild()
    const current = pivot?.higherChild()

    let resultNode: AVLTreeNode<T> | null = null
    if (pivot?.isLeft) {
      if (current?.isLeft) {
        // LL 情况
        resultNode = root.rightRotation()
      } else {
        // LR 情况
        pivot.leftRotation()
        resultNode = root.rightRotation()
      }
    } else {
      if (current?.isRight) {
        // RR 情况
        resultNode = root.leftRotation()
      } else {
        // RL 情况
        pivot?.rightRotation()
        resultNode = root.leftRotation()
      }
    }

    if (!resultNode.parent) {
      this.root = resultNode
    }
  }

  /** 插入节点 */
  insert(value: T) {
    const newNode = new AVLTreeNode(value)

    if (!this.root) {
      this.root = newNode
    } else {
      this.insertNode(this.root, newNode)
    }
  }
  private insertNode(node: AVLTreeNode<T>, newNode: AVLTreeNode<T>) {
    if (newNode.value < node.value) {
      if (!node.left) {
        node.left = newNode
        newNode.parent = node // 新增插入的节点的 parent 引用
      } else {
        this.insertNode(node.left, newNode)
      }
    } else {
      if (!node.right) {
        node.right = newNode
        newNode.parent = node // 新增插入的节点的 parent 引用
      } else {
        this.insertNode(node.right, newNode)
      }
    }
  }

  /** 先序遍历 */
  preOrderTraverse() {
    this.preOrderTraverseNode(this.root)
  }
  private preOrderTraverseNode(node: AVLTreeNode<T> | null) {
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
  private inOrderTraverseNode(node: AVLTreeNode<T> | null) {
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
  private postOrderTraverseNode(node: AVLTreeNode<T> | null) {
    if (node) {
      this.postOrderTraverseNode(node.left)
      this.postOrderTraverseNode(node.right)
      console.log(node.value)
    }
  }

  /** 层序遍历 */
  levelOrderTraverse() {
    if (!this.root) return

    const queue: AVLTreeNode<T>[] = [this.root]

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

  print() {
    btPrint(this.root)
  }

  /** 搜索相等值 */
  search(value: T) {
    let current = this.root
    let parent: AVLTreeNode<T> | null = null

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

  remove(value: T) {
    // 1.查找 value 所在的节点
    const current = this.search(value)
    if (!current) return false

    let replaceNode: AVLTreeNode<T> | null = null
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
  private getSuccessor(delNode: AVLTreeNode<T>) {
    let current = delNode.right
    let successor: AVLTreeNode<T> | null = null

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
const avlTree = new AVLTree<number>()
avlTree.insert(10)
avlTree.insert(15)
avlTree.insert(20)
avlTree.print()

avlTree.reBalance(avlTree.root!)
avlTree.print()
