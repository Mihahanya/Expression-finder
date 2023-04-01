
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
	
	var p = Math.floor(Math.random() * (maximum - minimum + 1)) + minimum
	if (exclude.includes(p)) return rand_int(minimum, maximum, exclude)
	
	return p
}

function gen_simple_expr(level) {
	const k = 1.4
	var to = Math.ceil(k**level) + 50
	// var from = Math.ceil((to-50)/k/k)
	var from = 1

	console.log(from, to)
	
	var a = rand_int(from, to)
	var b = rand_int(from, to) * (Math.random() < 0.5 ? -1 : 1)

	var expr = a + (b > 0 ? '+' : '-') + Math.abs(b)

	return { expression: expr, answer: a+b }
}
