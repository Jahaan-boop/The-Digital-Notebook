function clearpad(){
    if (confirm("Are you sure you want to clear the contents of the notepad?")) {
        document.getElementById("notepad").value = "";
    }
}

function add(){
        var note = document.getElementById("+note").value;
        var existingContent = document.getElementById("notepad").value;
        var updatedContent = existingContent + "\n" + note;
        document.getElementById("notepad").value = updatedContent;
}

document.getElementById("+note").addEventListener("keyup", function(event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        add();
    }
});

function addmap(){
            var mindmap =
              "                      (Edit Text)\n"+
              "                             |\n"+
              "        +--------------------+--------------------+\n"+
              "        |                                         |\n"+
              "   (Edit Text)                             (Edit Text)\n"+
              "        |                                         |\n"+
              "  +-----+-----+                            +------+-----+\n"+
              "  |           |                            |            |\n"+
              "(Edit Text) (Edit Text)           (Edit Text) (Edit Text)";
      
        var existingContent = document.getElementById("notepad").value;
        var updatedContent = existingContent + "\n\n" + mindmap;
        document.getElementById("notepad").value = updatedContent;
      }

      function savefile() {
        var noteContent = document.getElementById("notepad").value;
        var blob = new Blob([noteContent], {type: "text/plain;charset=utf-8"});
        var url = URL.createObjectURL(blob);
        var a = document.createElement("a");
        a.href = url;
        a.download = "notepad.txt";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      }

      function loadfile() {
  var input = document.createElement('input');
  input.type = 'file';
  input.accept = 'text/plain';
  input.onchange = () => {
    var file = input.files[0];
    var reader = new FileReader();
    reader.readAsText(file);
    reader.onload = () => {
      var content = reader.result;
      document.getElementById("notepad").value = content;
    };
  };
  input.click();
}

function mark() {
  var textarea = document.getElementById("notepad");
  var selectionStart = textarea.selectionStart;
  var selectionEnd = textarea.selectionEnd;
  var selectedText = textarea.value.substring(selectionStart, selectionEnd);
  var highlightedText = '*' + selectedText + '*';
  var newText = textarea.value.substring(0, selectionStart) + highlightedText + textarea.value.substring(selectionEnd);
  textarea.value = newText;
  textarea.scrollTop = textarea.scrollHeight;
}

function search() {
  var textarea = document.getElementById("notepad");
  var searchWord = document.getElementById("search").value;
  var searchText = textarea.value;
  var searchIndex = searchText.indexOf(searchWord);
  var highlightedText = "";
  var startIndex = 0;

  while (searchIndex !== -1) {
    var selectedText = searchText.substring(searchIndex, searchIndex + searchWord.length);
    highlightedText += searchText.substring(startIndex, searchIndex) + ':' + selectedText + ':';
    startIndex = searchIndex + searchWord.length;
    searchIndex = searchText.indexOf(searchWord, startIndex);
  }
  highlightedText += searchText.substring(startIndex);
  textarea.value = highlightedText;
}

function clearSearch() {
  var textarea = document.getElementById("notepad");
  var searchText = textarea.value;
  var clearedText = searchText.replace(/:/g, "");
  textarea.value = clearedText;
}

const buttons = document.querySelectorAll('.tooltips');

buttons.forEach(button => {
  const tooltipText = button.getAttribute('data-tooltip');
  const tooltip = document.createElement('div');
  tooltip.classList.add('tooltip');
  tooltip.textContent = tooltipText;
  document.body.appendChild(tooltip);

  button.addEventListener('mouseover', function() {
    tooltip.style.opacity = '1';
  });

  button.addEventListener('mouseout', function() {
    tooltip.style.opacity = '0';
  });

  button.addEventListener('mousemove', function(e) {
    tooltip.style.top = e.pageY + 10 + 'px';
    tooltip.style.left = e.pageX + 'px';
  });
});

function storeName() {
  const name = document.getElementById("name").value;
  localStorage.setItem("name", name);
  document.getElementById("notepad").textContent = `Author: ${name}`;
}

window.onload = function() {
  const name = localStorage.getItem("name");
  if (name) {
    document.getElementById("notepad").textContent = `Author: ${name}`;
  }
}

function clearName() {
  localStorage.removeItem("name");
  document.getElementById("greeting").textContent = "";
}

function opendiv() {
  const author = document.getElementById("author");
  if (author.style.display === "none") {
    author.style.display = "block";
  } else {
    author.style.display = "none";
  }
}