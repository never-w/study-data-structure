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
