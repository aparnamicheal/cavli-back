# Local Setup

## 1. Install NodeJS
Install nodejs v12.18.3. You can use [nvm](https://github.com/nvm-sh/nvm) or [asdf](https://asdf-vm.com/#/)

- Using nvm
  ```
    nvm install 12.18.3
  ```
- Using asdf
  ```
    asdf install node 12.18.3
  ```

## 2. Install the dependencies

  ```
    npm install
  ```


## 3. Set the environment variables
  ```
    in .env
  ```
## 4. Initialize local stack
  Note: You should have the [aws cli](https://docs.aws.amazon.com/cli/latest/userguide/install-cliv2.html) installed and configured for this to work.
  ```
    sh init_local_stack.sh
  ```
## 5. Run the application
  ```
    npm run dev
  ```
  Alternatively, you can select the 'App' configuration and click the Run button in the Run tab to launch the app in debug mode.

# Deployement
  create account in www.heroku.com
  install heroku locally
  login to heroku locally using
  ``` 
    heroku login
  ```
  create app using heroku
  ```
    heroku create <app_name>
  ```
  after creating app successfully
  do git operations
  ```
    git add.
    git commit -m "message"
    git push origin heroku
  ```
  this will automatically deploy app in a heroku dyno and it will start app by executing npm run start