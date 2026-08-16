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
 * rendering-layer attribute to carry on the field's tag.
 *
 * `as` selects the control to render rather than being an attribute, and is
 * introduced in a follow-up ticket; until then it is rejected outright, so it
 * cannot leak onto the tag as `as="..."`. The `as?: never` carries that the
 * same way `FormAttributes` rejects `action` — see the note there for why
 * `Omit` alone can't.
 */
export type FieldOptions = {
  as?: never;
} & Omit<Attributes, 'as'>;
