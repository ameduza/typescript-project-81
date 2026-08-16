# Form attributes are a pass-through map, with `url` as the sole translated key

Form attributes are a pass-through map, not a closed set of known keys.
This lets `Tag`'s open `Attributes` genericity flow through without re-implementing
attribute validation or requiring code changes for each new HTML attribute
(e.g. `class`, `data-*`).
`url` is the one exception because it maps the form-layer concept "where this form submits"
to the rendering-layer's `action`.
An explicit `action` key in Form attributes is a type error
(via `Omit<Attributes, 'action'>` and `action?: never`) —
there is exactly one way to set the form's submit address,
and a TypeScript caller can never end up with `url` and `action` disagreeing at runtime.
