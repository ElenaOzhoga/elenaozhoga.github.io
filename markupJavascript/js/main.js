function displayDomContent (id, contentVar) {
	document.getElementById(id).innerHTML = contentVar;
}

function renderDiv (className, content) {
	return '<div class=' + className + '>' + content + '</div>';
}

function renderRequired () {
	return '<span class="required">*</span>';
}

function renderLabel (label, name, required) {
	var labelText = '';
	labelText +=  '<label' + (name ? ' for="' + name + '"' : '') + '>' + label + '</label>';
	if (required === true) {
		labelText += renderRequired ();
	}
	return labelText;
}

function renderTextField (name) {
	return '<input type="text" class="text-input"' + (name ? ' id="' + name + '"' : '') + (name ? ' name="' + name + '"' : '') + '/>';
}

function renderSelect (name, options) {
	var select = '';
	select += '<select' + (name ? ' id="' + name + '"' : '') + (name ? ' name="' + name + '"' : '') + '><option value="">-please select-</option>';
	if (options) {
		for (var j = 0; j < options.length; j++) {
			select += '<option value="' + options[j].value + '">' + options[j].label + '</option>';
		}
	}
	select += '</select>';
	return select;
}

function renderRadioButton (name, options) {
	var radio = '';
	if (options) {
		for (var j = 0; j < options.length; j++) {
			radio += '<div class="field-item">' + '<input' + (name ? ' id="' + name + j + '"' : '') + (name ? ' name="' + name + '"' : '') + ' type="radio" value ="' + options[j].value +'" class="radio"/><label' + (name ? ' for="' + name + j + '"' : '') + 'class="field-label">' + options[j].label + '</label>' + '</div>';
		}
	}
	return radio;
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
	content += '<div class="field-row">';
	if (label) {
		content += renderDiv ("label-text", renderLabel (label, name, required));
	}
	if (field) {
		if (field === "Text") {
			content += renderDiv ("field-control", renderTextField (name));
		}
		if (field === "Select") {
			content += renderDiv ("field-control", renderSelect (name, options));
		}
		if (field === "Radio") {
			content += renderDiv ("col", renderRadioButton (name, options));
		}
		if (field === "Textarea") {
			content += renderDiv ("field-control", renderTextArea (name));
		}
	}
	content += '</div>';
	return content;
}

function jsonQuestions (dataForm) {
	var domContent = '';
	domContent += '<form class="application-form" action="#"><fieldset>';
	if (dataForm.questions) {
		for (var i = 0; i < dataForm.questions.length; i++) {
			domContent += renderHTML (dataForm.questions[i]);
		}
		domContent += renderDiv ("btn-block", '<input type="submit" value="Submit" class="btn-submit"/>') + '</fieldset></form>';
		displayDomContent ('content', domContent);
	}
}

(function () {
	var dataForm = restAPI.form;
	if (dataForm) {
		jsonQuestions (dataForm);
	}
})();