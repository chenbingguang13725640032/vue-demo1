
import Vue from 'vue'
import App from './App'
import router from "./router/index"
import mintui from "mint-ui"
import 'mint-ui/lib/style.css'
import "./mui/dist/css/mui.min.css"
import "./assets/iconfont/iconfont.css"
import axios from "axios"
import Vuex from "vuex"

Vue.use(mintui)
Vue.use(Vuex)
import VuePreview from "vue-preview"
Vue.use(VuePreview)
//由于接口在后台设置了header，所以不用解决跨域问题，直接让axios的其默认地址等于端口地址
axios.defaults.baseURL = "http://www.liulongbin.top:3005"
Vue.prototype.$http = axios
Vue.prototype.lujin = function (url) {
    var header = document.getElementsByClassName("mint-header-title")[0];
    var num = 0;
    typeof (parseInt(url.slice(-2))) === "number" ? num = url.slice(-2) : undefined;
    setTimeout(() => {
        switch (url) {
            case "/Home":
                header.innerText = "陈炳光vue-webapp1"
                break;
            case "/Search":
                header.innerText = "search"
                break;
            case "/Shopcar":
                header.innerText = "shopcar"
                break;
            case "/Me":
                header.innerText = "me"
                break;
            case "/Home/Newslist":
                header.innerText = "newslist"
                break;
            case "/Home/Newslist/Newsinfo/" + num:
                header.innerText = "newsinfo"
                break;
            case "/Home/Photoslist":
                header.innerText = "photoslist"
                break;
            case "/Home/Photoslist/Photosinfo/" + num:
                header.innerText = "photosinfo"
                break;
            case "/Home/Goodslist/Goodsinfo/" + num:
                header.innerText = "goodsinfo"
                break;
            case "/Home/Goodslist":
                header.innerText = "Goodslist"
                break;
            case "/Home/Goodslist/Goodsinfo/Goodsdesc/" + num:
                header.innerText = "goodsdesc"
                break;
            case "/Home/Goodslist/Goodsinfo/Goodscomment/" + num:
                header.innerText = "goodscomment"
                break;
            default:
                header.innerText = "home"
        }

    }, 1);
}

var store = new Vuex.Store({
    state: {
        car: JSON.parse(localStorage.getItem("car") || "[]")
    },
    mutations: {
        addcar(state, goodsinfo) {
            var flag = false;
            state.car.some(item => {
                if (item.id == goodsinfo.id) {
                    item.count += parseInt(goodsinfo.count);
                    flag = true;
                    return true;
                }
            })
            if (flag === false) {
                state.car.push(goodsinfo);
            }
            localStorage.setItem("car", JSON.stringify(state.car))
        },
        updatecarcount(state, carcount) {
            state.car.some(item => {
                if (item.id == carcount.id) {
                    item.count = parseInt(carcount.count)
                    return true;
                }
            })
            localStorage.setItem("car", JSON.stringify(state.car))
        },
        caritemremove(state, id) {
            state.car.some((item, i) => {
                if (item.id == id) {
                    state.car.splice(i, 1);
                    return true;
                }
            })
            localStorage.setItem("car", JSON.stringify(state.car))
        },
        updatecarzhuangtai(state, carzhuangtai) {
            state.car.some(item => {
                if (item.id == carzhuangtai.id) {
                    item.zhuangtai = carzhuangtai.zhuangtai;
                    return true;
                }
            })
            localStorage.setItem("car", JSON.stringify(state.car))
        }
    },
    getters: {
        getallcount(state) {
            var num = 0;
            state.car.forEach(item => {
                num += parseInt(item.count)
            })
            return num;
        },
        getgoodscount(state) {
            var obj = {};
            state.car.forEach(item => {
                obj[item.id] = item.count;
            })
            return obj;
        },
        getzhuangtai(state) {
            var obj = {};
            state.car.forEach(item => {
                obj[item.id] = item.zhuangtai;
            })
            return obj;
        },
        getsum(state) {
            var obj = {
                num: 0,
                sum: 0
            }
            state.car.forEach(item => {
                obj.num += parseInt(item.count);
                obj.sum += item.count * item.price;
            });
            return obj;
        }
    }
})

// var store = new Vuex.Store({
//   state:{
//     car:JSON.parse(localStorage.getItem("car")||"[]")
//   },
//   mutations:{
//       //点击加入购物车
//     addtocar(state,goodsinfo){
//         var flag = false;
//             state.car.some(item=>{
//                 if(item.id === goodsinfo.id){
//                     item.count+=parseInt(goodsinfo.count);
//                     flag = true;
//                     return true;
//                 }
//             })
//         if(flag === false){
//             state.car.push(goodsinfo)
//         }  
//         localStorage.setItem("car",JSON.stringify(state.car))
//         },
//      //购物车组件点击加减操作，更新store里面的car里面的数据  
//      updateGoodsInfo(state,goodsinfo){
//        state.car.some(item=>{
//            if(item.id == goodsinfo.id){
//             item.count = parseInt(goodsinfo.count)
//             return true;
//            }
//        })
//        localStorage.setItem("car",JSON.stringify(state.car))
//      },
//      removeFormCar(state,id){
//         state.car.some((item,i)=>{
//             if(item.id == id){
//                 state.car.splice(i,1)
//                 return true;
//             }

//         })
//         localStorage.setItem("car",JSON.stringify(state.car))
//      },
//      updatazhuangtai(state,info){
//         state.car.some(item=>{
//             //同步store里面的每一个按钮的状态
//             if(item.id == info.id){
//                 item.zhuangtai = info.zhuangtai;
//                 return true;
//             }
//         })
//         localStorage.setItem("car",JSON.stringify(state.car))
//      }
//   },
//   getters:{
//     getallcount(state){
//         var num = 0;
//         state.car.forEach(item=>{
//             num = num + item.count
//         })
//         return num
//     },
//     getgoodscount(state){
//         var obj = {};
//         state.car.forEach(item=>{
//             //准备填充购物车组件中的numbox,每遍历一项car里面的一条数据就向空对象上添加car中的每一个id作为对象的键，并且把count作为
//             //每一个键对应的值{88:3,89:5}这样的对象格式
//             obj[item.id] = item.count
//         })
//         return obj;
//     },
//     getzhuangtai(state){
//         var obj = {}
//        state.car.forEach(item=>{
//            obj[item.id] = item.zhuangtai;
//            return true;
//        })
//        return obj;
//     },
//     getsum(state){
//         var obj = {
//             num:0,//勾选数量的总和
//             sum:0//总价
//         }
//         state.car.forEach(item=>{
//             if(item.zhuangtai === true){
//                 obj.num+=item.count;
//                 obj.sum+=item.count*item.price
//             }
//         })
//         return obj;
//     }
//   }
// })


  
var vm = new Vue({
    el: "#app",
    router,
    render: c => c(App),
    store
})
