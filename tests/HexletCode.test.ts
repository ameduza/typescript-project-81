import { describe, it, expect, vi } from 'vitest';
import { HexletCode } from '../src/form/HexletCode.js';
import { FormBuilder } from '../src/form/FormBuilder.js';
import HexletCodeDefault from '../index.js';

describe('HexletCode', () => {
  describe('formFor', () => {
    it('renders a bare form tag using its built-in defaults', () => {
      expect(HexletCode.formFor({}, {}, () => {})).toBe(
        '<form action="#" method="post"></form>',
      );
    });

    it('invokes the callback exactly once, synchronously, with the form builder', () => {
      const callback = vi.fn();

      HexletCode.formFor({}, {}, callback);

      expect(callback).toHaveBeenCalledTimes(1);
      expect(callback.mock.calls[0]?.[0]).toBeInstanceOf(FormBuilder);
    });

    it('translates url into the action attribute', () => {
      expect(HexletCode.formFor({}, { url: '/users' }, () => {})).toBe(
        '<form action="/users" method="post"></form>',
      );
    });

    it('overrides method instead of adding a second attribute', () => {
      expect(
        HexletCode.formFor({}, { url: '/users', method: 'get' }, () => {}),
      ).toBe('<form action="/users" method="get"></form>');
    });

    it('passes an extra attribute through unchanged, after the defaults', () => {
      expect(
        HexletCode.formFor(
          {},
          { url: '/users', class: 'form-horizontal' },
          () => {},
        ),
      ).toBe(
        '<form action="/users" method="post" class="form-horizontal"></form>',
      );
    });

    it('renders an explicit empty url as action="", not the "#" default', () => {
      expect(HexletCode.formFor({}, { url: '' }, () => {})).toBe(
        '<form action="" method="post"></form>',
      );
    });

    it('rejects an action key at compile time, but passes it through at runtime', () => {
      expect(
        // @ts-expect-error action is unsettable; use url instead (see docs/adr/0001-form-attributes-pass-through.md)
        HexletCode.formFor({}, { action: '/users' }, () => {}),
      ).toBe('<form action="/users" method="post"></form>');
    });
  });

  describe('fields', () => {
    it('renders a label with for attribute before a text input', () => {
      expect(
        HexletCode.formFor({ name: 'rob' }, {}, (builder) => {
          builder.input('name');
        }),
      ).toBe(
        '<form action="#" method="post"><label for="name">Name</label><input name="name" type="text" value="rob"></form>',
      );
    });

    it('capitalizes only the first character of the label text', () => {
      expect(
        HexletCode.formFor({ first_name: 'rob' }, {}, (builder) => {
          builder.input('first_name');
        }),
      ).toBe(
        '<form action="#" method="post"><label for="first_name">First_name</label><input name="first_name" type="text" value="rob"></form>',
      );
    });

    it('appends an extra attribute after the built-in defaults', () => {
      expect(
        HexletCode.formFor({ name: 'rob' }, {}, (builder) => {
          builder.input('name', { class: 'user-input' });
        }),
      ).toBe(
        '<form action="#" method="post"><label for="name">Name</label><input name="name" type="text" value="rob" class="user-input"></form>',
      );
    });

    it('overrides a default attribute in place instead of duplicating it', () => {
      expect(
        HexletCode.formFor({ name: 'rob' }, {}, (builder) => {
          builder.input('name', { type: 'search' });
        }),
      ).toBe(
        '<form action="#" method="post"><label for="name">Name</label><input name="name" type="search" value="rob"></form>',
      );
    });

    it('rejects a value key at compile time, but overrides at runtime if forced through', () => {
      expect(
        HexletCode.formFor({ name: 'rob' }, {}, (builder) => {
          // @ts-expect-error value is unsettable; use the template instead
          builder.input('name', { value: 'override' });
        }),
      ).toBe(
        '<form action="#" method="post"><label for="name">Name</label><input name="name" type="text" value="override"></form>',
      );
    });

    it('renders multiple fields in declaration order, concatenated with no separator', () => {
      expect(
        HexletCode.formFor({ name: 'rob', job: 'hexlet' }, {}, (builder) => {
          builder.input('name');
          builder.input('job');
        }),
      ).toBe(
        '<form action="#" method="post">' +
          '<label for="name">Name</label><input name="name" type="text" value="rob">' +
          '<label for="job">Job</label><input name="job" type="text" value="hexlet">' +
          '</form>',
      );
    });

    it('throws eagerly when the field key is absent from the template', () => {
      expect(() =>
        HexletCode.formFor({ name: 'rob' }, {}, (builder) => {
          builder.input('age');
        }),
      ).toThrow(new Error("Field 'age' does not exist in the template."));
    });

    it('renders an empty string template value as value="" rather than throwing', () => {
      expect(
        HexletCode.formFor({ name: '' }, {}, (builder) => {
          builder.input('name');
        }),
      ).toBe(
        '<form action="#" method="post"><label for="name">Name</label><input name="name" type="text" value=""></form>',
      );
    });

    it('escapes <, > and & in the rendered value attribute', () => {
      expect(
        HexletCode.formFor({ name: '<script>&"x"</script>' }, {}, (builder) => {
          builder.input('name');
        }),
      ).toBe(
        '<form action="#" method="post"><label for="name">Name</label><input name="name" type="text" value="&lt;script&gt;&amp;&quot;x&quot;&lt;/script&gt;"></form>',
      );
    });
  });

  describe('textarea fields', () => {
    it('renders a label with for attribute before a textarea', () => {
      expect(
        HexletCode.formFor({ job: 'hexlet' }, {}, (builder) => {
          builder.input('job', { as: 'textarea' });
        }),
      ).toBe(
        '<form action="#" method="post"><label for="job">Job</label><textarea cols="20" rows="40" name="job">hexlet</textarea></form>',
      );
    });

    it('overrides rows and cols in place instead of appending them', () => {
      expect(
        HexletCode.formFor({ job: 'hexlet' }, {}, (builder) => {
          builder.input('job', { as: 'textarea', rows: 50, cols: 50 });
        }),
      ).toBe(
        '<form action="#" method="post"><label for="job">Job</label><textarea cols="50" rows="50" name="job">hexlet</textarea></form>',
      );
    });

    it('appends an extra attribute after the built-in defaults', () => {
      expect(
        HexletCode.formFor({ job: 'hexlet' }, {}, (builder) => {
          builder.input('job', { as: 'textarea', class: 'user-input' });
        }),
      ).toBe(
        '<form action="#" method="post"><label for="job">Job</label><textarea cols="20" rows="40" name="job" class="user-input">hexlet</textarea></form>',
      );
    });

    it('escapes <, > and & in the textarea body', () => {
      expect(
        HexletCode.formFor({ job: '</textarea><script>&' }, {}, (builder) => {
          builder.input('job', { as: 'textarea' });
        }),
      ).toBe(
        '<form action="#" method="post"><label for="job">Job</label><textarea cols="20" rows="40" name="job">&lt;/textarea&gt;&lt;script&gt;&amp;</textarea></form>',
      );
    });

    it('renders an empty string template value as an empty body', () => {
      expect(
        HexletCode.formFor({ job: '' }, {}, (builder) => {
          builder.input('job', { as: 'textarea' });
        }),
      ).toBe(
        '<form action="#" method="post"><label for="job">Job</label><textarea cols="20" rows="40" name="job"></textarea></form>',
      );
    });

    it('rejects an unsupported as value at compile time, but throws at runtime', () => {
      expect(() =>
        HexletCode.formFor({ job: 'hexlet' }, {}, (builder) => {
          builder.input(
            'job',
            // @ts-expect-error 'select' is outside the 'as' union; use 'textarea' instead
            { as: 'select' },
          );
        }),
      ).toThrow(new Error("Unsupported 'as' value: 'select'."));
    });

    it('rejects a value key at compile time, even duplicated as the body if forced through', () => {
      expect(
        HexletCode.formFor({ job: 'hexlet' }, {}, (builder) => {
          builder.input('job', {
            as: 'textarea',
            // @ts-expect-error value is unsettable; use the template instead
            value: 'x',
          });
        }),
      ).toBe(
        '<form action="#" method="post"><label for="job">Job</label><textarea cols="20" rows="40" name="job" value="x">hexlet</textarea></form>',
      );
    });
  });

  describe('submit', () => {
    it('defaults to a Save button when called with no arguments', () => {
      expect(
        HexletCode.formFor({}, {}, (builder) => {
          builder.submit();
        }),
      ).toBe('<form action="#" method="post"><input type="submit" value="Save"></form>');
    });

    it('renders the provided text instead of the default', () => {
      expect(
        HexletCode.formFor({}, {}, (builder) => {
          builder.submit('Wow');
        }),
      ).toBe('<form action="#" method="post"><input type="submit" value="Wow"></form>');
    });

    it('does not require or validate against a template key', () => {
      expect(() =>
        HexletCode.formFor({ name: 'rob' }, {}, (builder) => {
          builder.submit();
        }),
      ).not.toThrow();
    });

    it('composes with fields in declaration order, concatenated with no separator', () => {
      expect(
        HexletCode.formFor({ name: 'rob', job: 'hexlet' }, {}, (builder) => {
          builder.input('name');
          builder.input('job');
          builder.submit();
        }),
      ).toBe(
        '<form action="#" method="post">' +
          '<label for="name">Name</label><input name="name" type="text" value="rob">' +
          '<label for="job">Job</label><input name="job" type="text" value="hexlet">' +
          '<input type="submit" value="Save">' +
          '</form>',
      );
    });

    it('renders multiple submit controls in call order when called more than once', () => {
      expect(
        HexletCode.formFor({}, {}, (builder) => {
          builder.submit();
          builder.submit('Wow');
        }),
      ).toBe(
        '<form action="#" method="post">' +
          '<input type="submit" value="Save">' +
          '<input type="submit" value="Wow">' +
          '</form>',
      );
    });
  });

  describe('public entry point', () => {
    it('is the package default export from index.ts', () => {
      expect(HexletCodeDefault).toBe(HexletCode);
    });
  });
});
