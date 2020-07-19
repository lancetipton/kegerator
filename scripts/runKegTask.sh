#!/usr/bin/env

source ./node_modules/keg-cli/keg

keg_run_task(){
  if [[ "$1" == "keg" ]]; then
    keg "${@:2}"
  else
    keg "$@"
  fi
}

keg_run_task $@

