# Form attributes are a pass-through map, with `url` as the sole translated key

`formFor`'s second parameter (Form attributes) needed a shape: either a closed
set of known keys (`url`, `method`, ...) that `formFor` understands and
validates, or an open pass-through map where only `url` is special-cased —
translated into the rendered `action` attribute — and every other key lands
on the `<form>` tag unchanged.

We chose pass-through. `Tag` is already built on an open `Attributes` map
(`Record<string, AttributeValue>`), so a closed set would mean re-implementing
attribute-by-attribute what `Tag` already does generically, and would require
a code change every time a caller wants a new HTML attribute (e.g. `class`,
`data-*`) on the form tag. `url` is the one exception because it names a
form-layer concept ("where this form submits") that doesn't correspond
1:1 to the rendering-layer `action` attribute name.

Because `action` is now reachable through the pass-through map, an explicit
`action` key in Form attributes is a type error — the form attributes type is
`{ url?: string } & Omit<Attributes, 'action'>`. There is exactly one way to
set the form's submit address (`url`), and a caller can never end up with
`url` and `action` disagreeing at runtime.
