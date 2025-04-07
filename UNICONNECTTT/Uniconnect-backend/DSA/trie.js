// trie.js

class TrieNode {
    constructor() {
        this.children = {};  // Store child nodes
        this.isEndOfWord = false;  // Flag for end of a word
    }
}

class Trie {
    constructor() {
        this.root = new TrieNode();  // Root node of the trie
    }

    // Insert a word into the trie
    insert(word) {
        let node = this.root;
        for (const char of word) {
            if (!node.children[char]) {
                node.children[char] = new TrieNode();
            }
            node = node.children[char];
        }
        node.isEndOfWord = true;
    }

    // Search if a word exists in the trie
    search(word) {
        let node = this.root;
        for (const char of word) {
            if (!node.children[char]) return false;
            node = node.children[char];
        }
        return node.isEndOfWord;
    }

    // Find all words with the given prefix (auto-complete feature)
    autoComplete(prefix) {
        let node = this.root;
        for (const char of prefix) {
            if (!node.children[char]) return [];
            node = node.children[char];
        }
        return this.collectAllWords(node, prefix);
    }

    // Helper function to collect all words from a given node
    collectAllWords(node, prefix, words = []) {
        if (node.isEndOfWord) {
            words.push(prefix);
        }

        for (const char in node.children) {
            this.collectAllWords(node.children[char], prefix + char, words);
        }

        return words;
    }
}

// Example usage:
const trie = new Trie();
trie.insert('hackathon');
trie.insert('hacker');
trie.insert('hack');
trie.insert('habit');

console.log(trie.autoComplete('hac')); // Output: ['hack', 'hacker', 'hackathon']

module.exports = Trie;
