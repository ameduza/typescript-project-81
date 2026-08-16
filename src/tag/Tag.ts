import type { Attributes } from './types.js';
import { VOID_TAGS } from './voidElements.js';

/**
 * Escapes the markup-significant characters shared by every escaping
 * context: `&`, `<` and `>`. `&` must be replaced first, otherwise the
 * ampersands introduced by the later replacements would be double-escaped.
 */
const escapeMarkup = (value: string): string =>
  value.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');

/**
 * Escapes a value for safe interpolation inside a double-quoted attribute.
 *
 * Single quotes are not escaped: rendered values are always wrapped in double
 * quotes, so `'` cannot terminate the value.
 */
const escapeAttributeValue = (value: string): string =>
  escapeMarkup(value).replaceAll('"', '&quot;');

/**
 * Escapes a value for safe interpolation inside a tag's body.
 *
 * Per docs/adr/0002-form-layer-escapes-template-values.md, the tag layer
 * never escapes its body (so nested tag output can compose); this helper is
 * what the form layer calls for template values it renders as a tag's body,
 * such as a textarea's value.
 *
 * Double quotes are left alone: a tag body has no quoting to break out of,
 * unlike an attribute value.
 */
export const escapeText = (value: string): string => escapeMarkup(value);

export class Tag {
  private readonly name: string;
  private readonly attributes: Attributes;
  private readonly body: string;

  /**
   * @param name Tag name. Matched against the void-tag list case-insensitively.
   *   Assumed to be developer-controlled: it is rendered as-is, without
   *   escaping or validation. The same applies to attribute keys.
   * @param attributes Attribute map. Copied defensively, so later mutations of
   *   the passed object do not affect this tag. Values are escaped on render.
   * @param body Raw inner HTML. Intentionally **not** escaped, so that nested
   *   `Tag` output can be composed. Callers are responsible for escaping any
   *   untrusted text before passing it here.
   */
  constructor(name: string, attributes: Readonly<Attributes> = {}, body = '') {
    this.name = name;
    this.attributes = { ...attributes };
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
