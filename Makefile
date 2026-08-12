install:
	npm ci

build:
	npm run build

test:
	npm run test

lint:
	npm run lint

format:
	npm run format

typecheck:
	npm run typecheck

check: lint typecheck test build
