import { Tag, escapeText } from '../tag/Tag.js';
import type { Attributes } from '../tag/types.js';
import type { FieldOptions, Template } from './types.js';

/**
 * Built-in `cols`/`rows` for a textarea field, applied before the caller's
 * `fieldOptions` so an extra `rows` or `cols` overrides the default in place
 * rather than duplicating it.
 */
export const TEXTAREA_DEFAULTS = { cols: 20, rows: 40 } as const;

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
   * Declares a field bound to the template key `name`.
   *
   * Renders a text input by default. When `fieldOptions.as` is `'textarea'`,
   * renders a `<textarea>` instead, carrying the template value as the tag's
   * escaped body rather than a `value` attribute — per
   * docs/adr/0002-form-layer-escapes-template-values.md, a template value
   * landing in a tag's body must go through the text-escaping helper, unlike
   * a value bound to an attribute (which the tag layer escapes on render).
   *
   * Resolved attribute order for a text input is always `name`, then `type`,
   * then `value` (from the template), then the caller's `fieldOptions` in
   * the order supplied. For a textarea it is the built-in `cols`/`rows`
   * defaults, then `name`, then the caller's extras. Spreading the extras
   * last overwrites (rather than duplicates) any of those defaults in place
   * when the caller supplies one — the same rule `formFor` already applies
   * to `method`.
   *
   * @param name Template key this field is bound to.
   * @param fieldOptions Extra rendering-layer attributes for the field's tag,
   *   plus `as` to select a control other than the default text input. `as`
   *   is stripped here before the attribute spread so it can never reach the
   *   tag.
   * @throws Error if `name` is not a key of the template (checked by key
   *   presence, not truthiness — a template value of `''` is legitimate).
   * @throws Error if `as` is forced through (e.g. from JavaScript) with a
   *   value outside its closed union — a TypeScript caller can never reach
   *   this, since an unknown `as` is a compile-time error.
   */
  input(name: string, fieldOptions: FieldOptions = {}): void {
    if (!Object.hasOwn(this.template, name)) {
      throw new Error(`Field '${name}' does not exist in the template.`);
    }

    // `value?: never` on FieldOptions (see types.ts) is a compile-time-only
    // guard: a caller who bypasses TypeScript (e.g. via `@ts-expect-error`
    // or an untyped JS call) can still smuggle a `value` key through, in
    // which case it spreads onto the tag and overrides the template's value
    // exactly as it did before this guard existed — the same trade-off
    // `FormAttributes` already makes for `action`. This cast just lets the
    // (possibly still-present) rest spread onto a plain `Attributes` map.
    const { as, ...rest } = fieldOptions;
    const attributes = rest as Attributes;
    const value = this.template[name];

    if (as === 'textarea') {
      this.fields.push(
        new Tag(
          'textarea',
          { ...TEXTAREA_DEFAULTS, name, ...attributes },
          escapeText(value),
        ).toString(),
      );
      return;
    }

    if (as !== undefined) {
      throw new Error(`Unsupported 'as' value: '${String(as)}'.`);
    }

    this.fields.push(
      new Tag('input', {
        name,
        type: 'text',
        value,
        ...attributes,
      }).toString(),
    );
  }

  /** The accumulated fields' markup, in declaration order, no separator. */
  toString(): string {
    return this.fields.join('');
  }
}
