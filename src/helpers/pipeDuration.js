export const pipeDuration = (minutes) => {
	const hour = Number.parseInt(minutes / 60);
	const minute = minutes % 60;
	const hh = hour < 10 ? `0${hour}` : `${hour}`;
	const mm = minute < 10 ? `0${minute}` : `${minute}`;
	return minutes > 0 ? `${hh}:${mm}` : `00:00`;
};
