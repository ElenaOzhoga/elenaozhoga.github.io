(function () {
	var formContainer = restAPI.form;
	var domContent = '';
	if (formContainer !== undefined) {
		domContent += '<form class="application-form" action="#"><fieldset>';
		if (formContainer.questions !== undefined) {
			for (var i = 0; i < restAPI.form.questions.length; i++) {
				domContent += '<div class="field-row">';
				var fieldType = formContainer.questions[i].field_type;
				var labelValue = formContainer.questions[i].label;
				var nameValue = formContainer.questions[i].name;
				var optionsValue = formContainer.questions[i].options;

				if (labelValue !== undefined) {
					domContent += '<div class="label-text"><label' + (nameValue ? ' for="' + nameValue + '"' : '') + '>' + labelValue + '</label>';
					if (formContainer.questions[i].required === true) {
						domContent += '<span class="required">*</span>';
					}
					domContent += '</div>';
				}
				if (fieldType !== undefined) {
					if (fieldType === "Text") {
						domContent += '<div class="field-control"><input type="text" class="text-input"' + (nameValue ? ' id="' + nameValue + '"' : '') + (nameValue ? ' name="' + nameValue + '"' : '') + '/></div>';
					}
					if (fieldType === "Select") {
						domContent += '<div class="field-control"><select' + (nameValue ? ' id="' + nameValue + '"' : '') + (nameValue ? ' name="' + nameValue + '"' : '') + '><option value="">-please select-</option>';
						if (optionsValue !== undefined) {
							for (var j = 0; j < optionsValue.length; j++) {
								domContent += '<option value="' + optionsValue[j].value + '">' + optionsValue[j].label + '</option>';
							}
						}
						domContent += '</select></div>';
					}
					if (fieldType === "Radio") {
						domContent += '<div class="col">';
						if (optionsValue !== undefined) {
							for (var j = 0; j < optionsValue.length; j++) {
								domContent += '<div class="field-item"><input' + (nameValue ? ' id="' + nameValue + j + '"' : '') + (nameValue ? ' name="' + nameValue + '"' : '') + ' type="radio" value ="' + optionsValue[j].value +'" class="radio"/><label' + (nameValue ? ' for="' + nameValue + j + '"' : '') + 'class="field-label">' + optionsValue[j].label + '</label></div>';
							}
						}
						domContent += '</div>';
					}
					if (fieldType === "Textarea") {
						domContent += '<div class="field-control"><textarea cols="3" rows="3"' + (nameValue ? ' id="' + nameValue + '"' : '') + (nameValue ? ' name="' + nameValue + '"' : '') + '></textarea></div>';
					}
				}
				domContent += '</div>';
			}
			domContent += '<div class="btn-block"><input type="submit" value="Submit" class="btn-submit"/></div></fieldset></form>';
			document.getElementById('content').innerHTML += domContent;
		}
	}
})();