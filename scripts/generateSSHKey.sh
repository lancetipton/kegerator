#!/bin/bash 

# Setup the paths for creating the ssh key
cd ~/
KEG_HOME=$(pwd)
KEG_KEY=keg-ssh
KEG_KEY_PATH=$KEG_HOME/.kegConfig/$KEG_KEY

# Create the key
# ssh-keygen -b 2048 -t rsa -f /tmp/keg-ssh -q -N ""
ssh-keygen -b 2048 -t rsa -f /tmp/$KEG_KEY -q -N ""

# Move the key into the .kegConfig directory
# mv /tmp/keg-ssh /Users/lancetipton/.kegConfig/keg-ssh
mv /tmp/$KEG_KEY $KEG_KEY_PATH
mv /tmp/$KEG_KEY.pub $KEG_KEY_PATH.pub

# Update the keys permissions
# chmod 400 /Users/lancetipton/.kegConfig/keg-ssh
chmod 400 $KEG_KEY_PATH

# Add the public key to the authorized_keys file
# echo "$(cat /Users/lancetipton/.kegConfig/keg-ssh.pub)" >> /Users/lancetipton/.ssh/authorized_keys
echo "$(cat $KEG_KEY_PATH.pub)" >> $KEG_HOME/.ssh/authorized_keys

# If mac turn on remote login
sudo systemsetup -setremotelogin on