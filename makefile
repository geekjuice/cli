MAKEFLAGS = -j1

INDEX = "index.js"
ESLINT_FILES = "**/*.js"
PRETTIER_FILES = "**/*.{md,css,js,json}"

DONE = echo [package] ✓ $@ done

.PHONY: default \
	clean \
	wipe \
	install \
	lint \
	format \
	test \
	debug \
	start

default:
	echo "Please enter a command..."
	$(DONE)

$(verbose).SILENT:

clean:
	rm -rf npm-debug.log
	$(DONE)

wipe: clean
	rm -rf node_modules
	$(DONE)

install: wipe
	npm install
	$(DONE)

lint:
	npm run eslint -- $(ESLINT_FILES)
	$(DONE)

format:
	npm run prettier -- --write $(PRETTIER_FILES)
	$(DONE)

test:
	npm run jest
	$(DONE)

debug:
	npm run ndb -- $(INDEX)
	$(DONE)

start:
	node $(INDEX)
	$(DONE)
