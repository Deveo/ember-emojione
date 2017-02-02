export const EMOJI_TONES_ARRAY = ['default', 1, 2, 3, 4, 5];

export const EMOJI_CATEGORIES_ARRAY = [
  'people',
  'nature',
  'food',
  'activity',
  'travel',
  'objects',
  'symbols',
  'flags'
];

export const DEPENDENT_KEYS_FOR_EMOJI_CATEGORIES = EMOJI_CATEGORIES_ARRAY.join(',');

export const DEPENDENT_KEYS_FOR_EMOJI_SERVICE = (() => {
  const dependentKeys = [];

  EMOJI_CATEGORIES_ARRAY.forEach(category => {
    EMOJI_TONES_ARRAY.forEach(tone => {
      const key = `emojiService.${category}__tone_${tone}`;
      dependentKeys.push(key);
    });
  });

  return dependentKeys.join(',');
})();
