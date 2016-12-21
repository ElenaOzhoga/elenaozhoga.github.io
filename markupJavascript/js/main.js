function displayDomContent (id, contentVar) {
	document.getElementById(id).innerHTML = contentVar;
}

function renderAttributeWithHtmlTag (tagName, obj, tagContent) {
	var tagWithAttributes = '';
	tagWithAttributes += '<' + tagName;
	for (var key in obj) {
		tagWithAttributes += (key === 'className' ? ' class' : ' ' + key) + '="' + obj[key] + '"';
	}
	tagWithAttributes += (tagName === 'input' ? '/>' : '>');
	tagWithAttributes += (tagContent !== undefined ? tagContent : '');
	tagWithAttributes += (tagName === 'input' ? '' : '</' + tagName + '>');
	return tagWithAttributes;
}

function renderRequired (required) {
	var spanReq = '';
	if (required === true) {
		spanReq += renderAttributeWithHtmlTag ('span', {
			className: 'required'
		}, '*');
	}
	return spanReq;
}

function renderSelectOpt (options) {
	var select = '';
	if (options) {
		for (var j = 0; j < options.length; j++) {
			select += renderAttributeWithHtmlTag ('option', {
				value: options[j].value
			}, options[j].label);
		}
	}
	return select;
}

function renderRadioOpt (name, options) {
	var radio = '';
	if (options) {
		var index;
		for (var j = 0; j < options.length; j++) {
			index = j;
			radio += renderAttributeWithHtmlTag ('div', {
				className: 'field-item'
			}, renderAttributeWithHtmlTag ('input', {
				type: 'radio',
				value: options[j].value,
				className: 'radio',
				id: name + j,
				name: name
			}, renderAttributeWithHtmlTag ('label', {
				for: name + j,
				className: 'field-label'
			}, options[j].label)));
		}
	}
	return radio;
}

function renderHTML (question) {
	var content = '';
	var innerContent = '';
	var labelQ = question.label;
	var name = question.name;
	var required = question.required;
	var field = question.field_type;
	var options = question.options;
	if (labelQ) {
		innerContent += renderAttributeWithHtmlTag ('div', {
			className: 'label-text'
		}, renderAttributeWithHtmlTag ('label', {
			for: name
		}, labelQ) + renderRequired (required));
	}
	switch (field) {
		case "Text":
			innerContent += renderAttributeWithHtmlTag ('div', {
				className: 'field-control'
			}, renderAttributeWithHtmlTag ('input', {
				type: 'text',
				className: 'text-input',
				id: name,
				name: name
			}));
			break;
		case "Select":
			innerContent += renderAttributeWithHtmlTag ('div', {
				className: 'field-control'
			}, renderAttributeWithHtmlTag ('select', {
				id: name,
				name: name
			}, renderAttributeWithHtmlTag ('option', {
				value: ''
			}, '-please select-') + renderSelectOpt (options)));
			break;
		case "Radio":
			innerContent += renderAttributeWithHtmlTag ('div', {
				className: 'col'
			}, renderRadioOpt (name, options));
			break;
		case "Textarea":
			innerContent += renderAttributeWithHtmlTag ('div', {
				className: 'field-control'
			}, renderAttributeWithHtmlTag ('textarea', {
				cols: '3',
				rows: '3',
				id: name,
				name: name
			}));
	}
	content += renderAttributeWithHtmlTag ('div', {
			className: 'field-row'
		}, innerContent);
	return content;
}

function jsonQuestions (dataForm) {
	var domContent = '';
	var questionsContent = '';
	if (dataForm.questions) {
		for (var i = 0; i < dataForm.questions.length; i++) {
			questionsContent += renderHTML (dataForm.questions[i]);
		}
		questionsContent += renderAttributeWithHtmlTag ('div', {
			className: 'btn-block'
		}, renderAttributeWithHtmlTag ('input', {
			type: 'submit',
			value: 'Submit',
			className: 'btn-submit'
		}));
		domContent += renderAttributeWithHtmlTag ('form', {
			className: 'application-form',
			action: '#'
		}, renderAttributeWithHtmlTag ('fieldset', {}, questionsContent));
		displayDomContent ('content', domContent);
	}
}

(function () {
	/*var dataForm = restAPI.form;
	if (dataForm) {
		jsonQuestions (dataForm);
	}*/
	var XHR = ("onload" in new XMLHttpRequest()) ? XMLHttpRequest : XDomainRequest;
	var xhr = new XHR();
	xhr.open('GET', 'http://xys.uk.to/task-form/api/', true);
	xhr.onload = function() {
		alert( this.responseText );
	}
	xhr.onerror = function() {
		alert( '?????? ' + this.status );
	}

	xhr.send();
})();