import {helper} from 'ember-helper';

export function eeoAnd(params/*, hash*/) {
  return params.reduce((result, item) => result && (item != null), true);
}

export default helper(eeoAnd);
