import { ArrayQueue } from '.'

/**
 * 击鼓传花
 */
function hotPotato(names: string[], num: number) {
  if (names.length === 0) return -1

  const queue = new ArrayQueue<string>()

  for (const item of names) {
    queue.enqueue(item)
  }

  while (queue.size() > 1) {
    for (let i = 0; i < num; i++) {
      const name = queue.dequeue()
      if (name) queue.enqueue(name)
    }

    queue.dequeue()
  }

  return queue.dequeue()
}
