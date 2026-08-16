# Form Builder

A library that renders HTML forms from a plain data object, absorbing the escaping, defaulting and markup boilerplate a consumer would otherwise write by hand. It is shipped as an NPM package (`@hexlet/code`) and consumed as a dependency of other packages; within this project it is only installed locally, never published to the registry.

## Public API

The package exports a default class whose `formFor` method returns the rendered form as a string:

```ts
import HexletCode from '@hexlet/code';

const template = { name: 'rob', job: 'hexlet', gender: 'm' };
const form = HexletCode.formFor(template, { method: 'post' }, (f) => {
  f.input('name');
  f.input('job', { as: 'textarea' });
  f.submit('Wow');
});

console.log(form);

// <form action="#" method="post">
//     <label for="name">Name</label>
//     <input name="name" type="text" value="rob">
//     <label for="job">Job</label>
//     <textarea cols="20" rows="40" name="job">hexlet</textarea>
//     <input type="submit" value="Wow">
// </form>
```

## Language

### Form layer

**Template**:
The plain object whose fields supply the values for a rendered form.
_Avoid_: model, entity, data, record

**`formFor`**:
The entry point that turns a template, a set of form attributes and a field-declaring callback into a form string.

**Form attributes**:
The form-layer map accepted by `formFor` alongside the template: the form's `url` plus any rendering-layer attributes to carry on the form tag itself.
_Avoid_: options, params, config, settings

**url**:
The address a form submits to. A form-layer concept: the rendering layer carries it as the form tag's `action` attribute, and its absence means `#`.
_Avoid_: endpoint, target, path

**Form builder**:
The object handed to the `formFor` callback, which declares fields against the
template and collects their rendered markup in declaration order.
_Avoid_: helper, collector, form context, `f`

**Field**:
One labelled control declared inside the `formFor` callback, bound to a template key.
_Avoid_: control, element, widget

**Field options**:
The field-layer map accepted by `input` after the field name: `as` plus any
rendering-layer attributes to carry on the field's tag. Mirrors Form attributes,
with `as` playing the role `url` plays there.
_Avoid_: options, params, config, settings

**as**:
Which control a field renders as, when not the default text input. A field-layer
concept: the rendering layer resolves it to a tag name, its default attributes and
whether the field's value is carried as an attribute or as the tag's body.
_Avoid_: type, kind, variant

**Label**:
An HTML label tag automatically generated for every field, rendered immediately before
the field's control tag. Its `for` attribute matches the field's name, and its text
content is the field name with only its first character capitalized (see
docs/adr/0003-auto-generated-labels.md for the generation rule). Uncustomizable and
mandatory for every field.
_Avoid_: field label, label text

### Rendering layer

**Tag**:
A single HTML element built from a name, an attribute map and a body, rendered by `toString()`.

**Void tag**:
A tag that HTML forbids from having a closing tag or body, such as `input` or `br`. Rendered as the opening tag alone.
_Avoid_: self-closing tag, empty tag

**Attributes**:
The map of attribute name to attribute value carried by a tag. `true` renders a bare attribute, `false` omits it, and `null`/`undefined` are rejected so that an absent attribute is always a deliberate choice.
_Avoid_: props, options, params

**Body**:
The inner HTML of a tag. Passed through unescaped so nested tag output composes; escaping untrusted text is the caller's job.
_Avoid_: content, children, inner text
