### Hexlet tests and linter status:

[![Actions Status](https://github.com/ameduza/typescript-project-81/actions/workflows/hexlet-check.yml/badge.svg)](https://github.com/ameduza/typescript-project-81/actions)

### Quality Gate

[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=ameduza_typescript-project-81&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=ameduza_typescript-project-81)
[![Coverage](https://sonarcloud.io/api/project_badges/measure?project=ameduza_typescript-project-81&metric=coverage)](https://sonarcloud.io/summary/new_code?id=ameduza_typescript-project-81)

### Test Coverage

[![Test Coverage](https://sonarcloud.io/api/project_badges/measure?project=ameduza_typescript-project-81&metric=coverage)](https://sonarcloud.io/summary/new_code?id=ameduza_typescript-project-81)

Code quality is analyzed by [SonarQube Cloud](https://sonarcloud.io) on every push to `main` and every pull request.

**Coverage Setup:**

- Test coverage is generated using [Vitest](https://vitest.dev/) with v8 provider
- Coverage reports are uploaded to SonarQube Cloud with every CI run
- Configuration: `sonar-project.properties` and `.github/workflows/ci.yml`
- Local coverage report: Run `npm run test:coverage` to generate coverage locally
- Repository requires a `SONAR_TOKEN` secret for SonarQube integration

## Usage

```ts
import HexletCode from '@hexlet/code';

const template = { name: 'rob', job: 'hexlet' };
const form = HexletCode.formFor(template, { url: '/users' }, (f) => {
  f.input('name');
  f.input('job', { as: 'textarea' });
});

console.log(form);

// <form action="/users" method="post">
// <input name="name" type="text" value="rob">
// <textarea cols="20" rows="40" name="job">hexlet</textarea>
// </form>
```

`f.input(name)` renders a text input bound to `template[name]`. Passing
`{ as: 'textarea' }` renders a `<textarea>` instead, carrying the value as
the tag's escaped body with `cols="20" rows="40"` defaults; any extra
attribute (e.g. `rows: 50`) overrides a default in place.

## Spec-Driven Development Workflow

This project follows a **Spec-Driven Development** approach using GitHub issues and agent skills:

| Step | Command                        | Purpose                                                                     |
| ---- | ------------------------------ | --------------------------------------------------------------------------- |
| 1    | Create Issue                   | Write a GitHub issue describing the task or feature                         |
| 2    | `/triage` #issue               | Analyze and provide a brief analysis                                        |
| 3    | `/grilling` #issue             | Grill the user relentlessly about a plan, decision, or idea.                |
| 4    | `/to-spec` #issue              | Turn the current conversation into a spec and publish it                    |
| 5    | `/to-tickets` #issue           | Slice the spec into required sub-tasks (creates child issues)               |
| 6    | `/implement` #issue            | Agent Implement a piece of work based on a spec or set of tickets.          |
| 7    | `/code-review` #issue/#pr/etc. | Review the changes since a fixed point (commit, branch, tag, or merge-base) |

**Supporting artifacts:**

- `CONTEXT.md` – Domain vocabulary and layer definitions
- `CLAUDE.md` – Agent instructions and available skills
- `docs/adr/` – Architectural decisions
- `.agents/skills/` – Custom agent skills for this repo
