
build: aqua
	@npx tsc


aqua:
	@rm -rf src/aqua && npx aqua -i ./aqua/ -o ./src/aqua


watch-aqua:
	npx chockidar "aqua/**/*.aqua" -c "make aqua"


.PHONY: build aqua watch-aqua
