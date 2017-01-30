import computed from 'ember-computed';
import get from 'ember-metal/get';



export default function getCPMacro(objectPropName, targetPropName) {
  return computed(objectPropName, targetPropName, function() {
    const object = this.get(objectPropName);
    const target = this.get(targetPropName);

    return get(object, target);
  });
}
