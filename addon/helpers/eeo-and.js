import {helper} from 'ember-helper';

export function eeoAnd(params/*, hash*/) {
  return params.reduce((a, b) => a && b);
}

export default helper(eeoAnd);
