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
					fieldRow.innerHTML += '<div class="label-text"><label' + (nameValue ? ' for="' + nameValue + '"' : '') + '>' + labelValue + '</label></div>';
				}
				if (formContainer.questions[i].required === true) {
					container.getElementsByClassName('label-text')[i].innerHTML += '<span class="required">*</span>';
				}
				if (fieldType !== undefined) {
					if (fieldType === "Text") {
						fieldRow.innerHTML += '<div class="field-control"><input type="text" class="text-input"' + (nameValue ? ' id="' + nameValue + '"' : '') + (nameValue ? ' name="' + nameValue + '"' : '') + '/></div>';
					}
					if (fieldType === "Select") {
						fieldRow.innerHTML += '<div class="field-control"><select' + (nameValue ? ' id="' + nameValue + '"' : '') + (nameValue ? ' name="' + nameValue + '"' : '') + '><option value="">-please select-</option></select></div>';
						var selectField = fieldRow.getElementsByTagName('select')[0];
						if (optionsValue !== undefined) {
							for (var j = 0; j < optionsValue.length; j++) {
								selectField.innerHTML += '<option value="' + optionsValue[j].value + '">' + optionsValue[j].label + '</option>';
							}
						}
					}
					if (fieldType === "Radio") {
						fieldRow.innerHTML += '<div class="col"></div>';
						var columnBlock = fieldRow.getElementsByClassName('col')[0];
						if (optionsValue !== undefined) {
							for (var j = 0; j < optionsValue.length; j++) {
								columnBlock.innerHTML += '<div class="field-item"><input' + (nameValue ? ' id="' + nameValue + j + '"' : '') + (nameValue ? ' name="' + nameValue + '"' : '') + ' type="radio" value ="' + optionsValue[j].value +'" class="radio"/><label' + (nameValue ? ' for="' + nameValue + j + '"' : '') + 'class="field-label">' + optionsValue[j].label + '</label></div>';
							}
						}
					}
					if (fieldType === "Textarea") {
						fieldRow.innerHTML += '<div class="field-control"><textarea cols="3" rows="3"' + (nameValue ? ' id="' + nameValue + '"' : '') + (nameValue ? ' name="' + nameValue + '"' : '') + '></textarea></div>';
					}
				}
			}
			container.innerHTML += '<div class="btn-block"><input type="submit" value="Submit" class="btn-submit"/></div>';
		}
	}
})();
