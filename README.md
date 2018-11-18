# tf-idf
This is a Term Frequency Inverse Document Frequency

Inspired from Coding Train challange [found here](https://github.com/CodingTrain/website/tree/master/CodingChallenges/CC_040.3_tf-idf/P5).

Using some text from a couple wiki articles this code looks at one file and counts the number of times a word is in the 
document inversly proprtional to the other documents.

# Formula

tf is term frequency, how many times the word is found in the document
totalFiles is the total number of documents
df is the document frequncy, plus 1 if that word is also found one of the other documents
tfidf = tf * Log(totalFiles/df)

# Visual 

The top 100 words are used to create circles with the larger the size being more times found in the document. And using a flocking
algoritm to control their movements.

# Demo

live demo found [here](https://tweety79rw.github.io/tf-idf/)
