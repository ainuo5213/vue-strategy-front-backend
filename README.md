# vue-strategy-front-backend

### 代码格式化

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
