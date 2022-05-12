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
