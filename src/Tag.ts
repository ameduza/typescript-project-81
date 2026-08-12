const VOID_TAGS: ReadonlySet<string> = new Set([
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

/**
 * Value accepted for an attribute.
 *
 * - `string` / `number` renders as `key="value"`
 * - `true` renders the bare boolean attribute `key`
 * - `false` omits the attribute entirely
 */
type AttributeValue = string | number | boolean;

/** Attribute map accepted by {@link Tag}. */
export type Attributes = Record<string, AttributeValue>;

/**
 * Escapes a value for safe interpolation inside a double-quoted attribute.
 *
 * `&` must be replaced first, otherwise the ampersands introduced by the
 * later replacements would be double-escaped.
 */
const escapeAttributeValue = (value: string): string =>
  value
    .replaceAll('&', '&amp;')
    .replaceAll('"', '&quot;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;');

export class Tag {
  private readonly name: string;
  private readonly attributes: Attributes;
  private readonly body: string;

  /**
   * @param name Tag name. Matched against the void-tag list case-insensitively.
   * @param attributes Attribute map. Values are escaped on render.
   * @param body Raw inner HTML. Intentionally **not** escaped, so that nested
   *   `Tag` output can be composed. Callers are responsible for escaping any
   *   untrusted text before passing it here.
   */
  constructor(name: string, attributes: Attributes = {}, body = '') {
    this.name = name;
    this.attributes = attributes;
    this.body = body;
  }

  toString(): string {
    const opening = `<${this.name}${this.buildAttributes()}>`;

    if (this.isVoid()) {
      return opening;
    }

    return `${opening}${this.body}</${this.name}>`;
  }

  private isVoid(): boolean {
    return VOID_TAGS.has(this.name.toLowerCase());
  }

  private buildAttributes(): string {
    return Object.entries(this.attributes)
      .filter(([, value]) => value !== false)
      .map(([key, value]) =>
        value === true
          ? ` ${key}`
          : ` ${key}="${escapeAttributeValue(String(value))}"`,
      )
      .join('');
  }
}
