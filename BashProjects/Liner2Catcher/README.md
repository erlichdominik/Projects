# Liner2Catcher
Simple shell script to process text from Polish NLP library to CCL file

## Preparation

```bash
xargs brew install < INSTALL.txt
```
OR
```bash
brew install jq
```
## Usage/Examples
```sh
bash LinerCatcher.sh -t "ala ma kota" > name_of_the_file.txt
```
```sh
bash LinerCatcher.sh -t "ala ma kota" -s 10 > name_of_the_file.txt
```
```sh
bash LinerCatcher.sh -f file_name.txt -s 10 > name_of_the_file.txt
```
### Flags
* -t [Text to process]
* -s [Number of seconds to wait for server to respond]
* -f [Text file to process]
# Warning

* Liner2Catcher is using simple sleep function inside, without -s flag it's waiting 5 seconds for server to respond, if it's not enough we can use -s flag to specify waiting time by ourself
* Don't use flag -t and -f in the same command!
# Flag usage

bash LinerCatcher.sh -t [text_to_process] -s [number_of_seconds_to wait] > [name_of_the_file].txt

