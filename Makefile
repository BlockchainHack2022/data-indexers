
build: aqua
	@npx tsc


aqua:
	@npx aqua -i ./aqua/ -o ./src/aqua


watch-aqua:
	npx chockidar "aqua/**/*.aqua" -c "make aqua"


.PHONY: build aqua watch-aqua
