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
