# Project to learn prisma

## Installation 
You can use a 'git clone' to clone the repository
```
git clone <repo url>
```
After that, do the command below
```
npm install
```
### Maybe you have to install some dev dependencies too, if it isn't installed with npm install
```
npm i -D @types/cors @types/express @types/node prisma tsx typescript
```
After, clone the file `.env.example` to `.env`:
```bash
cp .env.example .env
```
And change the enviroment variables
### In the .env file, you need to put your database url

### 
## How to use
To run the project, use:
```bash
npm run dev
```

## Additional
If you want, you can remove`origin` of repository, to add your own repository and continue the development

To see the remote repositories:
```bash
git remote -v
```

To change the origin:
```bash
git remote remove origin
git remote add origin <url>
```
The `<url>` is the directory of your repository.
