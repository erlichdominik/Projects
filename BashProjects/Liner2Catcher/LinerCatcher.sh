#!bin/bash

TEXT=""
TIME=5
IS_FILE=0
IS_TAGGER=1
SERVER_MODEL=""
FILE_NAME=""
print_usage() {
  printf "Usage: ..."
}

while getopts 't:s:f:l' flag; do
  case "${flag}" in
    t) TEXT="${OPTARG}" ;;
    s) TIME="${OPTARG}" ;;
    f) FILE_NAME="${OPTARG}" ;;
    l) IS_TAGGER=0 ;;
    *) print_usage
       exit 1 ;;
  esac
done

if [[ $IS_TAGGER == 1 ]]
then
  SERVER_MODEL='({\"guesser\":false, \"morfeusz2\":true})'
  else
  SERVER_MODEL='|liner2({\"model\":\"top9\"})'
fi

if [[ $FILE_NAME == "" ]]
then
    FIRST_REQUEST=$(curl -d'{"lpmn":"any2txt|wcrft2|liner2({\"model\":\"top9\"})","text":'"$TEXT"',"application":"ws.clarin-pl.eu","user":"demo"}' -H "Content-Type: application/json" -X POST http://ws.clarin-pl.eu/nlprest2/base/startTask/)
    else
    TEXT=`cat $FILE_NAME`
    FIRST_REQUEST=$(curl -d'{"lpmn":"any2txt|wcrft2|liner2({\"model\":\"top9\"})","text":'"$TEXT"',"application":"ws.clarin-pl.eu","user":"demo"}' -H "Content-Type: application/json" -X POST http://ws.clarin-pl.eu/nlprest2/base/startTask/)
fi

# echo $FIRST_REQUEST

FIRST_RESPONSE_URI='http://ws.clarin-pl.eu/nlprest2/base/getStatus/'

CONCAT_URI=$FIRST_RESPONSE_URI$FIRST_REQUEST

#echo 'waiting 5 seconds do download data...'
#echo "TIME:${TIME}"
sleep $TIME
FIRST_RESPONSE=`curl $CONCAT_URI`

DOWNLOAD_URI='http://ws.clarin-pl.eu/nlprest2/base/download'

FILE_ID=`echo $FIRST_RESPONSE | jq '.value[].fileID'`
LENGTH=${#FILE_ID}

MERGED_URI=`echo $DOWNLOAD_URI${FILE_ID:1: $LENGTH-2}`

DATA=`curl $MERGED_URI`

echo $DATA