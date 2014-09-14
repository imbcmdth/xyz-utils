// Utilities for conversion to and from CIEXYZ color space

// TODO: Allow a user specified white point
var XYZtoRGB = [
	3.2405, -1.5371, -0.4985,
	-0.9693, 1.8760, 0.0416,
	0.0556, -0.2040, 1.0572
];

// TODO: Allow a user specified white point
var RGBtoXYZ = [
	0.4124, 0.3576, 0.1805,
	0.2126, 0.7152, 0.0722,
	0.0193, 0.1192, 0.9505
];

// Constants for XYZ to Luv and back
var LUV_k = 24389 / 27;
var LUV_e = 216 / 24389;
var LUV_ke = LUV_k * LUV_e;
var oneThird = 1 / 3;

// 2 degree
var D65 = [95.047, 100, 108.883];

// 10 degree
//var D65 = [94.811, 100, 107.304];

var D65u = uEquation(D65);
var D65v = vEquation(D65);

function uEquation(vec) {
	return (4 * vec[0]) / (vec[0] + 15 * vec[1] + 3 * vec[2]);
}

function vEquation(vec) {
	return (9 * vec[1]) / (vec[0] + 15 * vec[1] + 3 * vec[2]);
}

function MatrixVectorMultiply (mat, vec, result) {
	result = result || [];

	result[0] = mat[0] * vec[0] + mat[1] * vec[1] + mat[2] * vec[2];
	result[1] = mat[3] * vec[0] + mat[4] * vec[1] + mat[5] * vec[2];
	result[2] = mat[6] * vec[0] + mat[7] * vec[1] + mat[8] * vec[2];

	return result;
}

function toxyY (vec, result) {
	result = result || [];

	var sum = vec[0] + vec[1] + vec[2];

	if (!sum) {
		result[0] = result[1] = 1 / 3;
		result[2] = 0;
		return result;
	}

	result[0] = vec[0] / sum;
	result[1] = vec[1] / sum;
	result[2] = vec[1];

	return result;
}

function fromxyY (vec, result) {
	result = result || [];

	if (vec[2] === 0) {
		result[0] = result[1] = result[2] = 0;
		return result;
	}

	result[0] = vec[0] * vec[2] / vec[1];
	result[1] = vec[2];
	result[2] = (1 - vec[0] - vec[1]) * vec[2] / vec[1];

	return result;
}

function toLuv (vec, result) {
	result = result || [];

	var yT = vec[1] / D65[1];
	var uT = uEquation(vec);
	var vT = vEquation(vec);

	var L;

	if (yT <= LUV_e) {
		L = LUV_k * yT;
	} else {
		L = 116 * Math.pow(yT, oneThird) - 16;
	}

	if (L === 0) {
		result[0] = 0;
		result[1] = 0;
		result[2] = 0;
	} else {
		result[0] = L;
		result[1] = 13 * L * (uT - D65u);
		result[2] = 13 * L * (vT - D65v);
	}
	return result;
}
/*
function fromLuv (vec, result) {
	result = result || [];

	var L = vec[0];
	var u = vec[1];
	var v = vec[2];

	if (L === 0) {
		result[0] = result[1] = result[2] = 0;
		return result;
	}

	var Y = D65[1] / 100 * Math.pow((L + 16) / 116, 3);

	var a = u / (13 * L) + D65u;
	var b = v / (13 * L) + D65v;
	var c = 3 * Y * (5 * b - 3);

	result[1] = Y;
	var Z = result[2] = ((a - 4) * c - 15 * a * b * Y) / (12 * b);
	result[0] = -(c / b + 3 * Z);

	return result;
}
*/
function fromLuv (vec, result) {
	result = result || [];

	var L = vec[0];
	var u = vec[1];
	var v = vec[2];

	if (L === 0) {
		result[0] = result[1] = result[2] = 0;
		return result;
	}

	var Y;

	if (L <= LUV_ke) {
		Y = L / LUV_k;
	} else {
		Y = Math.pow((L + 16) / 116, 3);
	}
	Y *= D65[1];
	var a = oneThird * (52 * L / (u + 13 * L * D65u) - 1);
	var b = -5*Y;
	var c = oneThird;
	var d = Y * (39* L / (v + 13 * L * D65v) - 5);

	result[1] = Y;
	var X = result[0] = (d - b) / (a - c);
	result[2] = X * a + b;

	return result;
}

module.exports = XYZUtils = {
	toRGB: MatrixVectorMultiply.bind(null, XYZtoRGB),
	fromRGB: MatrixVectorMultiply.bind(null, RGBtoXYZ),
	toxyY: toxyY,
	fromxyY: fromxyY,
	toLuv: toLuv,
	fromLuv: fromLuv
};
