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
}

// const avlNode1 = new AVLTreeNode(6)
// console.log(avlNode1.getHeight()) // 1
// avlNode1.right = new AVLTreeNode(7)
// avlNode1.right.right = new AVLTreeNode(8)
// console.log(avlNode1.getHeight()) // 3
