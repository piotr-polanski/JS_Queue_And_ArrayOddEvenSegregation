"use strict"
// Input
var numbers = [7,7,4,0,9,8,2,4,1,9];
console.log('start', numbers);
// *** Start your code here *** //
(function precedeOddWithEven(arrayToProccess){
	const NOT_FOUND = -1
	let oddCount = 0
	let lastKnownEvenItemIndex = arrayToProccess.length-1
	
	for(let i = 0; i < arrayToProccess.length; i++){		
		if(isItemOdd(arrayToProccess[i])){
			let lastEvenItemIndex = findLastEvenItemIndex(i+1, lastKnownEvenItemIndex)
			if(isThereAnyEvenItemLeft(lastEvenItemIndex))
			{
				switchItems(lastEvenItemIndex, i)
				lastKnownEvenItemIndex = lastEvenItemIndex-1	
				oddCount++
				
				breakIfNoPointForContinue(i)
			}
			else{
				break
			}
		}
	}

	function findLastEvenItemIndex(toIndex, fromIndex) {
		for(let i = fromIndex; i >= toIndex; i--){
			if(isItemEven(arrayToProccess[i])){
				return i
			}
		}
		return NOT_FOUND
	}
	
	function isItemOdd(item){
		return item % 2 !== 0
	}
	
	function isItemEven(item){
		return !isItemOdd(item)
	}
	
	function isThereAnyEvenItemLeft(index){
		return index !== NOT_FOUND
	}
	
	function switchItems(evenIndex, oddIndex){
		let firstOdd = arrayToProccess[oddIndex]
		let lastEven = arrayToProccess[evenIndex]
		arrayToProccess[evenIndex] = firstOdd
		arrayToProccess[oddIndex] = lastEven
	}
	
	function breakIfNoPointForContinue(index){
		if(index === lastKnownEvenItemIndex){
			return
		}
		if(oddCount >= arrayToProccess.length/2){
			return
		}
	}
})(numbers)
// *** End your code here *** //
console.log(numbers);
