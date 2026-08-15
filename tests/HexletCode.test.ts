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
  });

  describe('public entry point', () => {
    it('is the package default export from index.ts', () => {
      expect(HexletCodeDefault).toBe(HexletCode);
    });
  });
});
