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

export const EMOJI_PROP_NAMES_CATEGORY =
  EMOJI_TONES_ARRAY
    .map(tone => `emojiService.emoji__tone_${tone}`)
    .join(',');


export const EMOJI_PROP_NAMES_CATEGORY_TONE = (() => {
  const dependentKeys = [];

  EMOJI_CATEGORIES_ARRAY.forEach(category => {
    EMOJI_TONES_ARRAY.forEach(tone => {
      const key = `emojiService.${category}__tone_${tone}`;
      dependentKeys.push(key);
    });
  });

  return dependentKeys.join(',');
})();
