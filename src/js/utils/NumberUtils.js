class NumberUtils {
	
	constructor() {
		throw new Error("NumberUils should not be instantiate");
	}
	
	static random(pMaxValue) {
		return Math.floor((Math.random() * pMaxValue) + 1);
	}
	
	
}
