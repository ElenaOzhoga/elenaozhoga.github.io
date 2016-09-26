function displayDomContent (id, contentVar) {
	document.getElementById(id).innerHTML = contentVar;
}

function renderDivStart (className) {
	return '<div class=' + className + '>';
}

function renderEndDiv () {
	return '</div>';
}

function renderLabel (label, name) {
	return '<label' + (name ? ' for="' + name + '"' : '') + '>' + label + '</label>';
}

function renderRequired () {
	return '<span class="required">*</span>';
}

function renderTextField (name) {
	return '<input type="text" class="text-input"' + (name ? ' id="' + name + '"' : '') + (name ? ' name="' + name + '"' : '') + '/>';
}

function renderSelectStart (name) {
	return '<select' + (name ? ' id="' + name + '"' : '') + (name ? ' name="' + name + '"' : '') + '><option value="">-please select-</option>';
}

function renderSelectEnd () {
	return '</select>';
}

function renderSelectOptions (optVal, optLabel) {
	return '<option value="' + optVal + '">' + optLabel + '</option>';
}

function renderRadioButton (name, optVal, optLabel, index) {
	return '<input' + (name ? ' id="' + name + index + '"' : '') + (name ? ' name="' + name + '"' : '') + ' type="radio" value ="' + optVal +'" class="radio"/><label' + (name ? ' for="' + name + index + '"' : '') + 'class="field-label">' + optLabel + '</label>';
}

function renderTextArea (name) {
	return '<textarea cols="3" rows="3"' + (name ? ' id="' + name + '"' : '') + (name ? ' name="' + name + '"' : '') + '></textarea>';
}

function renderHTML (question) {
	var content = '';
	var label = question.label;
	var name = question.name;
	var required = question.required;
	var field = question.field_type;
	var options = question.options;
	content += renderDivStart ("field-row");
	if (label) {
		content += renderDivStart ("label-text") + renderLabel (label, name);
		if (required === true) {
			content += renderRequired ();
		}
		content += renderEndDiv ();
	}
	if (field) {
		if (field === "Text") {
			content += renderDivStart ("field-control") + renderTextField (name) + renderEndDiv ();
		}
		if (field === "Select") {
			content += renderDivStart ("field-control") + renderSelectStart (name);
			if (options) {
				for (var j = 0; j < options.length; j++) {
					content += renderSelectOptions (options[j].value, options[j].label);
				}
			}
			content += renderSelectEnd () + renderEndDiv ();
		}
		if (field === "Radio") {
			content += renderDivStart ("col");
			if (options) {
				for (var j = 0; j < options.length; j++) {
					content += renderDivStart ("field-item") + renderRadioButton (name, options[j].value, options[j].label, j) + renderEndDiv ();
				}
			}
			content += renderEndDiv ();
		}
		if (field === "Textarea") {
			content += renderDivStart ("field-control") + renderTextArea (name) + renderEndDiv ();
		}
	}
	content += renderEndDiv ();
	return content;
}

function jsonQuestions (dataForm) {
	var domContent = '';
	domContent += '<form class="application-form" action="#"><fieldset>';
	if (dataForm.questions) {
		for (var i = 0; i < dataForm.questions.length; i++) {
			domContent += renderHTML (dataForm.questions[i]);
		}
		domContent += renderDivStart ("btn-block") + '<input type="submit" value="Submit" class="btn-submit"/>' + renderEndDiv () + '</fieldset></form>';
		displayDomContent ('content', domContent);
	}
}

(function () {
	var dataForm = restAPI.form;
	if (dataForm) {
		jsonQuestions (dataForm);
	}
})();