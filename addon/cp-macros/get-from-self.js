import computed from 'ember-computed';



export default function getFromSelfCPMacro(targetPropName) {
  return computed(targetPropName, function() {
    const target = this.get(targetPropName);
    return this.get(target);
  });
}
