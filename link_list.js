class Node {
    constructor(value, next = null) {
        this.value = value;
        this.next = next;
    }

    toString(callback) {
        return callback ? callback(this.value) : `${this.value}`;
    }
}

class LinkList {
    constructor() {
        this.head = null;
        this.tail = null;
    }

    append(value) {
        const node = new Node(value);

        if (!this.head) {
            this.head = this.tail = node;
            return this;
        }
        this.tail.next = node;
        this.tail = node;
        return this;
    }

    prepend(value) {
        // const node = new Node(value);
        const node = new Node(value, this.head);
        this.head = node;

        return this;
    }

    find(value) {
        if (!this.head) {
            return null;
        }

        let currentNode = this.head;
        while (currentNode) {
            if (currentNode.value === value) {
                return currentNode;
            }
            currentNode = currentNode.next;
        }

        return null;
    }

    deleteTail() {
        const foundTail = this.tail;

        if (this.head === this.tail) {
            this.head = this.tail = null;
            return foundTail;
        }

        let currentNode = this.head;
        while (currentNode.next.next) {
            currentNode = currentNode.next;
        }
        currentNode.next = null;

        // let currentNode = this.head;
        // while (currentNode.next) {
        //     if (!currentNode.next.next) {
        //         currentNode.next = null;
        //     } else {
        //         currentNode = currentNode.next;
        //     }
        // }

        // this.tail = currentNode;

        return foundTail;
    }

    deleteHead() {
        const foundHead = this.head;

        if (this.head === this.tail) {
            this.head = this.tail = null;
            return foundHead;
        }
        this.head = this.head.next;

        return foundHead;
    }

    delete(value) {
        if (!this.head) {
            return null;
        }

        if (this.head.value === value) {
            return this.deleteHead();
        }

        let currentNode = this.head;
        let nextNode = null;
        while (currentNode) {
            nextNode = currentNode.next;
            if (!nextNode) {
                return null;
            }

            if (nextNode.value === value) {
                currentNode.next = nextNode.next;
                return nextNode;
            }
            currentNode = nextNode;
        }
        return null;
    }

    /**
     * tu tuong: lay phan tu hien tai lien ket voi phan tu truoc do
     * @returns LinKList
     */
    reverse() {
        // const arr = this.toArray();
        // for (let i = 0, len = arr.length; i < len / 2; i++) {
        //     const cur = arr[i];
        //     arr[i] = arr[len - i - 1];
        //     arr[len - i - 1] = cur;
        // }
        // return arr;

        if (this.head === this.tail) {
            return this;
        }

        let currentNode = this.head;
        let nextNode = null;
        let prevNode = null;

        while (currentNode) {
            nextNode = currentNode.next;

            currentNode.next = prevNode; // <=> this.head.next = null;
            prevNode = currentNode;
            currentNode = nextNode;  // <=> this.head !== currentNode
        }
        this.tail = this.head;
        this.head = prevNode;
        return this;
    }

    toString(callback) {
        return this.toArray().map(node => node.toString(callback)).toString();
    }

    toArray() {
        const list = [];
        let currentNode = this.head;
        while (currentNode) {
            list.push(currentNode.value);
            currentNode = currentNode.next;
        }
        return list;
    }
}


const list = new LinkList();

list.append(0);
list.append(1);
list.append(2);
list.append(3);
list.append(4);
list.prepend(-1);
list.prepend(-2);
// list.deleteTail();
// list.deleteHead();
// list.reverse();
const node = list.delete(4);
console.log(node);
const arr = list.toArray();

console.log(arr);
console.log(list.find(5));
console.log(list.find(3));

