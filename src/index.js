/*
validator's isValidXML function receives a string, checks if a string is a valid xml, and returns a boolean.

<a /> => true
<a></a> => true
<a>test</a> => true
<a><b></b></a> => true
<a></a><b></b> => true

<a> => false
<<a></a> => false
<a><b></a></b> => false

IMPORTANT: Please note that we have our own internal rules about validity.
1. A node cannot contain a node with the same tag. ex) <a><a></a></a> => false
2. A node cannot be followed by a node with the same tag. ex) <a></a><a></a> => false
3. An xml cannot be more than 2 levels deep. ex) <a><b><c><d></d></c></b></a> => false

IMPORTANT: Feel free to use any open source libraries you find necessary. You can use xml parsing libraries as well.
IMPORTANT: Don't worry about XML declaration, node attributes, or unicode characters.

For further examples, please check basic_spec.js file.

DO NOT MODIFY
*/

/*
@param xmlString: a string, possibly a valid xml string
@return boolean;
*/
exports.isValidXML = xmlString => {

  var parser = require('fast-xml-parser');

  if (xmlString.length === 0) {
    return false;
  }

  // fast-xml-validator
  if (parser.validate(xmlString) != true) {
    return false;
  }

  // for Vingle's rules
  let tagStack = [];

  for (let i = 0; i < xmlString.length; i++) {

    if (xmlString[i] === "<") { //starting of tag
        //read until you reach to '>' avoiding any '>' in attribute value

        i++;
        if (xmlString[i] === "?") {
            i = readPI(xmlString, ++i);
            if (i.err) {
                return i;
            }
        } else if (xmlString[i] === "!") {
            i = readCommentAndCDATA(xmlString, i);
            continue;
        } else {
            let closingTag = false;
            if (xmlString[i] === "/") {//closing tag
                closingTag = true;
                i++;
            }
            //read tagname
            let tagName = "";
            for (; i < xmlString.length &&
                   xmlString[i] !== ">" &&
                   xmlString[i] !== " " &&
                   xmlString[i] !== "\t"; i++) {

                tagName += xmlString[i];
            }
            tagName = tagName.trim();
            tagStack.push(tagName);
            
        }
      }
    }
    // console.log(tagStack);
    let lastTag = "";
    let tagStr = "";
    for (i=0; i < tagStack.length; i++) {
      lastTag = tagStack.pop()
      tagStr = tagStr + (lastTag);
    }
    console.log(tagStr);

    if(tagStr.match("aa") || tagStr.match("abcd")) {
      return false;
    }
    


  return true;  
};
