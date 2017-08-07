import { helper } from '@ember/component/helper';

export function eeoAnd(params/*, hash*/) {
  return params.reduce((result, item) => result && !!item, true);
}

export default helper(eeoAnd);
