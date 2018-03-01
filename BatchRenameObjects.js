#target Illustrator

var prefixText = "";
var suffixText = "";
var startNum = 1;
var objOrder = 0;
var selectedItems = app.activeDocument.selection;

if (selectedItems.length > 1){
	userInput ();
	renameSel (prefixText, suffixText, startNum, objOrder);
} else {
	alert("オブジェクトが選択されていません。");
}

function userInput(){
	var renamerWindow = new Window ("dialog", "Batch Object Renamer");
	var intro = renamerWindow.add ("statictext", [0,0,500,50], "選択中のオブジェクトの名称を変更します。\r接頭辞と接尾時に囲まれた部分はレイヤーパネルの順に従って数字が入力されます。", {multiline: true});
	renamerWindow.alignChildren = "left";

	var prefixGroup = renamerWindow.add ("group");
	var startNumGroup = renamerWindow.add ("group");
	var suffixGroup = renamerWindow.add ("group");
	var checkGroup = renamerWindow.add ("group");
	var buttonGroup = renamerWindow.add ("group");

	prefixGroup.add ("statictext", undefined, "接頭辞　:");
	prefixGroup.orientation = "row";
	var prefixBox = prefixGroup.add ("edittext", undefined, "[cdb-txt]NewObjectName_");
	prefixBox.preferredSize.width = 300;

	startNumGroup.add ("statictext", undefined, "開始番号:");
	startNumGroup.orientation = "row";
	var startNumBox = startNumGroup.add ("edittext", undefined, "1");
	startNumBox.preferredSize.width = 100;

	suffixGroup.add ("statictext", undefined, "接尾辞　:");
	suffixGroup.orientation = "row";
	var suffixBox = suffixGroup.add ("edittext", undefined, "");
	suffixBox.preferredSize.width = 300;

	var checkOrder = checkGroup.add ("checkbox", undefined, "逆順に採番");
	checkOrder.value = false;

	buttonGroup.alignment = "right";
	buttonGroup.add ("button", undefined, "Cancel");
	buttonGroup.add ("button", undefined, "OK");

	renamerWindow.onShow = function (){
		prefixBox.active = true;
	}

	renamerWindow.show();

	prefixText = prefixBox.text;
	suffixText = suffixBox.text;
	startNum = startNumBox.text;
	objOrder = checkOrder.value;

}

function renameSel (prefix, suffix, start, order){

	var num = selectedItems.length;

	if (isNumeric(start)) {
		var counter = start;

		if (order == 1) {
			counter = num;
			for (i = 0; num > i; i++){
				var currentObj = selectedItems[i];
				currentObj.name　= prefix + counter + suffix;
				//currentObj.selected = false;
				counter--;
			}
		} else {
			for (i = 0; num > i; i++){
				var currentObj = selectedItems[i];
				currentObj.name　= prefix + counter + suffix;
				//currentObj.selected = false;
				counter++;
			}
		}
	} else {
		for (i = 0; num > i; i++){
			var currentObj = selectedItems[i];
			currentObj.name　= prefix + suffix;
			//currentObj.selected = false;
		}		
	}
	redraw();
}

function isNumeric(n) {
	return !isNaN(parseFloat(n)) && isFinite(n);
}
