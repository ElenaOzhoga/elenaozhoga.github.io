function displayDomContent (id, contentVar) {
	document.getElementById(id).innerHTML = contentVar;
}

function buildHTML (questions, labelVal, nameVal, requiredVal, fieldVal, optionsVal, contentVar) {
	if (questions !== undefined) {
		contentVar += '<div class="field-row">';
		if (labelVal !== undefined) {
			contentVar += '<div class="label-text"><label' + (nameVal ? ' for="' + nameVal + '"' : '') + '>' + labelVal + '</label>';
			if (requiredVal === true) {
				contentVar += '<span class="required">*</span>';
			}
			contentVar += '</div>';
		}
		if (fieldVal !== undefined) {
			if (fieldVal === "Text") {
				contentVar += '<div class="field-control"><input type="text" class="text-input"' + (nameVal ? ' id="' + nameVal + '"' : '') + (nameVal ? ' name="' + nameVal + '"' : '') + '/></div>';
			}
			if (fieldVal === "Select") {
				contentVar += '<div class="field-control"><select' + (nameVal ? ' id="' + nameVal + '"' : '') + (nameVal ? ' name="' + nameVal + '"' : '') + '><option value="">-please select-</option>';
				if (optionsVal !== undefined) {
					for (var j = 0; j < optionsVal.length; j++) {
						contentVar += '<option value="' + optionsVal[j].value + '">' + optionsVal[j].label + '</option>';
					}
				}
				contentVar += '</select></div>';
			}
			if (fieldVal === "Radio") {
				contentVar += '<div class="col">';
				if (optionsVal !== undefined) {
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

}

function getQuestions (dataForm) {
	var domContent = '';
	domContent += '<form class="application-form" action="#"><fieldset>';
	if (dataForm.questions !== undefined) {
		for (var i = 0; i < dataForm.questions.length; i++) {
			domContent = buildHTML (dataForm.questions, dataForm.questions[i].label, dataForm.questions[i].name, dataForm.questions[i].required,
					dataForm.questions[i].field_type, dataForm.questions[i].options, domContent);
		}
		domContent += '<div class="btn-block"><input type="submit" value="Submit" class="btn-submit"/></div></fieldset></form>';
		displayDomContent ('content', domContent);
	}
}

(function () {
	var formContainer = restAPI.form;
	if (formContainer !== undefined) {
		getQuestions (formContainer);
	}
})();