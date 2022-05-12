# vue-strategy-front-backend

### 代码规范

使用`vue-cli`提供的模板自带的`standard`的 eslint 规则，需要配合 prettier 的规则使用。使用规则如下：

1. vscode 安装 prettier 插件
2. 在项目根目录新建`.prettierrc`文件，内容如下：

```javascript
{
  "semi": false,
  "singleQuote": true,
  "trailingComma": "none",
  "tabWidth": 2
}
```

3. `.eslintrc.js`增加一行

```javascript
{
  ...,
  rules: {
    ...,
    'space-before-function-paren': 'off' // 关闭函数括号前的空格的规则
  }
}
```

4. vscode 设置 tabWidth 为 2，且保存文件时自动格式化文件

### git 提交规范

1. 全局安装 commitizen

```
npm install -g commitizen
```

2. 安装并配置`cz-customizable`插件
   自定义 git 提交规范

```
npm i cz-customizable
```

3. 添加以下配置到`package.json`中：

```json
...
"config": {
  "commitizen": {
    "path": "node_modules/cz-customizable"
  }
}
```

4. 在项目根目录创建`.cz-config.js`自定义提示文件：

   官方案例：[cz-config-EXAMPLE.js](https://github.com/leoforfree/cz-customizable/blob/master/cz-config-EXAMPLE.js)

```javascript
module.exports = {
  // 可选类型
  types: [
    { value: 'feat', name: 'feat:     新功能' },
    { value: 'fix', name: 'fix:      修复' },
    { value: 'docs', name: 'docs:     文档变更' },
    { value: 'style', name: 'style:    代码格式(不影响代码运行的变动)' },
    {
      value: 'refactor',
      name: 'refactor: 重构(既不是增加feature，也不是修复bug)'
    },
    { value: 'perf', name: 'perf:     性能优化' },
    { value: 'test', name: 'test:     增加测试' },
    { value: 'chore', name: 'chore:    构建过程或辅助工具的变动' },
    { value: 'revert', name: 'revert:   回退' },
    { value: 'build', name: 'build:    打包' }
  ],
  // 消息步骤
  messages: {
    type: '请选择提交类型:',
    customScope: '请输入修改范围(可选):',
    subject: '请简要描述提交(必填):',
    body: '请输入详细描述(可选):',
    footer: '请输入要关闭的issue(可选):',
    confirmCommit: '确认使用以上信息提交？(y/n/e/h)'
  },
  // 跳过问题
  skipQuestions: ['body', 'footer'],
  // subject文字长度默认是72
  subjectLimit: 72
}
```

5. 然后使用`git cz`替代`git commit`

### git hook

git hook 主要用来解决没有使用`git cz`命令而直接使用`git commit`

git hook 相当于`vue`的生命周期钩子函数类似，在某个执行阶段前做什么事

| Git Hook       | 调用时机                                                                                                                                           | 说明                               |
| :------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------- |
| **pre-commit** | `git commit`执行前<br />它不接受任何参数，并且在获取提交日志消息并进行提交之前被调用。脚本`git commit`以非零状态退出会导致命令在创建提交之前中止。 | 可以用`git commit --no-verify`绕过 |
| **commit-msg** | `git commit`执行前<br />可用于将消息规范化为某种项目标准格式。<br />还可用于在检查消息文件后拒绝提交。                                             | 可以用`git commit --no-verify`绕过 |

`git hook`主要用以上的两个钩子

1.  `husky+commitlint`检查提交描述是否符合规范要求

    [commitlint](https://github.com/conventional-changelog/commitlint)：用于检查提交信息

    [husky](https://github.com/typicode/husky)：是`git hooks`工具

2.  安装`commitlint`

    a. 安装依赖：

    ```
    npm install @commitlint/config-conventional @commitlint/cli -D
    ```

    b. 创建`commitlint.config.js`文件：

    ```
    echo "module.exports = {extends: ['@commitlint/config-conventional']}" > commitlint.config.js
    ```

    c. 增加配置：

    官方可配置的`rules`： [config-conventional 默认配置点击可查看](https://github.com/conventional-changelog/commitlint/blob/master/@commitlint/config-conventional/index.js)

    ```javascript
    module.exports = {
      // 继承的规则
      extends: ['@commitlint/config-conventional'],
      // 定义规则类型
      rules: {
        // type 类型定义，表示 git 提交的 type 必须在以下类型范围内
        'type-enum': [
          2,
          'always',
          [
            'feat', // 新功能 feature
            'fix', // 修复 bug
            'docs', // 文档注释
            'style', // 代码格式(不影响代码运行的变动)
            'refactor', // 重构(既不增加新功能，也不是修复bug)
            'perf', // 性能优化
            'test', // 增加测试
            'chore', // 构建过程或辅助工具的变动
            'revert', // 回退
            'build' // 打包
          ]
        ],
        // subject 大小写不做校验
        'subject-case': [0]
      }
    }
    ```

3.  husky 配置

    a. 安装 husky

    ```
    npm install husky -D
    ```

    b. 创建`.husky`文件夹

    ```
    npx husky install
    ```

    c. 在`package.json`中生成`prepare`指令

    ```
    npm set-script prepare "husky install"
    ```

    d. 执行 `prepare` 指令

    ```
    npm run prepare
    ```

    e. 添加 `commitlint` 的 `hook` 到 `husky`中，并指令在 `commit-msg` 的 `hooks` 下执行 `npx --no-install commitlint --edit "$1"` 指令

    ```
    npx husky add .husky/commit-msg 'npx --no-install commitlint --edit "$1"'
    ```

4.  `pre-commit`检测提交时的代码规范

    通过 **`husky` 监测 `pre-commit` 钩子，在该钩子下执行 `npx eslint --ext .js,.vue src`** 指令来去进行相关检测：

    a. 执行 `npx husky add .husky/pre-commit "npx eslint --ext .js,.vue src"` 添加 `commit` 时的 `hook` （`npx eslint --ext .js,.vue src` 会在执行到该 hook 时运行）

5.  `lint-staged`自动修复格式

    [lint-staged](https://github.com/okonet/lint-staged) 可以让你当前的代码检查 **只检查本次修改更新的代码，并在出现错误的时候，自动修复并且推送**

    a. 修改`package.json`配置：

    ```json
    "gitHooks": {
      "pre-commit": "lint-staged"
    },
    "lint-staged": {
        "src/**/*.{js,vue}": [
          "eslint --fix",
          "git add"
        ]
      }
    ```

    b. 修改`.husky/pre-commit`文件

    ```
    #!/bin/sh
    . "$(dirname "$0")/_/husky.sh"

    npx lint-staged

    ```
