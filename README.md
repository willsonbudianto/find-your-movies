Hi, welcome to Find Your Movies Repository by Willson Budianto!
Let me introduct this repository first

# This repository used React + TypeScript + Vite

## important

First of all, you must fork this repository to your own repository/project in github.
Second of all, you must have node.js version 20 (if you have nvm, write 'nvm use' in your repository terminal that make sure you're using node 20)

After that you can following this steps:

1. Clone the repository to your own device
2. Open folder 'find-your-movies' on your vscode and open new vscode terminal using (ctrl + shift + `)
3. Setup new remote that base to willsonbudianto github, so you can get any update from me (check your remote with 'git remote -v' on your vscode terminal to know what remote that you had)
4. You can add it by git remote add {your_remote_name} https://github.com/willsonbudianto/find-your-movies.git
5. Then fetch my remote first so you can get any updates from my repository
6. Make a branch from my repository master
7. Write 'nvm use' on vscode terminal to make sure you are using node version 20 on your vscode
8. Write 'npm ci' and 'npm i' on your vscode terminal so you can install all of package that's contain in this repository
9. Make new file below .env.development named as .env.development.local (it's a must because vite read .env.development when developing, and if you want vite read your local .env you must use .env.development.local) using .env.development template (change port with your own port, default port is 4500)
10. Make new file below config.development.js named as config.ts using config.development.ts template (make sure to change assetURL {your_local_port} to your own port, example: http://localhost:4500/assets/)
11. Write 'npm run dev' on your vscode terminal
12. Open your browser (i'm using google chrome)
13. Write your localhost:{your_own_port} to open the website
14. You can see the program now, happy explore

Thank you for read and fork this repository!
