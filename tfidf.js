class TFIDF {
  constructor(strings) {
    this.strings = strings.map(function(d){return d.join('\n').toString().toLowerCase();});
    this.documents = [];
    // get term frequency of all documents
    for(let string of this.strings) {
      this.documents.push(this.termFrequency(string));
    }
    //get document frequency
    for(let origin of this.documents) {
      this.docFrequency(origin, this.documents.filter(function(d) { return d !== origin;}));
    }
  }
  getDocument(index) {
    return this.documents[index];
  }
  docFrequency(origin, others) {
    let keys = Object.keys(origin);
    for(let keyIndex = 0; keyIndex < keys.length; keyIndex++) {
      for(let i = 0; i < others.length; i++) {
        if(others[i].hasOwnProperty(keys[keyIndex])) {
          origin[keys[keyIndex]].df++;
        }
      }
    }
  }
  termFrequency(string) {
    let tfdf = {};
    let _this = this;
    let words = string.split(/\W+/).filter(function(d){return d.length > 0;});
    for(let i = 0; i < words.length;i++) {
      let word = words[i].toLowerCase();
      if(!tfdf.hasOwnProperty(word)){
        tfdf[word] = {
          tf:1,
          df:1,
          tfidf:function() {
            return this.tf * Math.log(_this.strings.length/this.df);
          }
        }
      } else {
        tfdf[word].tf++;
      }
    }
    return tfdf;
  }
}
