import { ArrayStack } from "."

/**
 * 实现十进制转二进制
 */
function decimalToBinary(decimalNumber: number): string {
  const stack = new ArrayStack<number>()

  while (decimalNumber > 0) {
    const remainder = decimalNumber % 2
    stack.push(remainder)
    decimalNumber = Math.floor(decimalNumber / 2)
  }

  let binaryString = ""
  while (!stack.isEmpty()) {
    binaryString += stack.pop()
  }

  return binaryString
}

// const result = decimalToBinary(11)
// console.log(result, "   result")

/**
 * 给定一个只包括 '('，')'，'{'，'}'，'['，']' 的字符串 s ，判断字符串是否有效
 */
function isValid(str: string) {
  const stack = new ArrayStack<string>()
  for (let i = 0; i < str.length; i++) {
    const element = str[i]
    switch (element) {
      case "(":
        stack.push(")")
        break
      case "{":
        stack.push("}")
        break
      case "[":
        stack.push("]")
        break
      default:
        if (stack.pop() !== element) return false
        break
    }
  }
  return stack.length === 0
}

console.log(isValid("[[[]]]")) // true
console.log(isValid("[[[}]]]")) // false
