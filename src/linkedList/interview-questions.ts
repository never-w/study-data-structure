import { LinkedNode } from "."

/**
 * 翻转链表
 * Definition for singly-linked list.
 * class ListNode {
 *     val: number
 *     next: ListNode | null
 *     constructor(val?: number, next?: ListNode | null) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.next = (next===undefined ? null : next)
 *     }
 * }
 */
function reverseList(head: LinkedNode | null): LinkedNode | null {
  if (!head || !head.next) return null

  let current = head
  let newHead: LinkedNode | null = null
  while (current) {
    current = head.next!
    head.next = newHead
    newHead = head
    head = current
  }
  return newHead
}
