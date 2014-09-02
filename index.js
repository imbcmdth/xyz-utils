// Utilities for conversion to and from CIEXYZ color space

var XYZtoRGB = [
	3.2405, -1.5371, -0.4985,
	-0.9693, 1.8760, 0.0416,
	0.0556, -0.2040, 1.0572
];

var RGBtoXYZ = [
	0.4124, 0.3576, 0.1805,
	0.2126, 0.7152, 0.0722,
	0.0193, 0.1192, 0.9505
];

function MatrixVectorMultiply (mat, vec) {
	var result = [];

	result[0] = mat[0] * vec[0] + mat[1] * vec[1] + mat[2] * vec[2];
	result[1] = mat[3] * vec[0] + mat[4] * vec[1] + mat[5] * vec[2];
	result[2] = mat[6] * vec[0] + mat[7] * vec[1] + mat[8] * vec[2];

	return result;
}

function toxyY (vec) {
	var result = [];

	var sum = vec[0] + vec[1] + vec[2];

	if (!sum) {
		return [1/3, 1/3, 0];
	}

	result[0] = vec[0] / sum;
	result[1] = vec[1] / sum;
	result[2] = vec[1];

	return result;
}

function fromxyY (vec) {
	var result = [];

	if (!vec[1]) {
		return [0, 0, 0];
	}

	result[0] = vec[0] * vec[2] / vec[1];
	result[1] = vec[2];
	result[2] = (1 - vec[0] - vec[1]) * vec[2] / vec[1];

	return result;
}

module.exports = XYZUtils = {
	toRGB: MatrixVectorMultiply.bind(null, XYZtoRGB),
	fromRGB: MatrixVectorMultiply.bind(null, RGBtoXYZ),
	toxyY: toxyY,
	fromxyY: fromxyY
};
