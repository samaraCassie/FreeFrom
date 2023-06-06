$("#preco").inputmask("currency", {
		autoUnmask: true,
		radixPoint: ".",
		groupSeparator: ",",
		allowMinus: false,
		digits: 2,
		digitsOptional: false,
		rightAlign: false,
		unmaskAsNumber: false
	});