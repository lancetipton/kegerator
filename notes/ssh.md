### Use SSH to run commands on host machine
* ssh lancetipton@192.168.0.4
* `sudo systemsetup -f -setremotelogin on`
* `sudo systemsetup -setremotelogin on`
* `sudo systemsetup -setremotelogin off`
* `cat ~/.ssh/id_rsa.pub | ssh lancetipton@192.168.0.4 "cat >> ~/.ssh/authorized_keys"`
