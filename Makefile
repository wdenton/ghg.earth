publish:
	rsync --archive --verbose --compress --exclude=mauna-loa-latest.json . pair:~/web/ghg.earth/
	notify-send "GHG.EARTH is live"
