function attachClickEvents() {
	var elements = document.getElementsByClassName("delete-prod");
	for (i=0;i<elements.length;i++) {
		elements[i].onclick = function() {
			var tr = this.parentNode.parentNode;
			tr.parentNode.removeChild(tr);
		}
	}
}

function discardChanges() {
	var xmlhttp;
	
	if (window.XMLHttpRequest) {// code for IE7+, Firefox, Chrome, Opera, Safari
		xmlhttp=new XMLHttpRequest();
	}
	else {// code for IE6, IE5
		xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
	}
	
	xmlhttp.onreadystatechange=function() {
		if (xmlhttp.readyState==4 && xmlhttp.status==200)
		{
			var json_results = JSON.parse(xmlhttp.responseText);
			var table = document.getElementById("list_products");
			var tbody = table.getElementsByTagName("tbody")[0];
			tbody.innerHTML = "";
			for (i=0;i<json_results.products.length;i++) {
				var newTr = document.createElement("tr");
				if ((i+1) % 2 == 0) {
					newTr.className = "odd";
				}
				var tdCode = document.createElement("td");
				tdCode.innerHTML = json_results.products[i].code;
				newTr.appendChild(tdCode);
				
				var tdName = document.createElement("td");
				tdName.innerHTML = json_results.products[i].name;
				newTr.appendChild(tdName);
				
				var tdCategory = document.createElement("td");
				tdCategory.innerHTML = json_results.products[i].category;
				newTr.appendChild(tdCategory);
				
				var tdStock = document.createElement("td");
				tdStock.innerHTML = json_results.products[i].stock;
				newTr.appendChild(tdStock);
				
				var tdDeleteLink = document.createElement("td");
				tdDeleteLink.innerHTML = json_results.products[i].delete_link;
				newTr.appendChild(tdDeleteLink);
				
				tbody.appendChild(newTr);
			}
			
			attachClickEvents();
		}
	}
	
	if (xmlhttp.overrideMimeType) {
		xmlhttp.overrideMimeType("text/html; charset=ISO-8859-1");
	}
	xmlhttp.open("GET","results.json",true);
	xmlhttp.send();
}

attachClickEvents();

var discard_link_elem = document.getElementById("link_discard_deleted");
discard_link_elem.onclick = discardChanges;
//discard_link_elem.onclick = function() {
//	timer=window.clearInterval(timer);
//}

//timer = setInterval("discardChanges()", 5000);

