import { Tag } from '../tag/Tag.js';
import type { FieldOptions, Template } from './types.js';

/**
 * The object handed to `formFor`'s callback. Declares fields against the
 * template and collects their rendered markup in declaration order, for
 * `formFor` to concatenate (no separator) into the form tag's body.
 */
export class FormBuilder {
  private readonly template: Template;
  private readonly fields: string[] = [];

  constructor(template: Template) {
    this.template = template;
  }

  /**
   * Declares a text-input field bound to the template key `name`.
   *
   * Resolved attribute order is always `name`, then `type`, then `value`
   * (from the template), then the caller's `fieldOptions` in the order
   * supplied. Spreading `fieldOptions` last overwrites (rather than
   * duplicates) any of those defaults in place when the caller supplies one
   * — the same rule `formFor` already applies to `method`. The template value
   * is bound to an attribute, so per
   * docs/adr/0002-form-layer-escapes-template-values.md it is passed through
   * raw and escaped by the tag layer on render; escaping it here as well
   * would double-escape it.
   *
   * @param name Template key this field is bound to.
   * @param fieldOptions Extra rendering-layer attributes for the field's tag.
   *   `as` is rejected at compile time until the follow-up ticket that
   *   introduces it, and is dropped here so it can never reach the tag.
   * @throws Error if `name` is not a key of the template (checked by key
   *   presence, not truthiness — a template value of `''` is legitimate).
   */
  input(name: string, fieldOptions: FieldOptions = {}): void {
    if (!Object.hasOwn(this.template, name)) {
      throw new Error(`Field '${name}' does not exist in the template.`);
    }

    const { as, ...attributes } = fieldOptions;

    this.fields.push(
      new Tag('input', {
        name,
        type: 'text',
        value: this.template[name],
        ...attributes,
      }).toString(),
    );
  }

  /** The accumulated fields' markup, in declaration order, no separator. */
  toString(): string {
    return this.fields.join('');
  }
}
