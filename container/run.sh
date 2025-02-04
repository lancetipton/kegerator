#!/usr/bin/env

TAP_PATH=/keg/tap
CLI_PATH=/keg/keg-cli
CORE_PATH=/keg/tap/node_modules/keg-core

keg_message(){
  echo $"[ KEG-CLI ] $1" >&2
  return
}


# Overwrite the default cli, core, tap paths with passed in ENVs
keg_set_container_paths(){

  if [[ "$DOC_CLI_PATH" ]]; then
    CLI_PATH="$DOC_CLI_PATH"
  fi

  if [[ "$DOC_CORE_PATH" ]]; then
    CORE_PATH="$DOC_CORE_PATH"
  fi

  if [[ "$DOC_APP_PATH" ]]; then
    TAP_PATH="$DOC_APP_PATH"
  fi

}

keg_add_git_key(){
  git config --global url.https://$GIT_KEY@github.com/.insteadOf https://github.com/
  echo "@simpleviewinc:registry=https://npm.pkg.github.com/" > .npmrc
  echo "//npm.pkg.github.com/:_authToken=${GIT_KEY}" >> .npmrc
}

keg_remove_git_key(){
  git config --global url.https://github.com/.insteadOf url.https://$GIT_KEY@github.com/
  rm -rf .npmrc
  unset GIT_KEY
}

# Runs yarn install at run time
# Use when adding extra node_modules to keg-core without rebuilding
keg_run_tap_yarn_setup(){

  # Check if $KEG_NM_INSTALL exist, if it doesn't, then return
  if [[ -z "$KEG_NM_INSTALL" ]]; then
    return
  fi

  if [[ "$KEG_NM_INSTALL" ]]; then
    # Navigate to the tap directory, and run the yarn install here
    cd $TAP_PATH
    keg_add_git_key
    keg_message "Running yarn setup for tap..."
    yarn setup
    keg_remove_git_key
  fi

}

keg_setup_cli_config(){

  export KEG_ROOT_DIR=/keg
  export KEG_NO_MACHINE=true
  export KEG_NON_INTERACTIVE=true
  export KEG_GLOBAL_CONFIG="$(node $TAP_PATH/scripts/kegConfig.js)"

}

# Runs a Tap
keg_run_the_tap(){

  if [[ "$1" == "skip" ]]; then
    return
  fi

  cd $TAP_PATH

  if [[ -z "$KEG_EXEC_CMD" ]]; then
    KEG_EXEC_CMD="dev"
  fi

  keg_message "Running command 'yarn $KEG_EXEC_CMD'"
  yarn $KEG_EXEC_CMD

}

# Checks for path overrides of the core, tap paths with passed in ENVs
keg_set_container_paths

# Run yarn setup for any extra node_modules to be installed
keg_run_tap_yarn_setup

# Build the cli config for docker
keg_setup_cli_config

# Start the keg core instance
keg_run_the_tap "$@"
