
function SeededRandom(seed) {
	let x = Math.sin(seed) * 666666
	this.seed = x - Math.floor(x)
}
  
SeededRandom.prototype.next = function() {
	let x = Math.sin(this.seed++) * 666666
	return x - Math.floor(x)
}

let random = new SeededRandom('hashString(seed)');


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


function rand_int(minimum, maximum, exclude=[]) {
	for (var i=0; i < exclude.length; i++) {
		if (exclude.includes(minimum+1)) { 
			minimum++; 
			exclude = exclude.filter(e => e <= minimum) 
		}
		if (exclude.includes(maximum-1)) { 
			maximum--; 
			exclude = exclude.filter(e => e >= maximum) 
		}
	}

	if (maximum - minimum < 0) {console.log('aaa'); return null}
	
	var p = Math.floor(random.next() * (maximum - minimum + 1)) + minimum
	if (exclude.includes(p)) return rand_int(minimum, maximum, exclude)
	
	return p
}


function expand_expression(number, depth_rate=0.8, prob=1, prev=-1) {
	if (random.next() > prob) return number

	var res_str = ''

	var count_of_complication_types = 2
	var excl = []
	// if (prev == 3) excl.push(2)
	
	if (excl.length == count_of_complication_types) return number
	
	var t = rand_int(1, count_of_complication_types, excl)
	
	if (t == 1) {
		var a = rand_int(1, number-1)
		var b = number - a

		if (a == null) return expand_expression(number, depth_rate, prob*depth_rate, prev=t)

		res_str += expand_expression(a, depth_rate, prob*depth_rate, prev=t)
		res_str += '+'
		res_str += expand_expression(b, depth_rate, prob*depth_rate, prev=t)
	}
	else if (t == 2) {
		var b = rand_int(2, 13)
		var a = number * b

		res_str += '\\frac{'
		res_str += expand_expression(a, depth_rate, prob*depth_rate, prev=t)
		res_str += '}{'
		res_str += expand_expression(b, depth_rate, prob*depth_rate, prev=t)
		res_str += '}'
	}
	
	return res_str
	// return '(' + res_str + ')'
}