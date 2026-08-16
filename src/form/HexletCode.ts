import { Tag } from '../tag/Tag.js';
import { FormBuilder } from './FormBuilder.js';
import type { FormAttributes, Template } from './types.js';

export class HexletCode {
  /**
   * Builds the markup for a `<form>` tag using the {@link Tag} primitive.
   *
   * `url` translates into the rendered `action` attribute, defaulting to
   * `#` only when `url` is absent.
   *
   * `callback` is invoked exactly once, synchronously, with a
   * {@link FormBuilder} bound to `template`. Fields declared on it during
   * the call are collected, in declaration order with no separator, as the
   * form tag's body.
   *
   * Resolved attribute order is always `action`, then `method`, then the
   * caller's extra attributes in the order supplied. Spreading `rest` last
   * overwrites (rather than duplicates) the `method` key in place when the
   * caller supplies one, which is what makes it an override and not a
   * second attribute.
   *
   * @param template Supplies the values fields read from and validates
   *   field names against.
   * @param formAttributes `url` plus any rendering-layer attributes to
   *   carry on the form tag.
   * @param callback Declares the form's fields against the form builder it
   *   receives.
   */
  static formFor(
    template: Template,
    formAttributes: FormAttributes,
    callback: (builder: FormBuilder) => void,
  ): string {
    const { url, ...rest } = formAttributes;
    const builder = new FormBuilder(template);
    callback(builder);

    return new Tag(
      'form',
      {
        action: url ?? '#',
        method: 'post',
        ...rest,
      },
      builder.toString(),
    ).toString();
  }
}
