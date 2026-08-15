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

**Field**:
One labelled control declared inside the `formFor` callback, bound to a template key.
_Avoid_: control, element, widget

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
