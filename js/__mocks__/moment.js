const moment = date => {
	return {
		format: format => `Formatted date: ${format} - ${date}`,
	};
};

export default moment;
