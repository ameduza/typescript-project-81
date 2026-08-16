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
