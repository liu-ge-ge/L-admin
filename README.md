# <div style="color:red;text-align:center">:loudspeaker:L后台管理系统:wrench:</div>

### 项目使用技术
- vue3
- typescript
- vue-router
- pinia
- axios
- eslint
- prettier
- antdvue
- vue-i18n
- less
- vite


> 项目目录结构
```
|-- src
    |-- api //请求接口
    |-- mock //模拟数据
    |-- router //路由
    |-- assets //静态文件
    |-- components //公共组件
    |-- store // pinia状态管理
    |-- local //国际化
    |-- views //页面
    |-- utils //工具文件夹
       |-- request.ts axios
    |-- App.vue //入口vue文件
    |-- main.ts //vue 入口
    |-- vite-env.d.ts //vite自动生成 声明文件
```



```教训
0 == '00'
1 == '01'

```


#### 系统权限
---- 除了 '/','home','login','异常页面' 其它的meta都要配置permission 没有权限设置空字符串
> 路由权限:<span style="color:red;">由配置的meta--> permission</span>
``` javascript
getUserInfo:{
    roles:[],//名称
    sexName:'',//性别
    buttons:[],//按钮权限btn:页面:类型
    routeList:[],//动态路由列表
    routes:[]   //权限集 如果meta里面有permission但是这个里面没有就不会显示这个路由
}
```