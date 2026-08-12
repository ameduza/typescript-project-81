import { describe, it, expect } from 'vitest';
import { Tag } from '../src/Tag.js';
import { Tag as ExportedTag } from '../index.js';

describe('Tag', () => {
  describe('void tags', () => {
    it('renders a bare void tag', () => {
      expect(new Tag('br').toString()).toBe('<br>');
    });

    it('renders a void tag with a single attribute', () => {
      expect(new Tag('img', { src: 'path/to/image' }).toString()).toBe(
        '<img src="path/to/image">',
      );
    });

    it('renders a void tag with multiple attributes in order', () => {
      expect(
        new Tag('input', { type: 'submit', value: 'Save' }).toString(),
      ).toBe('<input type="submit" value="Save">');
    });

    it('matches void tag names case-insensitively', () => {
      expect(new Tag('BR').toString()).toBe('<BR>');
      expect(new Tag('Img', { src: 'a' }).toString()).toBe('<Img src="a">');
    });
  });

  describe('paired tags', () => {
    it('renders an empty paired tag', () => {
      expect(new Tag('div').toString()).toBe('<div></div>');
    });

    it('renders a paired tag with a body', () => {
      expect(new Tag('label', {}, 'Email').toString()).toBe(
        '<label>Email</label>',
      );
    });

    it('renders a paired tag with attributes and a body', () => {
      expect(new Tag('label', { for: 'email' }, 'Email').toString()).toBe(
        '<label for="email">Email</label>',
      );
    });

    it('treats an unknown tag name as paired', () => {
      expect(new Tag('my-widget', {}, 'x').toString()).toBe(
        '<my-widget>x</my-widget>',
      );
    });
  });

  describe('attribute escaping', () => {
    it('escapes double quotes so values cannot break out', () => {
      expect(
        new Tag('a', { href: 'x" onclick="alert(1)' }, 'hi').toString(),
      ).toBe('<a href="x&quot; onclick=&quot;alert(1)">hi</a>');
    });

    it('escapes ampersands', () => {
      expect(new Tag('a', { href: '/s?a=1&b=2' }).toString()).toBe(
        '<a href="/s?a=1&amp;b=2"></a>',
      );
    });

    it('escapes angle brackets', () => {
      expect(new Tag('div', { title: '<script>' }).toString()).toBe(
        '<div title="&lt;script&gt;"></div>',
      );
    });

    it('does not double-escape ampersands', () => {
      expect(new Tag('div', { title: '&' }).toString()).toBe(
        '<div title="&amp;"></div>',
      );
    });

    it('leaves the body raw so nested tags can be composed', () => {
      const inner = new Tag('span', {}, 'hi').toString();
      expect(new Tag('div', {}, inner).toString()).toBe(
        '<div><span>hi</span></div>',
      );
    });
  });

  describe('attribute values', () => {
    it('renders true as a bare boolean attribute', () => {
      expect(
        new Tag('input', { type: 'text', disabled: true }).toString(),
      ).toBe('<input type="text" disabled>');
    });

    it('omits attributes whose value is false', () => {
      expect(
        new Tag('input', { type: 'text', disabled: false }).toString(),
      ).toBe('<input type="text">');
    });

    it('stringifies numbers', () => {
      expect(new Tag('input', { maxlength: 10 }).toString()).toBe(
        '<input maxlength="10">',
      );
    });

    it('keeps an empty string value as an empty attribute', () => {
      expect(new Tag('input', { value: '' }).toString()).toBe(
        '<input value="">',
      );
    });
  });

  describe('edge cases', () => {
    it('produces no stray space for an empty attributes object', () => {
      expect(new Tag('div', {}).toString()).toBe('<div></div>');
    });

    it('renders a paired tag with attributes but no body', () => {
      expect(new Tag('div', { class: 'box' }).toString()).toBe(
        '<div class="box"></div>',
      );
    });

    it('ignores the body for a void tag', () => {
      expect(new Tag('br', {}, 'ignored').toString()).toBe('<br>');
    });

    it('coerces to its markup when converted to a string', () => {
      expect(String(new Tag('br'))).toBe('<br>');
    });
  });

  describe('public entry point', () => {
    it('re-exports Tag from the package barrel', () => {
      expect(new ExportedTag('br').toString()).toBe('<br>');
      expect(ExportedTag).toBe(Tag);
    });
  });
});
