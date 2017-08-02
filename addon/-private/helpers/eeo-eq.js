import { helper } from '@ember/component/helper';

export function eeoEq(params/*, hash*/) {
  return params.reduce((a, b) => a === b);
}

export default helper(eeoEq);
