import { Tag } from '../tag/Tag.js';
import type { FormAttributes, Template } from './types.js';

export class HexletCode {
  /**
   * Builds the markup for a `<form>` tag using the {@link Tag} primitive.
   *
   * Walking skeleton: the rendered tag only carries its built-in defaults
   * (`action="#"`, `method="post"`). Reading fields from `template`,
   * translating `url` into `action`, overriding `method`, passing through
   * extra attributes, and invoking `callback` to generate fields are all
   * later steps.
   *
   * @param _template Not yet read.
   * @param _formAttributes Not yet applied.
   * @param _callback Required, but never invoked at this step.
   */
  static formFor(
    _template: Template,
    _formAttributes: FormAttributes,
    _callback: () => void,
  ): string {
    return new Tag('form', { action: '#', method: 'post' }).toString();
  }
}
