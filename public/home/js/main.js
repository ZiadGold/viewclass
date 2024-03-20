var before = document.getElementById("before");
var liner = document.getElementById("liner");
var command = document.getElementById("typer"); 
var textarea = document.getElementById("texter"); 
var terminal = document.getElementById("terminal");

var git = 0;
var pw = false;
let pwd = false;
var commands = [];



window.addEventListener("keyup", enterKey);


//init
textarea.value = "";
command.innerHTML = textarea.value;

function enterKey(e) {
  if (e.keyCode == 181) {
    document.location.reload(true);
  }
  if (pw) {
    let et = "*";
    let w = textarea.value.length;
    command.innerHTML = et.repeat(w);
    
  } else {
    if (e.keyCode == 13) {
      commands.push(command.innerHTML);
      git = commands.length;

      addLine("kaka@viewkaka.com:~$ " + `<span style="color: #f0f2f2;">${command.innerHTML}</span>`, "no-animation", 0);
      commander(command.innerHTML.toLowerCase());
      command.innerHTML = "";
      textarea.value = "";
    }
    if (e.keyCode == 38 && git != 0) {
      git -= 1;
      textarea.value = commands[git];
      command.innerHTML = textarea.value;
    }
    if (e.keyCode == 40 && git != commands.length) {
      git += 1;
      if (commands[git] === undefined) {
        textarea.value = "";
      } else {
        textarea.value = commands[git];
      }
      command.innerHTML = textarea.value;
    }
  }
}

function commander(cmd) {
  const parts = cmd.split(' '); // Split the input into command and arguments
  const mainCommand = parts[0].toLowerCase(); // Extract the main command
  const args = parts.slice(1); // Extract the arguments (if any)

  switch (mainCommand) {
    case "login":
      if (args.length > 0) {
        // If there are arguments, handle them here
        // ;
        handleLoginCommand(args)
      //   Promise.all([handleLoginCommand(args), loading()]).then(() => {
      // });
      } else {
        loopLines(login_with_no_args, "color2 margin", 80);
      }
      break;
    
    case "logout":
      handleLogoutCommand(args)
      break;
    case "assignments":
      handleAssignmentsCommand(args)
      break;
    case "recaptcha":
      if (args.length > 0) {
        // If there are arguments, handle them here
        // ;
        handleRecaptchaCommand(args)
      //   Promise.all([handleLoginCommand(args), loading()]).then(() => {
      // });
      } else {
        loopLines(['Usage: <span style="color: #f0f2f2;">recaptcha</span> <span class="example">{what you heard}</span>'], "color2 margin", 80);
      }
      break;
  
    case "status":
      handleStatusCommand(args);
      break;
    case "play":
      handlePlayCommand(args);
      break;
    case "test":
      console.log("test");
      if (args.length > 0) {
        // If there are arguments, handle them here
        handleTestCommand(args);
      } else {
        loopLines(test, "color2 margin", 80);
      }
      break;

    case "help":
      loopLines(help, "color2 margin", 80);
      break;
    case "history":
      addLine("<br>", "", 0);
      loopLines(commands, "color2", 80);
      addLine("<br>", "command", 80 * commands.length + 50);
      break;
    case "clear":
      setTimeout(function() {
        terminal.innerHTML = '<a id="before"></a>';
        before = document.getElementById("before");
      }, 1);
      break;
    default:
      addLine("<span class=\"inherit\">Command not found. For a list of commands, type <span class=\"command\">'help'</span>.</span>", "error", 100);
      break;
  }
}


// Function to handle the "test" command with arguments
function handleTestCommand(args) {
  // Handle the arguments here
  loopLines(args, "color2 margin", 80);
  // You can perform different actions based on the arguments
}

function assignement_array(assignments) {
  function space(type, length) {
    spaces = 22 - length  + type
    var result_space = "";
    for (let i = 0; i < spaces; i++) {
      // Code to execute in each iteration
      result_space += " "
    }
    console.log(result_space)
    return result_space
  }

  function numspace(num) {
    let integerAsString = num.toString();

    let lengthOfInteger = integerAsString.length;


    spaces = 4 - lengthOfInteger
    
    var result_space = "";
    for (let i = 0; i <= spaces; i++) {
      // Code to execute in each iteration
      result_space += " "
    }
    console.log(result_space)
    return result_space
  }
  result_array = ['<br>', '#    Title                      Course                      Cutoff date                      Status']
  var num = 1
  var title;
  var course;
  var cutoff_date;
  var status;
  var color = "";
  while (num <= assignments.length) {
    color = "";
    title = assignments[num - 1]['title'];

    if (title.length > 20) {
      title = title.substring(0, 20); // Get the first 20 characters
    }
    course = assignments[num - 1]['course'];
    cutoff_date = assignments[num - 1]['cutoff_date'];
    
    if (assignments[num - 1]['action'] == "View") {status = "Solved"; color="lime"}
    else if (assignments[num - 1]['action'] == "Start") {status = "unsolved"; color="red"}
    else if (assignments[num - 1]['action'] == "") {status = "Ended"; color="red"}
    var line = `<span style="color: pink;">${num}</span>${numspace(num)}<span style="color: pink;">${title}</span>${space(5, title.length)}<span style="color: pink;">${course}</span>${space(6, course.length)}<span style="color: pink;">${cutoff_date}</span>${space(11, cutoff_date.length)}<span style="color: ${color};">${status}</span>`
    result_array.push(line)
    num = num + 1;
  }

  result_array.push('<br>')

  return result_array
  
}

function handleAssignmentsCommand(args) {
  // Handle the arguments here
  fetch('/assignments', {
    method: 'post',
    headers: new Headers({'Content-Type': 'application/json'}),
    body: JSON.stringify({
      args: args
    })
  })
  .then(res => res.json())
  .then(data => {
    console.log(data)
    result_array = assignement_array(data)
    console.log("-------")
    console.log(result_array)
    loopLines(result_array, "color2 margin", 80);
    
    

    // var array = assignement_array(data)

    // console.log(array);
    // loopLines(array, "color2 margin", 80);

      //loopLines([`<span style="color: lime;">Logged out successfully!</span>`], "color2 margin", 80);
  })
  // You can perform different actions based on the arguments
}

function handleLogoutCommand(args) {
  // Handle the arguments here
  fetch('/logout', {
    method: 'post',
    headers: new Headers({'Content-Type': 'application/json'}),
    body: JSON.stringify({
      args: args
    })
  })
  .then(res => res.json())
  .then(data => {
    console.log(data)
    if (data == true) {
      loopLines([`<span style="color: lime;">Logged out successfully!</span>`], "color2 margin", 80);
    }
  })
  // You can perform different actions based on the arguments
}



function loading() {
  loopLines([`<span class="example">Logging in. Please wait. </span> <span class="loaded"></span><span class="unloaded">█████████████████████████</span>`], "color2 margin", 80);
  
  // Define a counter variable
  let counter = 0;
  
  // Define a function to run the loop
  function runLoop() {
    // Execute the loop code
      
    // Get references to the loaded and unloaded spans
    var loadedSpan = document.querySelector('.loaded');
    var unloadedSpan = document.querySelector('.unloaded');

    // Remove one character from the unloaded span
    var unloadedText = unloadedSpan.textContent;
    unloadedText = unloadedText.substring(0, unloadedText.length - 1);
    unloadedSpan.textContent = unloadedText;

    // Add one character to the loaded span
    var loadedText = loadedSpan.textContent;
    loadedText += '█';
    loadedSpan.textContent = loadedText;
    
    // Increment the counter
    counter++;
    
    // Check if the loop should continue
    if (counter < 25 && document.querySelector('.loaded')) {
      // Schedule the next iteration of the loop after 0.8 seconds (800 milliseconds)
      setTimeout(runLoop, 320);
    } else {
      // After finishing the loop, remove the classes and add IDs
      loadedSpan.removeAttribute('class');
      unloadedSpan.removeAttribute('class');
      loadedSpan.setAttribute('id', 'loaded');
      unloadedSpan.setAttribute('id', 'unloaded');
    }
  }
  
  // Start the loop
  setTimeout(runLoop, 1000); // Start after 1 second (1000 milliseconds)
}



function handleRecaptchaCommand(args) {
  loopLines([`Please wait.`], "color2 margin", 80);
  var result = args.join(' ');

  console.log(result)

  fetch('/recaptcha', {
    method: 'post',
    headers: new Headers({'Content-Type': 'application/json'}),
    body: JSON.stringify({
      result: result
    })
  })
  .then(res => res.json())
  .then(data => {
    if (data == 0 || data == "0") {loopLines(['An <spanstyle="color: red;">ERROR</span> has occured, please report this to the developer. ID:2'], "color2 margin", 80);}
    else {
      if (data == 1 || data == "1") {
        loopLines([`<span style="color: lime;">Logged in successfully!</span>`], "color2 margin", 80);
      }
    }
  })
}



function handlePlayCommand(args) {
  loopLines([`Audio is playing.`], "color2 margin", 80);
  var audioUrl = localStorage.getItem('href'); // Replace with your audio URL
  var audio = new Audio(audioUrl);
  audio.play();
}


// Function to handle the "login" command with arguments
function handleLoginCommand(args) {
  loopLines([`<span class="example">Logging in. Please wait.`], "color2 margin", 80);
  fetch('/status', {
    method: 'post',
    headers: new Headers({'Content-Type': 'application/json'}),
    body: JSON.stringify({
        args: args
    })
  })
  .then(res => res.json())
  .then(data => {


    if (data == "0") {login(args)}
    else if (data == "1") {loopLines(['Service is <span style="color: orange;">unavailable</span>, it is currently being used by another user.'], "color2 margin", 80);}
    else if (data == "2") {loopLines(['Service is <span style="color: red;">unavailable</span>, There is an <span style="color: red;">error</span> within the system.'], "color2 margin", 80);}

  })

  function login(args) {

    fetch('/login', {
      method: 'post',
      headers: new Headers({'Content-Type': 'application/json'}),
      body: JSON.stringify({
          args: args
      })
    })
    .then(res => res.json())
    .then(data => {
      if (data == 0) {loopLines(login_with_no_args, "color2 margin", 80);}

      else {
        if (data["href"]) {
          localStorage.setItem('href', data["href"]);
          loopLines([`Enter the command <span class="command">play</span> and listen carefully to the audio then use <span class="command">recaptcha</span> <span class="example">{What you heard}</span>`], "color2 margin", 80);
        }
        else if (data == 1 || data == "1") {
          loopLines([`<span style="color: lime;">Logged in successfully!</span>`], "color2 margin", 80);
        }
        else if (data == 2 || data == "2") {
          loopLines([`<span style="color: red;">Loggin failed: Username or password incorrect</span>`], "color2 margin", 80);
        }
        else {
          loopLines(['An <spanstyle="color: red;">ERROR</span> has occured, please report this to the developer. ID:1'], "color2 margin", 80);
        }
        
      }

      
      
    })










  }
}

function handleStatusCommand(args) {
  fetch('/status', {
    method: 'post',
    headers: new Headers({'Content-Type': 'application/json'}),
    body: JSON.stringify({
        args: args
    })
  })
  .then(res => res.json())
  .then(data => {
    if (data == "0") {loopLines(['Service is <span style="color: lime;">available</span>'], "color2 margin", 80);}
    else if (data == "1") {loopLines(['Service is <span style="color: orange;">unavailable</span>, it is currently being used by another user.'], "color2 margin", 80);}
    else if (data == "2") {loopLines(['Service is <span style="color: red;">unavailable</span>, There is an <span style="color: red;">error</span> within the system.'], "color2 margin", 80);}
    
  })
}



function addLine(text, style, time) {
  var t = "";
  for (let i = 0; i < text.length; i++) {
    if (text.charAt(i) == " " && text.charAt(i + 1) == " ") {
      t += "&nbsp;&nbsp;";
      i++;
    } else {
      t += text.charAt(i);
    }
  }
  setTimeout(function() {
    var next = document.createElement("p");
    next.innerHTML = t;
    next.className = style;

    before.parentNode.insertBefore(next, before);

    window.scrollTo(0, document.body.offsetHeight);
  }, time);
}

function loopLines(name, style, time) {
  //console.log(name)
  name.forEach(function(item, index) {
    //console.log(item)
    //console.log(index)
    addLine(item, style, index * time);
  });
}
