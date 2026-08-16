# Form layer automatically generates labels with unconditional, first-letter-only capitalization, and no escaping

Every field declared through `FormBuilder.input()` automatically renders a `<label>` immediately before its control. The label's `for` attribute is the raw field name (developer-controlled, like a tag name — not escaped), and the label's text content is the field name with only its first character uppercased, the rest left untouched.

Consequently, a field named `first_name` renders as:

```html
<label for="first_name">First_name</label>
```

Not as `First Name` (no word-splitting or multi-word title-casing). No escaping is applied to the label text (field names are developer-controlled identifiers, same trust level as tag names, per 0002-form-layer-escapes-template-values.md, which scopes escaping to template _values_ only). There is no opt-out and no way to override the label text independently of `name`.

## Consequences

The automatic label saves repetition and ensures labels are never accidentally omitted, since every control brings its label with it. The unconditional capitalization is simple, predictable, and avoids the complexity of language-specific title-casing rules. The same simplicity carries to the lack of escaping: field names are identifiers defined in the developer's code, not template data, so they carry the same safety guarantees as tag and attribute names.

The design trades flexibility for simplicity: developers cannot customize label text independently, nor can they suppress the label. If finer control becomes necessary, it could be added later as a new rendering layer abstraction (separate from `input()`, which has already committed to the unconditional label).
