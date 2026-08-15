import { Tag } from '../tag/Tag.js';
import type { FormAttributes, Template } from './types.js';

export class HexletCode {
  /**
   * Builds the markup for a `<form>` tag using the {@link Tag} primitive.
   *
   * `url` translates into the rendered `action` attribute, defaulting to
   * `#` only when `url` is absent. Reading fields from `template` and
   * invoking `callback` to generate fields are later steps.
   *
   * Resolved attribute order is always `action`, then `method`, then the
   * caller's extra attributes in the order supplied. Spreading `rest` last
   * overwrites (rather than duplicates) the `method` key in place when the
   * caller supplies one, which is what makes it an override and not a
   * second attribute.
   *
   * @param _template Not yet read.
   * @param formAttributes `url` plus any rendering-layer attributes to
   *   carry on the form tag.
   * @param _callback Required, but never invoked at this step.
   */
  static formFor(
    _template: Template,
    formAttributes: FormAttributes,
    _callback: () => void,
  ): string {
    const { url, ...rest } = formAttributes;

    return new Tag('form', {
      action: url ?? '#',
      method: 'post',
      ...rest,
    }).toString();
  }
}
