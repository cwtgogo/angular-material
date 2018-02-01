### 引入material

1. 引入material npm包以及相关的包

   ```
   npm install @angular/material @angular/cdk 
   ```

2. 因为一些Angular Material组件依赖Angular animations模块，所以在使用Angular Material时需要安装@angular/animations模块(新建项目时会有，如果没有，在第一步中一起安装@angular/animations)，并且需要导入BrowserAnimationsModule
    ```
    import { BrowserModule } from '@angular/platform-browser';
    import { NgModule } from '@angular/core';

    import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
    import { AppComponent } from './app.component';

    @NgModule({
        declarations: [
            AppComponent
        ],
        imports: [
        BrowserModule,
          BrowserAnimationsModule
         ],
        providers: [],
            bootstrap: [AppComponent]
        })
        
    export class AppModule { }
    ```
   ```
3. 新建一个module统一管理material的module引入
   ```
   ng g module ebiz-material
   ```

3. 在app的根module中引入ebiz-material.module.ts

   ```typescript
   import { EbizMaterialModule } from './ebiz-material/ebiz-material.module';
   @NgModule({
       imports: [..., EbizMaterialModule],
       declarations: [
           ...
       ],
       schemas: [CUSTOM_ELEMENTS_SCHEMA]
   })
   ```
### 使用material组件

1. 首先在ebiz-material.module.ts中引入material组件的module，例如我们要用到[checkbox](https://material.angular.io/components/checkbox/overview)，那就引入MatCheckboxModule，引入之后再exports。

   ```typescript
   import { NgModule } from '@angular/core';
   import { CommonModule } from '@angular/common';
   import { MatCheckboxModule } from '@angular/material';

   @NgModule({
     imports: [CommonModule, MatCheckboxModule],
     declarations: [],
     exports: [ MatCheckboxModule ]
   })
   export class EbizMaterialModule { }

   ```

2. 在html文件中使用组件
  ```
   <mat-checkbox [(ngModel)]="checked">Check me!</mat-checkbox>
  ```
3. 此时会报错
   ```
   compiler.js:485 Uncaught Error: Template parse errors:
    Can't bind to 'ngModel' since it isn't a known property of 'mat-checkbox'.
    1. If 'mat-checkbox' is an Angular component and it has 'ngModel' input, then verify that it is part of this module.
    2. If 'mat-checkbox' is a Web Component then add 'CUSTOM_ELEMENTS_SCHEMA' to the '@NgModule.schemas' of this component to suppress this message.
    3. To allow any property add 'NO_ERRORS_SCHEMA' to the '@NgModule.schemas' of this component. ("<mat-checkbox [ERROR ->][(ngModel)]="checked">
      Check me!</mat-checkbox>"): ng:///AppModule/AppComponent.html@0:14
        at syntaxError (compiler.js:485)
        at TemplateParser.parse (compiler.js:24667)
        at JitCompiler._parseTemplate (compiler.js:34620)
        at JitCompiler._compileTemplate (compiler.js:34595)
        at eval (compiler.js:34496)
        at Set.forEach (<anonymous>)
        at JitCompiler._compileComponents (compiler.js:34496)
        at eval (compiler.js:34366)
        at Object.then (compiler.js:474)
        at JitCompiler._compileModuleAndComponents (compiler.js:34365)
   ```
   按照错误提示，在app.module.ts中引入CUSTOM_ELEMENTS_SCHEMA
      ```
    import { BrowserModule } from '@angular/platform-browser';
    import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
    
    import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
    import { AppComponent } from './app.component';
    import { MaterialModule } from './material/material.module';
    import { RouterModule } from '@angular/router';
    
    @NgModule({
      declarations: [
        AppComponent
      ],
      imports: [
        BrowserModule,
        BrowserAnimationsModule,
        MaterialModule,
        RouterModule.forRoot([
          {
            path: '',
            component: AppComponent
          }
        ])
      ],
      providers: [],
      bootstrap: [AppComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    export class AppModule { }
      ```





### 使用material内置theme以及自定义theme

1. material中的组件会根据theme的不同，会有不一样的样式呈现，但是这些样式的不同只局限于material组件内部，不会影响自定义组件的样式。
2. 在style.css文件中引入material预建主题(总共4个)

   ```scss
    @import '~@angular/material/prebuilt-themes/deeppurple-amber.css'; 
    @import '~@angular/material/prebuilt-themes/indigo-pink.css'; 
    @import '~@angular/material/prebuilt-themes/pink-bluegrey.css';  
    @import '~@angular/material/prebuilt-themes/purple-green.css'; 
   ```
    如果报下面这个错，只要将angular-cli的版本从1.6.4降低到1.6.3就可以解决
    ```
        ERROR in ./node_modules/css-loader?{"sourceMap":false,"import":false}!./node_modules/postcss-loader/lib?{"ident":"postcss","sourceMap":false}!./src/styles.css
        Module build failed: Error: Can't resolve '~@angular/material/prebuilt-themes/deeppurple-amber.css' in 'D:\ebizprise\material-demo\src'
    ```
3. 如果觉得这些主题不适合，可以自定义主题，在styles.css同级目录下新建一个theme.scss，并写上[自定义主题的内容](https://material.angular.io/guide/theming)

   ```scss
   @import '~@angular/material/theming';
   @include mat-core();
   $my-app-primary: mat-palette($mat-blue); 
   $my-app-accent: mat-palette($mat-teal, A200, A100, A400); 
   $my-app-warn: mat-palette($mat-red); 
   $my-app-theme: mat-light-theme($my-app-primary, $my-app-accent, $my-app-warn);
   @include angular-material-theme($my-app-theme);
   ```
   在style.css中引入theme.scss自定义主题,

   ```css
   @import './theme';
   ```
   此时会报下面这个错误
```
    ERROR in ./node_modules/css-loader?{"sourceMap":false,"importLoaders":1}!./node_modules/postcss-loader/lib?{"ident":"postcss","sourceMap":false}!./src/styles.css
    Module not found: Error: Can't resolve './theme' in 'D:\ebizprise\material-demo\src'
```
可以将全部的css文件修改为scss文件，并且在angular-cli.json文件中修改为
```
    "styleExt": "scss",
```
   也不能忘记angular-cli.json中引入style.css改为style.scss
5. 在步骤3中用到了一些颜色，例如$mat-blue，可以参考[这里](https://material.io/color/#!/?view.left=0&view.right=0)

6. 如果想要对某个组件进行主题特制，可以参考[这里](https://material.angular.io/guide/theming-your-components)

### 安装hammerjs(手势操作才需要)
1. 安装hammerjs
     ```
        npm install --save hammerjs
     ```
   ```
2. 在程序的入口(src/main.ts)引入hammerjs
   ```
   import 'hammerjs';
   ```

### 使用material-icon

1. install material-icon
   ```
   npm install material-design-icons
   ```
2. 在style.scss中引入material-icon图标库
   ```scss
        @import '~material-design-icons/iconfont/material-icons.css';
   ```
3. 在html的适当位置放上图标

   ```html
     <i class="material-icons">menu<i>
   ```

### 使用其他icon
1. 在[阿里图标库](www.iconfont.cn)新建一个项目demo,找到自己想要的图标加入项目，下载项目，重命名为iconfont。
2. 将iconfont文件夹复制到项目的assets文件夹下
3. 引入iconfont自定义图标
   ```scss
        @import 'assets/iconfont/iconfont.css';
   ```
4. 使用自定义图标
   ```html
    <i class="iconfont icon-home"></i>
   ```


   ​