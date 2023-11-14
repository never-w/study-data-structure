class Graph<T> {
  private vertexes: T[] = []
  private adjList: Map<T, T[]> = new Map()

  addVertex(vertex: T) {
    if (!this.vertexes.includes(vertex)) {
      // 将顶点添加到数组中保存
      this.vertexes.push(vertex)
      // 创建一个邻接表中的数组
      this.adjList.set(vertex, [])
    }
  }

  addEdge(v1: T, v2: T) {
    this.adjList.get(v1)?.push(v2)
    this.adjList.get(v2)?.push(v1)
  }

  printEdge() {
    this.vertexes.forEach((vertex) => {
      const edges = this.adjList.get(vertex)
      console.log(`${vertex} -> ${edges?.join(" ")}`)
    })
  }

  bfs() {
    // 判断是否有顶点
    if (this.vertexes.length === 0) return

    // 创建队列用于进一步探索
    const queue: T[] = []
    // 创建set用于确定该顶点受否访问过
    const visited = new Set<T>()

    // 先，加入第一个顶点，表示访问过
    visited.add(this.vertexes[0])
    // 再，第一个顶点已经访问，需要加入队列进行进一步探索
    queue.push(this.vertexes[0])

    // 遍历队列中每一个顶点，进行进一步探索
    while (queue.length) {
      const vertex = queue.shift()
      console.log(vertex)

      const neighbors = this.adjList.get(vertex!)
      if (!neighbors) continue
      neighbors?.forEach((item) => {
        if (!visited.has(item)) {
          visited.add(item)
          queue.push(item)
        }
      })
    }
  }

  dfs() {
    // 判断是否有顶点
    if (this.vertexes.length === 0) return

    // 创建队列用于进一步探索
    const stack: T[] = []
    // 创建set用于确定该顶点受否访问过
    const visited = new Set<T>()

    visited.add(this.vertexes[0])
    stack.push(this.vertexes[0])

    while (stack.length) {
      const vertex = stack.pop()
      console.log(vertex)

      const neighbors = this.adjList.get(vertex!)
      if (!neighbors) continue
      // 这里使用倒序遍历
      for (let i = neighbors.length - 1; i >= 0; i--) {
        const item = neighbors[i]
        if (!visited.has(item)) {
          visited.add(item)
          stack.push(item)
        }
      }
    }
  }
}

// 测试
const graph = new Graph()
graph.addVertex("A")
graph.addVertex("B")
graph.addVertex("C")
graph.addVertex("D")
graph.addVertex("E")
graph.addVertex("F")
graph.addVertex("G")
graph.addVertex("H")
graph.addVertex("I")

graph.addEdge("A", "B")
graph.addEdge("A", "C")
graph.addEdge("A", "D")
graph.addEdge("C", "D")
graph.addEdge("C", "G")
graph.addEdge("D", "G")
graph.addEdge("D", "H")
graph.addEdge("B", "E")
graph.addEdge("B", "F")
graph.addEdge("E", "I")

graph.printEdge()
// graph.bfs()
graph.dfs()
