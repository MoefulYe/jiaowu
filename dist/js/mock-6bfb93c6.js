const i=["java","python","ml","dl","前端","后端"],o=["北京","上海","深圳","杭州"],t=async()=>(window.$loading.start(),new Promise(n=>setTimeout(()=>{window.$loading.finish(),n(o)},50))),e=async()=>(window.$loading.start(),new Promise(n=>setTimeout(()=>{window.$loading.finish(),n(i)},50))),s=["腾讯","阿里巴巴","百度","字节跳动","美团","京东","华为","网易","小米","滴滴"],a=async()=>(window.$loading.start(),new Promise(n=>setTimeout(()=>{window.$loading.finish(),n(s)},50)));export{e as a,a as b,t as f};
