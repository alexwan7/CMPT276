var grades = [65.95, 56.98, 78.62, 96.1, 90.3, 72.24, 92.34, 60.00, 81.43, 86.22, 88.33, 9.03,
 49.93, 52.34, 53.11, 50.10, 88.88, 55.32, 55.69, 61.68, 70.44, 70.54, 90.0, 71.11, 80.01];

var lower_bounds = ["max","A_plus","A","A_minor","B_plus","B","B_minor","C_plus","C","C_minor","D","F"];


var grade_count = {"A_plus": 0, "A": 0, "A_minor": 0, "B_plus": 0, "B": 0, "B_minor" :0,
							"C_plus": 0, "C": 0, "C_minor": 0, "D": 0, "F": 0};

window.onload = change_lower_bound;

function isFloat(val) {
    var floatRegex = /^-?\d+(?:[.,]\d*?)?$/;
    if (!floatRegex.test(val))
        return false;

    val = parseFloat(val);
    if (isNaN(val))
        return false;
    return true;
}

 function check_input_all_valid(){
 	
 	for(let i =0; i < lower_bounds.length; i++)
 	{
 		let temp = document.getElementById(lower_bounds[i]);
 		var value = temp.value;

 		if(!isFloat(value))
 		{
	 			return "not_a_float";
	 	}else{
	 		let max_value = document.getElementById("max").value;

 			if(parseFloat(value) > parseFloat(max_value))
 			{
 				return "exceed_max_value";
 			}
	 	}
 	}

 	for(let i =0; i < lower_bounds.length; i++)
 	{

 		let value1 = document.getElementById(lower_bounds[i]).value;

 		for(let j = i+1; j< lower_bounds.length; j++)
 		{
 			let value2 = document.getElementById(lower_bounds[j]).value;

 			if(parseFloat(value1) <= parseFloat(value2))
 			{
	 			return "out_of_order";
	 		}
 		}
 	}

 	return true;
 }

 function change_lower_bound(){
 	let result = check_input_all_valid();
 	let error_message = document.getElementById("error_message");

 	if(result == true)
 	{
 		grade_count = {"A_plus": 0, "A": 0, "A_minor": 0, "B_plus": 0, "B": 0, "B_minor" :0,
							"C_plus": 0, "C": 0, "C_minor": 0, "D": 0, "F": 0};
		for(let i = 0; i < Object.keys(grade_count).length; i++){
			let temp = Object.entries(grade_count)[i];
			var temp_name = temp[0];
			let temp_element = document.getElementById(temp_name + "_count");
			temp_element.innerHTML = "";
		}

		error_message.innerHTML = "";
		
		var max = parseFloat(document.getElementById("max").value);
		var A_plus = parseFloat(document.getElementById("A_plus").value);
		var A = parseFloat(document.getElementById("A").value);
		var A_minor = parseFloat(document.getElementById("A_minor").value);
		var B_plus = parseFloat(document.getElementById("B_plus").value);
		var B = parseFloat(document.getElementById("B").value);
		var B_minor = parseFloat(document.getElementById("B_minor").value);
		var C_plus = parseFloat(document.getElementById("C_plus").value);
		var C = parseFloat(document.getElementById("C").value);
		var C_minor = parseFloat(document.getElementById("C_minor").value);
		var D = parseFloat(document.getElementById("D").value);
		var F = parseFloat(document.getElementById("F").value);

		grades.forEach(function(grade){
			if(grade <= max && grade >= A_plus)
			{
				grade_count.A_plus += 1;
			}else if(grade < A_plus && grade >= A){
				grade_count.A += 1;
			}else if(grade < A && grade >= A_minor){
				grade_count.A_minor += 1;
			}else if(grade < A_minor && grade >= B_plus){
				grade_count.B_plus += 1;
			}else if(grade < B_plus && grade >= B){
				grade_count.B += 1;
			}else if(grade < B && grade >= B_minor){
				grade_count.B_minor += 1;
			}else if(grade < B_minor && grade >= C_plus){
				grade_count.C_plus += 1;
			}else if(grade < C_plus && grade >= C){
				grade_count.C += 1;
			}else if(grade < C && grade >= C_minor){
				grade_count.C_minor += 1;
			}else if(grade < C_minor && grade >= D){
				grade_count.D += 1;
			}else{
				grade_count.F += 1;
			}
		});

		for(let i = 0; i < Object.keys(grade_count).length; i++){
			let temp = Object.entries(grade_count)[i];
			var temp_count = document.getElementById(temp[0] + "_count");

			for(let j = 0; j < temp[1]; j++){
				temp_count.insertAdjacentHTML('afterbegin', '<span class="grade"> &nbsp;</span>&nbsp;');
			}
		}
 	}else{
 		grade_count = {"A_plus": 0, "A": 0, "A_minor": 0, "B_plus": 0, "B": 0, "B_minor" :0,
							"C_plus": 0, "C": 0, "C_minor": 0, "D": 0, "F": 0};
		for(let i = 0; i < Object.keys(grade_count).length; i++){
			let temp = Object.entries(grade_count)[i];
			var temp_name = temp[0];
			let temp_element = document.getElementById(temp_name + "_count");
			temp_element.innerHTML = "";
		}

 		var message;

 		switch(result)
 		{
 			case 'not_a_float':
 				message = "Some input is not valid float.";
 				break;
 			case 'exceed_max_value':
 				message = "Some bound exceeds the maxmimum value.";
 				break;
 			case 'out_of_order':
 				message = "Some of bounds are out of order.";
 				break;
 			default:
 				message = "";
 				break;
 		}

 		error_message.innerHTML = message;
 	}
 }