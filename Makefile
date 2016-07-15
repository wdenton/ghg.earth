publish:
	rsync --archive --verbose --compress . pair:~/web/ghg.earth/
	notify-send "GHG.EARTH is live"
