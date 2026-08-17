# Labels are auto-generated from field names with first-character-only capitalization

Every field declared through `FormBuilder.input()` automatically emits a `<label>` tag
immediately before its own tag. The label's `for` attribute is the field's raw name
(e.g. `first_name`), and the label's text content capitalizes only the first character
(e.g. `first_name` → `First_name`), leaving the rest of the string untouched.

There is no opt-out and no way to override the label text independently of `name`.

## Rationale

Field names are developer-controlled identifiers (the same trust level as a tag name, per
docs/adr/0002-form-layer-escapes-template-values.md), so label text is never escaped.
Using only first-character capitalization is a simple, predictable rule that works
across field naming conventions without special-casing snake_case, camelCase, or other
patterns. It captures the minimal transformation needed to turn an identifier into
readable text while honoring the developer's choice of naming style.

## Consequences

Labels are mandatory for every field. A caller cannot render a field without its label,
and cannot customize the label text without changing the field name — the label is
tightly coupled to the field it precedes, always in the same declaration order.
