/**
 * Value accepted for an attribute.
 *
 * - `string` / `number` renders as `key="value"`
 * - `true` renders the bare boolean attribute `key`
 * - `false` omits the attribute entirely
 *
 * `null` and `undefined` are intentionally excluded: an absent value must be a
 * deliberate decision at the call site rather than a silently dropped
 * attribute.
 */
export type AttributeValue = string | number | boolean;

/** Attribute map accepted by {@link Tag}. */
export type Attributes = Record<string, AttributeValue>;
