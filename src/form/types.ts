import type { Attributes } from '../tag/types.js';

/** The plain object whose fields supply the values for a rendered form. */
export type Template = Record<string, string>;

/**
 * The form-layer map accepted by `HexletCode.formFor` alongside the
 * template: the form's `url` plus any rendering-layer attributes to carry
 * on the form tag itself (see docs/adr/0001-form-attributes-pass-through.md).
 *
 * `action` is unsettable here — `url` is the only way to point the form at
 * an address. `Omit<Attributes, 'action'>` alone can't express that: `Attributes`
 * is a bare index signature (`Record<string, AttributeValue>`), so its
 * `keyof` is plain `string`, which `Omit` can't narrow a single literal key
 * out of. The explicit `action?: never` is what actually forces a
 * compile-time error at the call site.
 */
export type FormAttributes = {
  url?: string;
  action?: never;
} & Omit<Attributes, 'action'>;
