export const dateGenerator = (d) => {
	const date = new Date(d).getDate().toString();
	const month = (new Date(d).getMonth() + 1).toString();
	const year = new Date(d).getFullYear().toString();
	return `${date}.${month}.${year}`;
};
