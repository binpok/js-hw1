// ## Decorator

function createObject(num) {
    return {
      num,
      sum(num) {
        return this.num + num;
      },
    };
  }
  
  const obj = createObject(1);
  
  const cachesDecorator = (func) => {
    const map = new Map();
    return function (num) {
      if (!map.has(num)) {
        const result = func.call(this, num);
        map.set(num, result);
      }
      return map.get(num);
    };
  };
  
  const sum = function (num) {
    return this.num + num;
  };
  
  const decoratedSum = cachesDecorator(sum);
  console.log(decoratedSum.call(obj, 2));
  console.log(decoratedSum.call(obj, 2));
  
  const decoratedSum2 = cachesDecorator(obj.sum);
  console.log(decoratedSum.call(obj, 3));
  console.log(decoratedSum.call(obj, 3));
  console.log(decoratedSum.call(obj, 33));
  
  // ## Factorial recursion
  
  const factorial = (initialNumber) => {
    return initialNumber === 1
      ? initialNumber
      : initialNumber * factorial(initialNumber - 1);
  };
  
  // ## Fibonacci recursion
  
  const fib = (length) => {
    return length <= 1 ? length : fib(length - 1) + fib(length - 2);
  };
  
  const fibSeq = [];
  for (let i = 1; i <= 8; i++) {
    fibSeq.push(fib(i));
  }
  
  console.log(fibSeq.join(" "));
  
  // ## Read List
  
  class ListNode {
    constructor(title, next = null) {
      this.title = title;
      this.next = next;
    }
  }
  
  const list = new ListNode(
    "lesson-1",
    new ListNode(
      "lesson-2",
      new ListNode(
        "lesson-3",
        new ListNode("lesson-4", new ListNode("lesson-5"))
      )
    )
  );
  
  const readList = (list) => {
    while (list) {
      console.log(list.title);
      list = list.next;
    }
  };
  
  readList(list);
  
  // ## Deep Copy (optional)
  
  const arr = [
    1,
    "string",
    null,
    undefined,
    { a: 15, b: 10, c: [1, 2, 3, { a: 4 }], d: undefined, e: true },
    true,
    false,
  ];
  
  const deepCopy = (obj) => {
    if (typeof obj !== "object" || obj === null) {
      return obj;
    }
  
    if (Array.isArray(obj)) {
      return obj.map((item) => deepCopy(item));
    } else {
      const copyObject = {};
      for (const [key, value] of Object.entries(obj)) {
        copyObject[key] = deepCopy(value);
      }
      return copyObject;
    }
  };
  
  const copiedArray = deepCopy(arr);
  console.log(copiedArray);
  
  // ## DOM (optional)
  
  class HTMLNode {
    constructor(tagName, attrs = {}, children = []) {
      this.tagName = tagName;
      this.attrs = attrs;
      this.children = children;
    }
  }
  
  const table = new HTMLNode("table", { border: "1" }, [
    new HTMLNode("tr", null, [new HTMLNode("td", null, ["1x1"]), new HTMLNode("td", null, ["1x2"])]),
    new HTMLNode("tr", null, [new HTMLNode("td", null, ["2x1"]), new HTMLNode("td", null, ["2x2"])])
  ]);
  
  const render = (node) => {
    let html = `<${node.tagName}`;
    for (const [attr, value] of Object.entries(node.attrs)) {
      html += ` ${attr}="${value}"`;
    }
    html += ">";
  
    for (const child of node.children) {
      if (child instanceof HTMLNode) {
        html += render(child);
      } else if (typeof child === "string") {
        html += child;
      }
    }
  
    html += `</${node.tagName}>`;
  
    return html;
  };
  
  const html = render(table);
  
  document.write(html);
  