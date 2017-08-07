import { computed, get } from '@ember/object';
import { A } from '@ember/array';

// http://regexr.com/3e9a3
const propertyRegEx = /\$\{([^\b]+?)\}/g;

export default function computedTemplateString(string) {
  const dependentKeys = getAllMatches(string, propertyRegEx).uniq();

  return computed(...dependentKeys, function() {
    return string.replace(propertyRegEx, (match, property) => {
      return get(this, property);
    });
  });
}

// To get all capturing groups in a RegEx, we have to run `exec` repeatedly.
// See: <https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/exec#Finding_successive_matches>
function getAllMatches(string, regEx) {
  const regExp = new RegExp(regEx);

  const matches = A();
  let matchArray;
  while (matchArray = regExp.exec(string)) { // eslint-disable-line no-cond-assign
    const match = matchArray[1];
    matches.push(match);
  }

  return matches;
}
