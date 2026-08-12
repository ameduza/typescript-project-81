/**
 * HTML void elements: they have no closing tag and no content.
 *
 * Stored lowercase; look-ups must lowercase the tag name first.
 *
 * @see https://html.spec.whatwg.org/multipage/syntax.html#void-elements
 */
export const VOID_TAGS: ReadonlySet<string> = new Set([
  'area',
  'base',
  'br',
  'col',
  'embed',
  'hr',
  'img',
  'input',
  'link',
  'meta',
  'param',
  'source',
  'track',
  'wbr',
]);
