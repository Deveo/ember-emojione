import { helper } from '@ember/component/helper';
import { htmlSafe } from '@ember/string';

export function eeoHtmlSafe([str]/*, hash*/) {
  return htmlSafe(str);
}

export default helper(eeoHtmlSafe);
