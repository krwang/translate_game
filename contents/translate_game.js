// This allows the Javascript code inside this block to only run when the page
// has finished loading in the browser.
$(document).ready(function() {
	var lang_to		= "English";
	var lang_from		= "Spanish";
	var current_dict	= dicts[lang_to][lang_from]; // keys: words in @lang_to, values: corresponding words in @lang_from 	
	
	//updating title with lang_from and lang_to
	$('.title').append(lang_from).append(' to ').append(lang_to);

	//dictionary of words in lang_to
	var keys = [];
	for(var k in current_dict) {
		keys.push(k);
	}
	var translation;

	//choosing a random word
	new_word(current_dict, keys);

	//clear input and place focus on it
	var input = $("#input");
	clear_input(input);

	//autocomplete function
	input.autocomplete({
		autofocus: true,
		minLength: 2,
		source: keys,
		select: function(event, ui) {
			check_word(ui.item.value, current_dict, keys);
			clear_input(input);
			new_word(current_dict, keys);
			return false;
		}
	});

	//for mouse click on "See Answer" button
	$('.submit').click(function() {
		submit_and_reset(input, current_dict, keys);
	});

	//for enter keypress
	input.bind('keypress', function(e) {
		if(e.keyCode==13){
			submit_and_reset(input, current_dict, keys);
		}
	});

});

//combines check_word(), clear_input(), new_word()
function submit_and_reset(input, current_dict, keys) {
	check_word(input.val(), current_dict, keys);
	new_word(current_dict, keys);
	clear_input(input);
}

//chooses a random word from lang_from and replaces the old word with it
function new_word(current_dict, keys) {
	var random = Math.floor(Math.random()*101);
	$('.word_to_translate').text(current_dict[keys[random]]);
	translation = keys[random];
}

//clears all text in the input text field and places focus on the text box
function clear_input(input) {
	input[0].selectionStart = input[0].selectionEnd = input.val().length;
	input.val("");
}

//check if the guess is correct and displays the result in the table
function check_word(word, current_dict, keys) {
	if (word == translation) { //correct
		$('.table tbody tr.blank').after('<tr id = row> <td>' + current_dict[translation] + 
										 '</td> <td>' + word + 
										 '</td> <td> <span class = "ui-icon ui-icon-check"> </td> </tr>');
		$("#row").css("color", "blue");
	}
	else { //incorrect
		$('.table tbody tr.blank').after('<tr id = row> <td>' + current_dict[translation] + 
										 '</td> <td> <strike>' + word + 
										 '</strike> </td> <td>' + translation + ' </td> </tr>');
		$("#row").css("color", "red");
	}
}
