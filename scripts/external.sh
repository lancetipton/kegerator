#!/bin/bash 

# Prints a message to the terminal through stderr
keg_message(){
  echo "[ KEG CLI ] $@" >&2
  return
}

# Ensure the local bash settings get loaded for the machine
keg_source_bash(){

  # Check if the bashfile exists
  local BASHRC_FILE

  # Check for .bash file
  local PROFILE=~/.bash_profile
  local BRC=~/.bashrc
  if [[ -f "$PROFILE" ]]; then
    BASH_FILE="$PROFILE"
  elif [[ -f "$BRC" ]]; then
    BASH_FILE="$BRC"
  fi

  # If there's no bash file, then we know keg-cli's not installed
  # So log an error and exit!
  if [[ -z "$BASH_FILE" ]]; then
    keg_message "Could not load bash profile. Could not find \"~/.bash_profile\" || \"~/.bashrc\""
    exit 1
  else
    # Source the bash file so we have access to the keg-cli
    source $BASH_FILE
  fi

}

# Runs a keg task based on the passed in arguments
keg_run_task(){
  if [[ "$1" == "keg" ]]; then
    keg "${@:2}"
  else
    keg "$@"
  fi
}

# Add the bash settings for the environment
keg_source_bash

# Set the ENV so the CLI knows its an external execution
# This means there's no tty, so we should not ask for user input
export KEG_EXTERNAL_EXEC=true

# Run the keg task
keg_run_task "$@"
