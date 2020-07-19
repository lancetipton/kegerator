#!/bin/bash

ZR_CLI_PATH=~/zerista/zr-cli/zr-cli.sh
ZR_HAS_CLI="false"

# Prints a message to stderr to not override the echo return
  # Params
  #   * $1 - message to print
zr_message(){
  echo $"[ ZR-CLI ] $1" >&2
  return
}

# Runs a zr-build command
#   Params
#     * $1 - zbi || zba ( IOS or Android build command )
#     * $2 - $@ - ( any )
zr_build_command(){

  source ~/.bash_profile
  zr_message "Running Build command..."

  if [[ "$1" == "zbi" ]]; then
    zbi "${@:2}"

  else
    zba "${@:2}"

  fi

}

# Runs a zr-cli command
#   Params
#     * $1 - zr
#     * $2 - $@ - ( any )
zr_cli_command(){
  if [[ ! -f "$ZR_CLI_PATH" ]]; then
    ZR_CLI_PATH=/zerista/zr-cli/zr-cli.sh

    if [[ ! -f "$ZR_CLI_PATH" ]]; then
      echo "[ ZR-ERROR ] Zerista CLI is not installed. Please install the CLI to run commands!" >&2
    else
      ZR_HAS_CLI="true"
    fi
  else
    ZR_HAS_CLI="true"
  fi

  if [[ "$ZR_HAS_CLI" == "true" ]]; then
    source $ZR_CLI_PATH
    zr_message "Running cli command..."
    zr "${@:2}"

  fi
}

# Initializes a zr-cli or zr-build command
zr_command_init(){

  if [[ "$1" == "zr" ]]; then
    zr_cli_command "$@"

  elif [[ "$1" == "zba" || "$1" == "zbi" ]]; then
    zr_build_command "$@"

  else
    echo "[ ZR-ERROR ] Unknownw command $1" >&2

  fi

}

zr_command_init "$@"

