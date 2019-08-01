let getCurrentCityName = function() {
	return new Promise(function(resolve, reject) {
		let myCity = new BMap.LocalCity()
		myCity.get(function(result) {
			// console.log(result)
			resolve(result.name)
			console.log(result.center)
			localStorage.setItem('point',JSON.stringify(result.center))
		})
	})
}

export default getCurrentCityName
