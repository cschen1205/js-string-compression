var expect = require("chai").expect;
var jsscompress = require("../src/jsscompress");

describe("Hauffman algorithm", function(){
   it("should read and write trie correctly", function(){
      var text = "Hello World";
       var hm = new jsscompress.Hauffman();
       var trie = hm.buildTrie(text);
       var code = {};
       hm.buildCode(trie, "", code);
       for(var cc in code){
           console.log(String.fromCharCode(cc) + ": " + code[cc]);
       }
       var bitStream = new jsscompress.Queue();
       hm.writeTrie(trie, bitStream);
       var trie2 = hm.readTrie(bitStream);
       var code2 = {};
       hm.buildCode(trie2, "", code2);
       for(var cc in code2) {
           console.log(String.fromCharCode(cc) + ": " + code2[cc]);
           expect(cc in code).to.equal(true);
           expect(code[cc]).to.equal(code2[cc]);
       }
       
       bitStream = hm.compressToBinary(text);
       
       var text2 = hm.decompressFromBinary(bitStream);
       console.log(text2);
       expect(text2).to.equal(text);
       
       var compressed = hm.compress(text);
       console.log(compressed);
   }); 
});