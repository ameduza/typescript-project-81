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
 * The field-layer map accepted by `input` after the field name: any
 * rendering-layer attribute to carry on the field's tag. Mirrors Form
 * attributes in shape; unlike it, nothing is stripped yet — `as` (which will
 * be) is introduced in a follow-up ticket.
 */
export type FieldOptions = Attributes;
