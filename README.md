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
