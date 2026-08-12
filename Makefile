install:
	npm ci

build:
	npm run build

test:
	npm run test

test-coverage:
	npm run test:coverage

lint:
	npm run lint

format:
	npm run format

typecheck:
	npm run typecheck

check: lint typecheck test build
