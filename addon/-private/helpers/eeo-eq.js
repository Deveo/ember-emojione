import {helper} from 'ember-helper';

export function eeoEq(params/*, hash*/) {
  return params.reduce((a, b) => a === b && b);
}

export default helper(eeoEq);
