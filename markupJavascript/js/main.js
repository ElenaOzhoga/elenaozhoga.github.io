function displayDomContent (id, contentVar) {
	document.getElementById(id).innerHTML = contentVar;
}

function renderAttribute (obj) {
	var attribute = '';
	for (var key in obj) {
		attribute += (key === 'classUpd' ? ' class' : ' ' + key) + '="' + obj[key] + '"';
	}
	return attribute;
}

function renderDiv (className, content) {
	return '<div' + renderAttribute ({
			classUpd: className
		}) + '>' + content + '</div>';
}

function renderRequired () {
	return '<span' + renderAttribute ({
			classUpd: 'required'
		}) + '>*</span>';
}

function renderLabel (label, name, required) {
	var labelText = '';
	labelText +=  '<label' + renderAttribute ({
		for: name
	}) + '>' + label + '</label>';
	if (required === true) {
		labelText += renderRequired ();
	}
	return labelText;
}

function renderTextField (name) {
	return '<input' + renderAttribute ({
			type: 'text',
			classUpd: 'text-input',
			id: name,
			name: name
		})  + '/>';
}

function renderSelect (name, options) {
	var select = '';
	select += '<select' + renderAttribute ({
		id: name,
		name: name
	}) + '><option' + renderAttribute ({
		value: ''
	}) + '>-please select-</option>';
	if (options) {
		for (var j = 0; j < options.length; j++) {
			select += '<option' + renderAttribute ({
				value: options[j].value
			}) + '>' + options[j].label + '</option>';
		}
	}
	select += '</select>';
	return select;
}

function renderRadioButton (name, options) {
	var radio = '';

	if (options) {
		var index;
		for (var j = 0; j < options.length; j++) {
			index = j;
			radio += '<div' + renderAttribute ({
				classUpd: 'field-item'
			}) + '>' + '<input' + renderAttribute ({
				type: 'radio',
				value: options[j].value,
				classUpd: 'radio',
				id: name + j,
				name: name
			}) + '/><label' + renderAttribute ({
				for: name + j
			}) + renderAttribute ({
				classUpd: 'field-label'
			}) + '>' + options[j].label + '</label></div>';
		}
	}
	return radio;
}

function renderTextArea (name) {
	return '<textarea' + renderAttribute ({
			cols: '3',
			rows: '3',
			id: name,
			name: name
		}) + '></textarea>';
}

function renderHTML (question) {
	var content = '';
	var label = question.label;
	var name = question.name;
	var required = question.required;
	var field = question.field_type;
	var options = question.options;
	content += '<div' + renderAttribute ({
		classUpd: 'field-row'
	}) + '>';
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
	domContent += '<form' + renderAttribute ({
		classUpd: 'application-form',
		action: '#'
	}) + '><fieldset>';
	if (dataForm.questions) {
		for (var i = 0; i < dataForm.questions.length; i++) {
			domContent += renderHTML (dataForm.questions[i]);
		}
		domContent += renderDiv ("btn-block", '<input' + renderAttribute ({
			type: 'submit',
			value: 'Submit',
			classUpd: 'btn-submit'
		}) + '/>') + '</fieldset></form>';
		displayDomContent ('content', domContent);
	}
	renderAttribute ({
		classUpd: 'application-form',
		action: '#'
	});
}

(function () {
	var dataForm = restAPI.form;
	if (dataForm) {
		jsonQuestions (dataForm);
	}
})();