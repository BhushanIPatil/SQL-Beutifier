function beautifySQL(){
  let sqlInput = document.getElementById("raw-sql").value;
  let indentSize = parseInt(document.getElementById("indent-size").value);

  if(!sqlInput.trim()){
    showToast("Please enter SQL code to beautify.", "error");
    return;
  }

  //Basic Formatting Rules
  const keywords = [
    "SELECT", "FROM", "WHERE", "GROUP BY", "ORDER BY", "INNER JOIN", "LEFT JOIN",
    "RIGHT JOIN", "JOIN", "ON", "AND", "OR", "INSERT", "UPDATE", "DELETE",
    "VALUES", "SET", "CREATE", "TABLE", "ALTER", "DROP", "UNION", "ALL", "DISTINCT"
  ]

  keywords.forEach(k => {
    const regex = new RegExp(`\\b${k}\\b`, 'gi');
    sqlInput = sqlInput.replace(regex, `\n${k}`);
  });

  // Clean multiple new lines
  sqlInput = sqlInput.replace(/\n+/g, '\n').trim();

  // Indentation based on user input
  const indent = " ".repeat(indentSize);

  // Indentation
  sqlInput = sqlInput
    .split("\n")
    .map(line => {
      line = line.trim();
      if (line.match(/^(FROM|WHERE|GROUP BY|ORDER BY|INNER JOIN|LEFT JOIN|RIGHT JOIN|JOIN|ON|AND|OR)/)) {
        return indent + line;
      }
      return line;
    })
    .join("\n");

    document.getElementById("formatted-sql").value = sqlInput.trim();
}

function copySQL(){
  const sqlInput = document.getElementById("raw-sql").value;
  if(!sqlInput.trim()){
    showToast("Please enter SQL code to copy.", "error");
    return;
  }

  const text = document.getElementById("formatted-sql");
  text.select();
  document.execCommand("copy");
  showToast("Formatted SQL copied to clipboard!", "success");
}

function showToast(message, type = "successs") {
  const container = document.getElementById("custom-toast-container");

  const toast = document.createElement("div");
  toast.classList.add("custom-toast", type);
  toast.innerText = message;

  container.appendChild(toast);

  //Remove toast after animation completes
  setTimeout(() => {
    toast.remove();
  }, 3000);
}