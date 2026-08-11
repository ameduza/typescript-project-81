import { describe, it, expect } from 'vitest';
import { Tag } from '../src/Tag';

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
  });
});
