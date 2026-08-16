import { describe, it, expect, vi } from 'vitest';
import { HexletCode } from '../src/form/HexletCode.js';
import HexletCodeDefault from '../index.js';

describe('HexletCode', () => {
  describe('formFor', () => {
    it('renders a bare form tag using its built-in defaults', () => {
      expect(HexletCode.formFor({}, {}, () => {})).toBe(
        '<form action="#" method="post"></form>',
      );
    });

    it('never invokes the callback', () => {
      const callback = vi.fn();

      HexletCode.formFor({}, {}, callback);

      expect(callback).not.toHaveBeenCalled();
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

  describe('public entry point', () => {
    it('is the package default export from index.ts', () => {
      expect(HexletCodeDefault).toBe(HexletCode);
    });
  });
});
