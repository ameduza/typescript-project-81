import type { Attributes } from '../tag/types.js';

/** The plain object whose fields supply the values for a rendered form. */
export type Template = Record<string, string>;

/**
 * The form-layer map accepted by `HexletCode.formFor` alongside the
 * template: the form's `url` plus any rendering-layer attributes to carry
 * on the form tag itself. See docs/adr/0001-form-attributes-pass-through.md
 * for why `action` is unsettable here.
 *
 * `Omit<Attributes, 'action'>` alone can't express that: `Attributes` is a
 * bare index signature (`Record<string, AttributeValue>`), so its `keyof` is
 * plain `string`, which `Omit` can't narrow a single literal key out of. The
 * explicit `action?: never` is what actually forces the compile-time error
 * at the call site.
 */
export type FormAttributes = {
  url?: string;
  action?: never;
} & Omit<Attributes, 'action'>;

/**
 * Which control a field renders as, instead of the default text input.
 * A closed union: `'textarea'` is its only member today, so passing any
 * other value is a compile-time error. A JavaScript caller that forces an
 * unknown value through is rejected at runtime by `FormBuilder.input`.
 */
export type FieldAs = 'textarea';

/**
 * The field-layer map accepted by `input` after the field name: `as` plus
 * any rendering-layer attribute to carry on the field's tag.
 *
 * `as` selects the control to render rather than being an attribute, so it
 * is stripped before the attribute spread and can never leak onto the tag as
 * `as="..."` — the same way `FormAttributes` strips `url` before turning it
 * into `action`. See docs/adr/0001-form-attributes-pass-through.md.
 *
 * `value` is the field's implicit value — the tag's `value` attribute for a
 * text input, or the escaped body for a textarea
 * (docs/adr/0002-form-layer-escapes-template-values.md). A caller passing
 * `value` here would collide with (and, for a textarea, duplicate) that
 * implicit value, so `value?: never` forces the same compile-time error
 * `FormAttributes` already gives for `action` — this is a compile-time-only
 * guard, not a runtime one; see `FormBuilder.input`.
 *
 * `label` is an optional string that will be used as custom label text,
 * and `labelHtml` is an optional attributes map for the label tag. Both
 * are stripped before the attribute spread and can never leak onto the
 * field's tag.
 */
export type FieldOptions = {
  as?: FieldAs;
  value?: never;
  label?: string;
  labelHtml?: Attributes;
} & Omit<Attributes, 'as' | 'value' | 'label' | 'labelHtml'>;
