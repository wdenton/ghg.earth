publish:
	rsync --archive --verbose --compress --exclude=mauna-loa-co₂-latest.json . pair:~/web/ghg.earth/
	notify-send "GHG.EARTH is live"
