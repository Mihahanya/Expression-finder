
function SeededRandom(seed) {
	let x = Math.sin(seed) * 666666
	this.seed = x - Math.floor(x)
}
  
SeededRandom.prototype.next = function() {
	let x = Math.sin(this.seed++) * 666666
	return x - Math.floor(x)
}

let random = new SeededRandom('hashString(seed)');

Array.prototype.sample = function() {
	return this[Math.floor(random.next()*this.length)];
}

function hashString(str) {
	let hash = 0;
	if (str.length === 0) {
		return hash;
	}
	for (let i = 0; i < str.length; i++) {
		let char = str.charCodeAt(i);
		hash = ((hash << 5) - hash) + char;
		hash = hash & hash; 
	}
	return hash;
}


// function rand_int(minimum, maximum, exclude=[]) {
// 	for (var i=0; i < exclude.length; i++) {
// 		if (exclude.includes(minimum+1)) { 
// 			minimum++; 
// 			exclude = exclude.filter(e => e <= minimum) 
// 		}
// 		if (exclude.includes(maximum-1)) { 
// 			maximum--; 
// 			exclude = exclude.filter(e => e >= maximum) 
// 		}
// 	}

// 	if (maximum - minimum < 0) return null
	
// 	var p = Math.floor(random.next() * (maximum - minimum + 1)) + minimum
// 	if (exclude.includes(p)) return rand_int(minimum, maximum, exclude)
	
// 	return p
// }

function rand_int(minimum, maximum, safe) {
	if (maximum < minimum) { 
		if (safe) maximum = minimum
		else return null 
	}
	return Math.floor(random.next() * (maximum - minimum + 1)) + minimum
}


function get_divisors(num) {
	let divisors = [];
  
	for (let i = 1; i <= Math.ceil(num/2); i++) {
	  	if (num % i == 0) {
			divisors.push(i);
		}
	}
  
	return divisors;
}


function expand_expression(number, depth_rate=0.8, prob=1, prev=-1, brc=false) {
	if (random.next() > prob && number != 1) return number

	var res_str = ''
	number = +number

	var next_prob = prob*depth_rate

	//if (random.next() < 1-prob) {
		if (number == 1) {
			const operation_type = rand_int(1, 4)
			if (operation_type == 1) return '\\left(-e^{\\pi i}\\right)'
			if (operation_type == 2) return `\\sin\\frac{\\pi}{${expand_expression(2, depth_rate, next_prob, 3)}}`
			if (operation_type == 3) return `\\tan\\frac{\\pi}{${expand_expression(4, depth_rate, next_prob, 3)}}`
			if (operation_type == 4) return `0.(9)`
		}
		// if (number == 2) {
		// 	const operation_type = rand_int(1, 3)
		// 	if (operation_type == 1) return '(-e^{\\pi i})'
		// 	if (operation_type == 2) return `\\sin\\frac{\\pi}{${expand_expression(2, depth_rate, next_prob, 3)}}`
		// 	if (operation_type == 3) return `\\tan\\frac{\\pi}{${expand_expression(4, depth_rate, next_prob, 3)}}`
		// }
	//}


	const count_of_complication_types = 5
	
	var t = rand_int(1, count_of_complication_types)
	
	if (number == 0) return 0

	if (t == 1) {
		var a = rand_int(1, number-1, true) 	// a < number
		var b = number - a

		res_str += expand_expression(a, depth_rate, next_prob, t)
		res_str += '+'
		res_str += expand_expression(b, depth_rate, next_prob, t)
	}
	else if (t == 2) {
		var a = rand_int(number+1, number*2, true) 	// number < a < 2*number
		var b = a - number

		res_str += expand_expression(a, depth_rate, next_prob, t)
		res_str += '-'
		res_str += expand_expression(b, depth_rate, next_prob, t, true)
	}
	else if (t == 3) {
		var b = rand_int(2, Math.min(number/3, 777)+13) 	// rand(2, ($ <= 777) + 13 )
		var a = number * b

		if (prev != t) {
			res_str += '\\frac{'
			res_str += expand_expression(a, depth_rate, next_prob, t)
			res_str += '}{'
			res_str += expand_expression(b, depth_rate, next_prob, t)
			res_str += '}'
		}
		else {
			res_str += expand_expression(a, depth_rate, next_prob, t, true)
			res_str += '\\div'
			res_str += expand_expression(b, depth_rate, next_prob, t, true)
		}
	}
	else if (t == 4) {
		var b = get_divisors(number).sample()
		var a = number / b
		var second_num = expand_expression(b, depth_rate, next_prob, t, true)

		res_str += expand_expression(a, depth_rate, next_prob, t, true)

		if (second_num.toString().indexOf('\\') != 0) res_str += '\\times'
		
		res_str += second_num
	}
	else if (t == 5) {
		var a = number**2
		var expand_expr = expand_expression(a, depth_rate, next_prob, t)

		if (expand_expr.toString().indexOf('\\sqrt{') == 0) {
			res_str += '\\sqrt[4]{'
			expand_expr = expand_expr.slice(6, -1)
		}
		else {
			res_str += '\\sqrt{'
		}

		res_str += expand_expr
		res_str += '}'
	}
	
	if (brc && res_str.split('').some(e => '+-'.includes(e)) && t != 3) return '\\left(' + res_str + '\\right)' 

	return res_str
}