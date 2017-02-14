import {helper} from 'ember-helper';

export function eeoExists(params/*, hash*/) {
  return params.reduce((result, item) => result && (item != null), true);
}

export default helper(eeoExists);
