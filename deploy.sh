cd ~/projects/staysolitude/
. ~/devtools/node10.sh
grunt build
scp -r ~/projects/staysolitude/dist/* debian@192.168.7.2:/var/lib/cloud9/staysolitude