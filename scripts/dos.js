// https://www.w3schools.com/howto/howto_js_trigger_button_enter.asp
var command = document.getElementById("commandbar")
command.addEventListener("keypress", function(event) {
  // If the user presses the "Enter" key on the keyboard
  if (event.key === "Enter") {
    // Cancel the default action, if needed
    event.preventDefault();
    // Log the reading value
    console.log(command.value)
  }
}); 
