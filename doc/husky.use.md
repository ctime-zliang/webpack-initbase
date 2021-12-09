# husky 配置

#### 使用 husky

-   安装 husky

    ```
    npm install husky -D
    
    npm install lint-staged -D
    ```
    
-   将 husky 安装到 git

    ```
    npx husky install
    ```

-   针对某一个 git hook 增加一条指令

    ```
    npx husky add .husky/[git-hook name] [script name in package.json]
    
    
    // 此命令将在 <rootDir>/.husky 下新建一条 pre-commit shell 脚本
    npx husky add .husky/pre-commit "npm run git:precommit"
    ```

-   增加 lint-stage 指令

    ```
    // 在 package.json 根层级中增加指令
    "lint-staged": {
    	"*.{js, ts, tsx, jsx}": [
    		"prettier:write-all",
    		"git add ."
    	]
    }
    ```

-   增加 npx 指令

    ```
    // 在 package.json scripts 中增加指令
    "git:precommit": "lint-staged"
    ```

    

