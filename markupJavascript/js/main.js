function displayDomContent (id, contentVar) {
	document.getElementById(id).innerHTML = contentVar;
}

function renderHTML (questions) {
	var contentVar = '';
	var labelVal = 	questions.label;
	var nameVal = 	questions.name;
	var requiredVal = 	questions.required;
	var fieldVal = 	questions.field_type;
	var optionsVal = 	questions.options;
	contentVar += '<div class="field-row">';
	if (labelVal) {
		contentVar += '<div class="label-text"><label' + (nameVal ? ' for="' + nameVal + '"' : '') + '>' + labelVal + '</label>';
		if (requiredVal === true) {
			contentVar += '<span class="required">*</span>';
		}
		contentVar += '</div>';
	}
	if (fieldVal) {
		if (fieldVal === "Text") {
			contentVar += '<div class="field-control"><input type="text" class="text-input"' + (nameVal ? ' id="' + nameVal + '"' : '') + (nameVal ? ' name="' + nameVal + '"' : '') + '/></div>';
		}
		if (fieldVal === "Select") {
			contentVar += '<div class="field-control"><select' + (nameVal ? ' id="' + nameVal + '"' : '') + (nameVal ? ' name="' + nameVal + '"' : '') + '><option value="">-please select-</option>';
			if (optionsVal) {
				for (var j = 0; j < optionsVal.length; j++) {
					contentVar += '<option value="' + optionsVal[j].value + '">' + optionsVal[j].label + '</option>';
				}
			}
			contentVar += '</select></div>';
		}
		if (fieldVal === "Radio") {
			contentVar += '<div class="col">';
			if (optionsVal) {
				for (var j = 0; j < optionsVal.length; j++) {
					contentVar += '<div class="field-item"><input' + (nameVal ? ' id="' + nameVal + j + '"' : '') + (nameVal ? ' name="' + nameVal + '"' : '') + ' type="radio" value ="' + optionsVal[j].value +'" class="radio"/><label' + (nameVal ? ' for="' + nameVal + j + '"' : '') + 'class="field-label">' + optionsVal[j].label + '</label></div>';
				}
			}
			contentVar += '</div>';
		}
		if (fieldVal === "Textarea") {
			contentVar += '<div class="field-control"><textarea cols="3" rows="3"' + (nameVal ? ' id="' + nameVal + '"' : '') + (nameVal ? ' name="' + nameVal + '"' : '') + '></textarea></div>';
		}
	}
	contentVar += '</div>';
	return contentVar;
}

function jsonQuestions (dataForm) {
	var domContent = '';
	domContent += '<form class="application-form" action="#"><fieldset>';
	if (dataForm.questions) {
		for (var i = 0; i < dataForm.questions.length; i++) {
			domContent += renderHTML (dataForm.questions[i]);
		}
		domContent += '<div class="btn-block"><input type="submit" value="Submit" class="btn-submit"/></div></fieldset></form>';
		displayDomContent ('content', domContent);
	}
}

(function () {
	var dataForm = restAPI.form;
	if (dataForm) {
		jsonQuestions (dataForm);
	}
})();