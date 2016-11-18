function displayDomContent (id, contentVar) {
	document.getElementById(id).innerHTML = contentVar;
}

function renderAttributeWithHtmlTag (obj) {
	var tagWithAttributes = '';
	for (var key in obj) {
		tagWithAttributes += '<' + key;
		for (var keyInner in obj[key]) {
			tagWithAttributes += (keyInner !== 'tagContent' ? (keyInner === 'classUpd' ? ' class' : ' ' + keyInner) + '="' + obj[key][keyInner] + '"' : '');
		}
		tagWithAttributes += (key === 'input' ? '/>' : '>');
		for (var keyInner in obj[key]) {
			tagWithAttributes += (keyInner === 'tagContent' ? obj[key][keyInner] : '');
		}
	}
	return tagWithAttributes;
}

function renderRequired (required) {
	var spanReq = '';
	if (required === true) {
		spanReq += renderAttributeWithHtmlTag ({
			span: {
				classUpd: 'required',
				tagContent: '*'
			},
			'/span': {}
		});
	}
	return spanReq;
}

function renderSelectOpt (options) {
	var select = '';
	if (options) {
		for (var j = 0; j < options.length; j++) {
			select += renderAttributeWithHtmlTag ({
				'option': {
					value: options[j].value,
					tagContent: options[j].label
				},
				'/option': {}
			});
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
			radio += renderAttributeWithHtmlTag ({
				div: {
					classUpd: 'field-item'
				},
				input: {
					type: 'radio',
					value: options[j].value,
					classUpd: 'radio',
					id: name + j,
					name: name
				},
				label: {
					for: name + j,
					classUpd: 'field-label',
					tagContent: options[j].label
				},
				'/label': {},
				'/div': {}
			});
		}
	}
	return radio;
}

function renderHTML (question) {
	var content = '';
	var labelQ = question.label;
	var name = question.name;
	var required = question.required;
	var field = question.field_type;
	var options = question.options;
	content += renderAttributeWithHtmlTag ({
		div: {
			classUpd: 'field-row'
		}
	});
	if (labelQ) {
		content += renderAttributeWithHtmlTag ({
			div: {
				classUpd: 'label-text'
			},
			label: {
				for: name,
				tagContent: labelQ
			},
			'/label': {}
		}) + renderRequired (required) + renderAttributeWithHtmlTag ({
			'/div': {}
		});
	}
	if (field) {
		if (field === "Text") {
			content += renderAttributeWithHtmlTag ({
				div: {
					classUpd: 'field-control'
				},
				input: {
					type: 'text',
					classUpd: 'text-input',
					id: name,
					name: name
				},
				'/div': {}
			});
		}
		if (field === "Select") {
			content += renderAttributeWithHtmlTag ({
				div: {
					classUpd: 'field-control'
				},
				select: {
					id: name,
					name: name
				},
				option: {
					value: '',
					tagContent: '-please select-'
				},
				'/option': {}
			}) + renderSelectOpt (options) + renderAttributeWithHtmlTag ({
				'/select': {},
				'/div': {}
			});
		}
		if (field === "Radio") {
			content += renderAttributeWithHtmlTag ({
				div: {
					classUpd: 'col'
				}
			}) + renderRadioOpt (name, options) + renderAttributeWithHtmlTag ({
				'/div': {}
			});
		}
		if (field === "Textarea") {
			content += renderAttributeWithHtmlTag ({
				div: {
					classUpd: 'field-control'
				},
				textarea: {
					cols: '3',
					rows: '3',
					id: name,
					name: name
				},
				'/textarea': {},
				'/div': {}
			});
		}
	}
	content += renderAttributeWithHtmlTag ({
		'/div': {}
	});
	return content;
}

function jsonQuestions (dataForm) {
	var domContent = '';
	domContent += renderAttributeWithHtmlTag ({
		form: {
			classUpd: 'application-form',
			action: '#'
		},
		fieldset: {}
	});
	if (dataForm.questions) {
		for (var i = 0; i < dataForm.questions.length; i++) {
			domContent += renderHTML (dataForm.questions[i]);
		}
		domContent += renderAttributeWithHtmlTag ({
			div: {
				classUpd: 'btn-block'
			},
			input: {
				type: 'submit',
				value: 'Submit',
				classUpd: 'btn-submit'
			},
			'/div': {},
			'/fieldset': {},
			'/form': {}
		});
		displayDomContent ('content', domContent);
	}
}

(function () {
	var dataForm = restAPI.form;
	if (dataForm) {
		jsonQuestions (dataForm);
	}
})();