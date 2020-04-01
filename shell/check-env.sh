#!/bin/bash

NODE_VERSION="v8.9.4"
NPM_VERSION="5.6.0"

# ref: https://stackoverflow.com/a/46331700/7387209
echo_color() {
  echo "$@" | sed \
    -e "s/\(\(@\(red\|green\|yellow\|blue\|magenta\|cyan\|white\|reset\|b\|u\)\)\+\)[[]\{2\}\(.*\)[]]\{2\}/\1\4@reset/g" \
    -e "s/@red/$(tput setaf 1)/g" \
    -e "s/@green/$(tput setaf 2)/g" \
    -e "s/@yellow/$(tput setaf 3)/g" \
    -e "s/@blue/$(tput setaf 4)/g" \
    -e "s/@magenta/$(tput setaf 5)/g" \
    -e "s/@cyan/$(tput setaf 6)/g" \
    -e "s/@white/$(tput setaf 7)/g" \
    -e "s/@reset/$(tput sgr0)/g" \
    -e "s/@b/$(tput bold)/g" \
    -e "s/@u/$(tput sgr 0 1)/g"
}

check_version() {
  echo "检测 $1 ..."
  if which $1 > /dev/null
  then
    user_version=$($1 --version)
    echo "[版本]：$user_version"
    if [[ -n $2 ]]
    then
      if [ $user_version != $2 ]
      then
        echo "[状态]：错误，要求的版本是$2"
        return 0
      else
        echo "[状态]：正确"
        return 1
      fi
    else
      echo "[状态]：正确"
      return 1
    fi
  else
    echo "[状态]：错误，$1没有安装"
    return 0
  fi
}

status_count=0

check_version node $NODE_VERSION
status_count=`expr $status_count + $?`

check_version npm $NPM_VERSION
status_count=`expr $status_count + $?`

echo
if [ $status_count -ne 2 ]
then
  echo "[结果]：错误，环境不符合要求"
  exit 1
else
  echo "[结果]：正确，环境符合要求"
fi
