# js-string-compression
Package provides javascript for string compression

# Usage


```javascript
var jsscompress = require("js-string-compression");

var raw_text = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.";

var hm = new jsscompress.Hauffman();
var compressed = hm.compress(raw_text);

console.log("before compressed: " + raw_text);
console.log("length: " + raw_text.length);
console.log("after compressed: " + compressed);
console.log("length: " + compressed.length);

console.log("decompressed: " + hm.decompress(compressed));
```