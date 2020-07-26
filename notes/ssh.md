### Use SSH to run commands on host machine
* Turn on remote login on Macs
  * `sudo systemsetup -f -setremotelogin on`
  * `sudo systemsetup -setremotelogin on`
  * `sudo systemsetup -setremotelogin off`
* Execute the keg-cli task command over ssh
  * `ssh -i /root/.kegConfig/keg-ssh -o StrictHostKeyChecking=no lancetipton@192.168.0.4 /bin/bash ./keg/keg-cli/external.sh <keg-cli task to run>`
  * Requires
    * Private keg-ssh key in ~/.kegConfig folder
    * Public keg-ssh key must be in the ~/.ssh/authorized_keys of the host machine
    * Must know the host machine ip and user to run the task as


