.PHONY: install-dependencies build-database boot-startup

boot-startup: install-dependencies build-database
	npm run start:dev

build-database:
	npm run test:generate:migration
	npm run test:generate:client
	npm run dev:generate:migration
	npm run dev:generate:client

install-dependencies:
	npm install
