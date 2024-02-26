# C S 260 Notes

## GitHub 

### Pattern to Implement in my Development Process:
1. Pull repository's latest changes from GitHub
    - `git pull`
2. Make changes to the code
3. Commit the changes
    - `git commit`
    - To add a message: `git commit -m "message in quotes"`
4. Push the changes to GitHub
    - `git push`

### Other Important Git Commands:
- `git fetch`: Get latest information about repository on GitHub without actually changing the code in the local repository
- `git status`: See the difference between the clones and the main GitHub repository

### Other GitHub Features:
Forks:
Forks create a copy of a GitHub repository within Github (which allows one to experiment with that code) 

## AWS - EC2

### To Create an Instance:
1. Open AWS and log in
2. Navigate to EC2
3. Make sure region is US East (for using the class Amazon Machine Image (AMI))
4. Select `Launch Instance`
5. Give instance meaningful name (suggested format: \[owner]-\[purpose]-\[version])
6. Class AMI found by searching for `ami-0b009f6c56cdd83ed` under the Community tab
   - Has Ubuntu, Node.js, Caddy Server, and PM2 built in
7. Select instance type (depends on power and size)
8. Create key pair (**Save key pair to a safe place!**, e.g. not publically accessable or somewhere where it will get deleted accidentally)
9. Network settings:
   - `auto-assign public IP`: enabled
   - `Firewall security group`: select option `Create security group` for first time
   - Allow SSH traffic from `Anywhere`
   - Allow HTTPS traffic
   - Allow HTTP traffic
10. T3 class servers can change their `Credit Specification` to `Unlimited`
11. Select `Launch Instance`

Access instance with `http://[public IP address]`

### To SSH into Server:
Use the command `ssh -i [key pair file] ubuntu@[ip address]` in the terminal

Note: `[key pair file]` needs to be the entire path to the key pair file

If you get a warning about your file permissions being too loose, use `chmod  600 [key pair file]`

### Assigning an Elastic IP Address:
1. Open the AWS console in your browser and log in.
2. Navigate to the EC2 service.
3. From the menu on the left select Network & Security|Elastic IPs.
4. Press the Allocate Elastic IP address button.
5. Press the Allocate button.
6. Select the newly displayed allocated address and press the Actions button.
7. Select the Associate Elastic IP address option.
8. Click on the Instance box and select your server instance.
9. Press Associate.

Note: Assigning an elastic IP address will change the IP address for the server, but after this change, the IP address will not change again until you release the elastic IP address.

Having an elastic IP address means that your server will retain the same IP address, even if you stop it.

## AWS - Route53

### Purchasing a Domain Name:
1. Open AWS and log in
2. Navigate to Route53 service
3. Select `Domains > Registered domains`
4. Push the `Register Domain` button
5. Select the .TLD that you want (.click is currently $3)
6. Input desired root name and click `Check`. If it is available, great! If not, keep looking.
7. Push `Add to cart`
8. Fill out contact details
9. Push `Continue`
10. Review everything and `Complete Order`
11. Watch for verification email (if contact info in step 8 is new)

### Manage DNS Records:
Map domain names to IP addresses.

1. Open AWS and log in
2. Navigate to Route 53 service
3. Select `Hosted zones`
4. Make sure you see your domain (otherwise check if it is still pending)
5. Click domain name to see details (should have `NS` and `SOA`)
6. Create root domain DNS record
   1. Press `Create Record`
   2. In the *Value* box, enter the public IP address of your server
   3. Press `Create Record`
   4. You should see a new `A` record on the details page
7. Create a DNS record for any subdomain of your root domain
   1. Press `Create Record`
   2. In the *Record Name* box, enter `*`. (Wildcard represents any subdomain of your root domain name, as long as it is not explicitly defined by another DNS record)
   3. In the *Value* box, enter the public IP address of your server
   4. Press `Create Record`
   5. You should see yet another new `A` record on the details page
  
After creating the new records, you should be able to access your page using the domain name, e.g. http://musicards.click

## Caddy
1. In Caddy file in server, change `:80` and `yourdomainhere` to match my domain name
2. Enter command `sudo service caddy restart` to tell Caddy to restart
3. Now site will have https instead of just http

**Every site should be secure!** 

## HTML 

### Link References
Absolute:
`<a href="https://cs260.click/profile.png" />`
Relative:
`<a href="profile.png" />`
`<a href="../images/profile.png" />`

Note: Relative addresses are more maintainable (when they are within your own server)

| Element | Meaning |
| ---- | ---- |
| html | The page container |
| head | Header information |
| title | Title of the page |
| body | The entire content body of the page |
| header | Header content |
| main | Main content of the page |
| footer | Footer of the main content |
| section | A section of main content |
| div | A block division of content |
| span | An inline span of content |
| h<1-9> | Text heading. From h1, the highest level, down to h9, the lowest level |
| p | A paragraph of text |
| table | Table |
| ol,ul | Ordered or unordered list |
| a | Anchor the text to a hyperlink |
| img | Graphical image reference |

| Character | Entity |
| ---- | ---- |
| & | \&amp; |
| < | \&lt; |
| > | \&gt; |
| " | \&quot; |
| ' | \&apos; |
| 😀 | \&#128512; |

### Deploying Code to Production Environment:
Follow this pattern to use the deployFiles.sh executable in the terminal:
`./deployFiles.sh -k <yourpemkey> -h <yourdomain> -s startup`

## CSS
### CSS Styles:
- Can use "style" attribute within a specific element
- Can define within style tags in the head element (for types of elements in general; applies to all elements of that type in the document)
- Can link to a separate sheet ("stylesheet") where style is defined (also applies to all elements of that type in the document)

### Common Selectors
| Selector | Meaning | Example | Description |
| ---- | ---- | ---- | ---- |
| element | All elements of a specific name | p  <br>div | Any section that is a descendant of a body |
| ID | The element with the given ID | \#root | The element with the attribute id=’root’ |
| class | All elements with the given class | .highlight | Any element with the attribute class=’highlight’ |
| element class | Any elements with the specific name and class | p.highlight | Any p element with the attribute class=’highlight’ |
| List | Any of the given selectors | body,section | Body or section elements |
| Descendant | A list of descendants | body section | Any section that is a descendant of a body |
| Child | A list of direct children | section > p | Any p that is a direct child of a section |
| Pseudo | state based | p:hover | The mouse is hovering over a p element |

### Common Properties
| Property | Value | Example | Discussion |
| ---- | ---- | ---- | ---- |
| background-color | color | red | Fill the background color |
| border | color width style | \#fad solid medium | Sets the border using shorthand where any or all of the values may be provided |
| color | color | rgb(128, 0, 0) | Sets the text color |
| display | type | none | Defines how to display the element and its children |
| font | family size style | Arial 1.2em bold | Defines the text font using shorthand |
| margin | unit | 5px 5px 0 0 | Sets the margin spacing |
| padding | unit | 1em 2em | Sets the padding spacing |

### Common Units
| Unit | Description |
| ---- | ---- |
| px | The number of pixels |
| pt | The number of points (1/72 of an inch) |
| % | A percentage of the parent element |
| em | A multiplier of the width of the letter m in the parent's font |
| rem | A multiplier of the width of the letter m in the root's font |
| vw | A percentage of the viewport's width |
| vh | A percentage of the viewport's height |
| vmin | A percentage of the viewport's smaller dimension |
| vmax | A percentage of the viewport's larger dimension |

### Box Model
- Content
- Padding
- Border
- Margin

## JavaScript
### Some Basic Functions:
console.log()
```
console.log('hello %s', 'world');
// OUTPUT: hello world
console.log('%c JavaScript Demo', 'font-size:1.5em; color:green;');
// OUTPUT: JavaScript Demo //in large green text
```

timers
```
console.time('demo time');
// ... some code that takes a long time.
console.timeEnd('demo time');
// OUTPUT: demo time: 9762.74 ms
```

count()
```
console.count('a');
// OUTPUT: a: 1
console.count('a');
// OUTPUT: a: 2
console.count('b');
// OUTPUT: b: 1
```

### Adding JS to HTML
```
<head>
  <script src="javascript.js"></script>
</head>
<body>
  <button onclick="sayHello()">Say Hello</button>
  <button onclick="sayGoodbye()">Say Goodbye</button>
  <script>
    function sayGoodbye() {
      alert('Goodbye');
    }
  </script>
</body>
```

### Variables
- Use let or const
- Don't use var (depricated)

### Types
- Number
- String
- Boolean
- Null
- Undefined
- BigInt
- Symbol

Object Types:
- Object
- Function
- Date
- Array
- Map
- JSON

### Loops
for
```
for (let i = 0; i < 2; i++) {
  console.log(i);
}
// OUTPUT: 0 1
```

do while
```
let i = 0;
do {
  console.log(i);
  i++;
} while (i < 2);
// OUTPUT: 0 1
```

while
```
let i = 0;
while (i < 2) {
  console.log(i);
  i++;
}
// OUTPUT: 0 1
```

for in
```
const obj = { a: 1, b: 'fish' };
for (const name in obj) {
  console.log(name);
}
// OUTPUT: a
// OUTPUT: b

const arr = ['a', 'b'];
for (const name in arr) {
  console.log(name);
}
// OUTPUT: 0
// OUTPUT: 1
```

for of
```
const arr = ['a', 'b'];
for (const val of arr) {
  console.log(val);
}
// OUTPUT: 'a'
// OUTPUT: 'b'
```

### Strings
```
const s = 'Example:조선글';

console.log(s.length);
// OUTPUT: 11
console.log(s.indexOf('조선글'));
// OUTPUT: 8
console.log(s.split(':'));
// OUTPUT: ['Example', '조선글']
console.log(s.startsWith('Ex'));
// OUTPUT: true
console.log(s.endsWith('조선글'));
// OUTPUT: true
console.log(s.toLowerCase());
// OUTPUT: example:조선글
```

### Arrow Functions
```
  const arrow = () => 1; // No curly braces, so a return statement isn't necessary

  const arrowWithBlock = (a) => {
    a;
  }; // This will return undefined becuase there is no return statement

  const arrowWithReturn = (a) => {
    return a;
  };
```

### Array Functions
| Function | Meaning | Example |
| ---- | ---- | ---- |
| push | 	Add an item to the end of the array | 	a.push(4) | 
| pop | 	Remove an item from the end of the array | 	x = a.pop() | 
| slice | 	Return a sub-array | 	a.slice(1,-1) | 
| sort | 	Run a function to sort an array in place | 	a.sort((a,b) => b-a) | 
| values | 	Creates an iterator for use with a for of loop | 	for (i of a.values()) {...} | 
| find | 	Find the first item satisfied by a test function | 	a.find(i => i < 2) | 
| forEach | 	Run a function on each array item | 	a.forEach(console.log) | 
| reduce | 	Run a function to reduce each array item to a single item | 	a.reduce((a, c) => a + c) | 
| map | 	Run a function to map an array to a new array | 	a.map(i => i+i) | 
| filter | 	Run a function to remove items | 	a.filter(i => i%2) | 
| every | 	Run a function to test if all items match | 	a.every(i => i < 3) | 
| some | 	Run a function to test if any items match | 	a.some(i => 1 < 1) | 

### Rest
```
function hasNumber(test, ...numbers) {
  return numbers.some((i) => i === test);
}

hasNumber(2, 1, 2, 3);
// RETURNS: true
```

### Spread
```
function person(firstName, lastName) {
  return { first: firstName, last: lastName };
}

const p = person(...['Ryan', 'Dahl']);
console.log(p);
// OUTPUT: {first: 'Ryan', last: 'Dahl'}
```

