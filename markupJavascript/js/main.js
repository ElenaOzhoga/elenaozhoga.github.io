(function () {
	var formContainer = restAPI.form;
	if (formContainer !== undefined) {
		document.getElementById('content').innerHTML = '<form class="application-form" action="#"><fieldset></fieldset></form>';
		var container = document.getElementById('content').getElementsByTagName('fieldset')[0];
		if (formContainer.questions !== undefined) {
			for (var i = 0; i < restAPI.form.questions.length; i++) {
				container.innerHTML += '<div class="field-row"></div>';
				var fieldType = formContainer.questions[i].field_type;
				var fieldRow = container.getElementsByClassName('field-row')[i];
				var labelValue = formContainer.questions[i].label;
				var nameValue = formContainer.questions[i].name;
				var optionsValue = formContainer.questions[i].options;
				if (labelValue !== undefined) {
					fieldRow.innerHTML += '<div class="label-text"><label>' + labelValue + '</label></div>';
					if (nameValue) {
						container.getElementsByClassName('label-text')[i].getElementsByTagName('label')[0].setAttribute("for", nameValue);
					}
				}
				if (formContainer.questions[i].required === true) {
					container.getElementsByClassName('label-text')[i].innerHTML += '<span class="required">*</span>';
				}
				if (fieldType !== undefined) {
					if (fieldType === "Text") {
						fieldRow.innerHTML += '<div class="field-control"><input type="text" class="text-input"/></div>';
						var textField = fieldRow.getElementsByClassName('text-input')[0];
						if (nameValue) {
							textField.setAttribute("id", nameValue);
							textField.setAttribute("name", nameValue);
						}
					}
					if (fieldType === "Select") {
						fieldRow.innerHTML += '<div class="field-control"><select><option value="">-please select-</option></select></div>';
						var selectField = fieldRow.getElementsByTagName('select')[0];
						if (nameValue) {
							selectField.setAttribute("id", nameValue);
							selectField.setAttribute("name", nameValue);
						}
						if (optionsValue !== undefined) {
							for (var j = 0; j < optionsValue.length; j++) {
								selectField.innerHTML += '<option value="' + optionsValue[j].value + '">' + optionsValue[j].label + '</option>';
							}
						}
					}
					if (fieldType === "Radio") {
						fieldRow.innerHTML += '<div class="col"></div>';
						if (optionsValue !== undefined) {
							for (var j = 0; j < optionsValue.length; j++) {
								fieldRow.getElementsByClassName('col')[0].innerHTML += '<div class="field-item"><input type="radio" value ="' + optionsValue[j].value +'" class="radio"/><label for="' + formContainer.questions[i].name + j +'" class="field-label">' + optionsValue[j].label + '</label></div>';
								var radioField = container.getElementsByClassName('field-item')[j].getElementsByClassName('radio')[0];
								if (nameValue) {
									radioField.setAttribute("id", nameValue + j);
									radioField.setAttribute("name", nameValue);
								}
							}
						}
					}
					if (fieldType === "Textarea") {
						fieldRow.innerHTML += '<div class="field-control"><textarea cols="3" rows="3"></textarea></div>';
						var commentField = fieldRow.getElementsByTagName('textarea')[0];
						if (nameValue) {
							commentField.setAttribute("id", nameValue);
							commentField.setAttribute("name", nameValue);
						}
					}
				}
			}
			container.innerHTML += '<div class="btn-block"><input type="submit" value="Submit" class="btn-submit"/></div>';
		}
	}
})();
