#!/usr/bin/env

export KEG_ROOT_DIR=/keg
export KEG_NO_MACHINE=true
export KEG_NON_INTERACTIVE=true
export KEG_GLOBAL_CONFIG="$(node /keg/tap/scripts/kegConfig.js)"
. /keg/keg-cli/keg

keg_run_task(){
  if [[ "$1" == "keg" ]]; then
    keg "${@:2}"
  else
    keg "$@"
  fi
}

keg_run_task $@

