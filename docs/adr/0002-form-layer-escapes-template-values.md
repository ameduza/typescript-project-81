# The form layer escapes template values; the tag layer never does

`Tag` passes its body through unescaped so that nested tag output composes, and
declares escaping to be the caller's job. Template values are untrusted data, and
some of them reach a tag body rather than an attribute — a textarea's value is the
tag's body, so a template value of `</textarea><script>` would otherwise break out
of the control.

We resolve this at the layer boundary rather than per field: the form layer escapes
every template value it renders, and the tag layer keeps escaping attribute values
only. `Tag`'s body stays composable, and there is exactly one place that knows
template data is untrusted.

## Consequences

The rule is stated over template values, not over the textarea body specifically, so
it already covers controls added later that render template data as body text. A
text-escaping helper lives beside the existing attribute escaper in the tag layer,
but the form layer decides when to call it.

Deciding when to call it includes deciding _not_ to. The two halves of the rule meet
at a value's destination: a template value bound to an attribute is escaped by the
tag layer on render, and the form layer passes it through raw. Escaping it in the
form layer as well would double-escape it — `<` becomes `&amp;lt;`, which renders as
the literal text `&lt;`. So the form layer calls the text helper only for template
values that land in a tag's body, where the tag layer escapes nothing. That is the
case the helper exists for, and it arrives with the first control that has one.
