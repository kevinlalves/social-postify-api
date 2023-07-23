.PHONY: install-dependencies build-database boot-startup

boot-startup: install-dependencies build-database
	npm run start:dev

build-database:
	npm run migration

install-dependencies:
	npm install
