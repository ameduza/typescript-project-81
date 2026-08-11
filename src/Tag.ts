const VOID_TAGS: ReadonlySet<string> = new Set([
  'area',
  'base',
  'br',
  'col',
  'embed',
  'hr',
  'img',
  'input',
  'link',
  'meta',
  'param',
  'source',
  'track',
  'wbr',
]);

export class Tag {
  private readonly name: string;
  private readonly attributes: Record<string, string>;
  private readonly body: string;

  constructor(
    name: string,
    attributes: Record<string, string> = {},
    body = '',
  ) {
    this.name = name;
    this.attributes = attributes;
    this.body = body;
  }

  private buildAttributes(): string {
    return Object.entries(this.attributes)
      .map(([key, value]) => ` ${key}="${value}"`)
      .join('');
  }

  toString(): string {
    const opening = `<${this.name}${this.buildAttributes()}>`;

    if (VOID_TAGS.has(this.name)) {
      return opening;
    }

    return `${opening}${this.body}</${this.name}>`;
  }
}

export default Tag;
