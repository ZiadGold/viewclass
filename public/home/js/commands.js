
help = [
  "<br>",
  '<span class="command">login</span>          Login to a viewclass account. Usage: <span style="color: #f0f2f2;">login</span> <span class="example">username</span> <span class="example">password</span>',
  '<span class="command">logout</span>         Logout from an account',
  '<span class="command">solve</span>          Solves an assignement. Usage: <span style="color: #f0f2f2;">solve</span> <span class="example">{title or #}</span>',
  '<span class="command">assignments</span>    Shows the list of assignments.',
  '<span class="command">play</span>           Plays the recaptcha audio.',
  '<span class="command">recaptcha</span>      Solves the audio recaptcha. Usage: <span style="color: #f0f2f2;">recaptcha</span> <span class="example">{what you heard}</span>',
  '<span class="command">status</span>         Check if this service is available or is being used by another user.',
  '<span class="command">history</span>        View command history',
  '<span class="command">help</span>           Shows this list',
  '<span class="command">clear</span>          Clear terminal',
  "<br>",
];



test = [
  "<br>",
  "#    Title                      Course                      Cutoff date                      Status",
  '<span style="color: pink;">1</span>    <span style="color: pink;">VOCABULARY. HW/WEEK2</span>       <span style="color: pink;">English</span>                     <span style="color: pink;">2024-03-17 23:59:00</span>              <span style="color: lime;">Solved</span>',
  '<span style="color: pink;">2</span>    <span style="color: pink;">online assignment 2</span>        <span style="color: pink;">Math</span>                        <span style="color: pink;">2024-03-26 09:35:00</span>              <span style="color: red;">Unsolved</span>',
  "<br>"
];


// test = [
//   '<br>',
// '#    Title                      Course                      Cutoff date                      Status',
// '<span style="color: pink;">1</span>    <span style="color: pink;">HW11.3</span>                 <span style="color: pink;">Biology</span>               <span style="color: pink;">2024-03-24 18:45:00</span>     <span style="color: red;">Unsolved</span>',
// '<span style="color: pink;">2</span>    <span style="color: pink;">Chemistry Chapter 13- Section 1 online assignment</span><span style="color: pink;">Chemistry</span>            <span style="color: pink;">2024-03-24 23:55:00</span>     <span style="color: red;">Unsolved</span>',
// '<span style="color: pink;">3</span>    <span style="color: pink;">VOCABULARY. HW/WEEK2</span>        <span style="color: pink;">English</span>               <span style="color: pink;">2024-03-17 23:59:00</span>     <span style="color: lime;">Solved</span>',
// '<span style="color: pink;">4</span>    <span style="color: pink;">online assignment 2</span>         <span style="color: pink;">Math</span>                  <span style="color: pink;">2024-03-26 09:35:00</span>     <span style="color: lime;">Solved</span>',
// '<span style="color: pink;">5</span>    <span style="color: pink;">online assignment 1</span>         <span style="color: pink;">Math</span>                  <span style="color: pink;">2024-03-19 09:23:00</span>     <span style="color: lime;">Solved</span>',
// '<span style="color: pink;">6</span>    <span style="color: pink;">GRAMMAR. HW/ WEEK2</span>          <span style="color: pink;">English</span>               <span style="color: pink;">2024-03-17 23:59:00</span>     <span style="color: lime;">Solved</span>',
// '<span style="color: pink;">7</span>    <span style="color: pink;">واجب 2</span>                      <span style="color: pink;">Arabic</span>                <span style="color: pink;">2024-03-18 08:17:00</span>     <span style="color: red;">Unsolved</span>',
// '<span style="color: pink;">8</span>    <span style="color: pink;">HW20.1+20.2</span>                 <span style="color: pink;">Biology</span>               <span style="color: pink;">2024-03-16 18:00:00</span>     <span style="color: lime;">Solved</span>',
// '<span style="color: pink;">9</span>    <span style="color: pink;">GRAMMAR. HW</span>                 <span style="color: pink;">English</span>               <span style="color: pink;">2024-03-10 23:59:00</span>     <span style="color: red;">Unsolved</span>',
// '<span style="color: pink;">10</span>   <span style="color: pink;">VOCABULARY. HW</span>               <span style="color: pink;">English</span>               <span style="color: pink;">2024-03-10 23:59:00</span>     <span style="color: red;">Unsolved</span>',
// '<span style="color: pink;">11</span>   <span style="color: pink;">واجب 1</span>                      <span style="color: pink;">Arabic</span>                <span style="color: pink;">2024-03-10 06:09:00</span>     <span style="color: lime;">Solved</span>',
// '<br>'

// ]

login_with_no_args = [
  "<br>",
  'You missed one or more arguments. Usage: <span style="color: #f0f2f2;">login</span> <span class="example">username</span> <span class="example">password</span>',
  "<br>",
]


// '<br>',
// '#   Title                      Course                      Cutoff date                      Status'
// '<span style="color: pink;">1</span>   <span style="color: pink;">HW11.3</span>                <span style="color: pink;">Biology</span>               <span style="color: pink;">2024-03-24 18:45:00</span>   <span style="color: red;">Unsolved</span>',
// '<span style="color: pink;">2</span>   <span style="color: pink;">Chemistry Chapter</span>     <span style="color: pink;">Chemistry</span>             <span style="color: pink;">2024-03-24 23:55:00</span>   <span style="color: red;">Unsolved</span>',
// '<span style="color: pink;">3</span>   <span style="color: pink;">VOCABULARY. HW/WEEK2</span>  <span style="color: pink;">English</span>               <span style="color: pink;">2024-03-17 23:59:00</span>   <span style="color: lime;">Solved</span>',
// '<span style="color: pink;">4</span>   <span style="color: pink;">online assignment 2</span>   <span style="color: pink;">Math</span>                  <span style="color: pink;">2024-03-26 09:35:00</span>   <span style="color: lime;">Solved</span>',
// '<span style="color: pink;">5</span>   <span style="color: pink;">online assignment 1</span>   <span style="color: pink;">Math</span>                  <span style="color: pink;">2024-03-19 09:23:00</span>   <span style="color: lime;">Solved</span>',
// '<span style="color: pink;">6</span>   <span style="color: pink;">GRAMMAR. HW/ WEEK2</span>    <span style="color: pink;">English</span>               <span style="color: pink;">2024-03-17 23:59:00</span>   <span style="color: lime;">Solved</span>',
// '<span style="color: pink;">7</span>   <span style="color: pink;">واجب 2</span>                <span style="color: pink;">Arabic</span>                <span style="color: pink;">2024-03-18 08:17:00</span>   <span style="color: red;">Unsolved</span>',
// '<span style="color: pink;">8</span>   <span style="color: pink;">HW20.1+20.2</span>           <span style="color: pink;">Biology</span>               <span style="color: pink;">2024-03-16 18:00:00</span>   <span style="color: lime;">Solved</span>',
// '<span style="color: pink;">9</span>   <span style="color: pink;">GRAMMAR. HW</span>           <span style="color: pink;">English</span>               <span style="color: pink;">2024-03-10 23:59:00</span>   <span style="color: red;">Unsolved</span>',
// '<span style="color: pink;">10</span>   <span style="color: pink;">VOCABULARY. HW</span>        <span style="color: pink;">English</span>               <span style="color: pink;">2024-03-10 23:59:00</span>   <span style="color: red;">Unsolved</span>',
// '<span style="color: pink;">11</span>   <span style="color: pink;">واجب 1</span>                <span style="color: pink;">Arabic</span>                <span style="color: pink;">2024-03-10 06:09:00</span>   <span style="color: lime;">Solved</span>',
// '<br>'