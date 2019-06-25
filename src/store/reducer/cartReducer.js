//引入常量
import { CART_ADD, CART_CHECKED, CART_ALL_CHECK, CART_NUM_UPDATE, CART_NUM_DELETE } from '../actionTypes';


const defalutState = {
    cartList: [
        {
            // 商品的id
            id: 110,
            // 单价
            price: 100,
            // 数量
            num: 1,
            // 名称
            goods_name: "手机",
            // 图片的路径
            img_url: "http://react.zbztb.cn/upload/201504/20/thumb_201504200119256512.jpg",
            isChecked: false
        },
        {
            // 商品的id
            id: 120,
            // 单价
            price: 100,
            // 数量
            num: 2,
            // 名称
            goods_name: "手机",
            // 图片的路径
            img_url: "http://react.zbztb.cn/upload/201504/20/thumb_201504200119256512.jpg",
            isChecked: false
        },
        {
            // 商品的id
            id: 130,
            // 单价
            price: 100,
            // 数量
            num: 3,
            // 名称
            goods_name: "手机",
            // 图片的路径
            img_url: "http://react.zbztb.cn/upload/201504/20/thumb_201504200119256512.jpg",
            isChecked: false
        }
    ]
}

export default (state = defalutState, action) => {
    // console.log(action)
    let newState = JSON.parse(JSON.stringify(state));
    switch (action.type) {
        case CART_ADD: {
            // console.log(newState);
            let goodsObj = action.value;
            //根据id判断数组是否存在接收过来的对象
            const index = newState.cartList.findIndex(v => v.id === goodsObj.id);

            //如果不存在,则创建新的对象，并把对象追加到数组中
            if (index === -1) {
                let newGoods = {
                    id: goodsObj.id,
                    price: goodsObj.sell_price,
                    num: 1,
                    goods_name: goodsObj.title,
                    img_url: goodsObj.img_url,
                    isChecked: true
                }
                newState.cartList.push(newGoods);
            } else {
                //如果存在，则该索引对应对象的num++
                newState.cartList[index].num++;
            }
            return newState;
        }
        case CART_CHECKED: {
            /**
             * 根据id获取数组中对象的属性isChecked,改变此属性达到选中效果
             */
            let index = newState.cartList.findIndex(v => v.id === action.value.id);
            newState.cartList[index].isChecked = !newState.cartList[index].isChecked;
            return newState;
        }
        case CART_ALL_CHECK: {
            newState.cartList.forEach(v => v.isChecked = action.value.checked);
            return newState;
        }
        case CART_NUM_UPDATE: {
            let index = newState.cartList.findIndex(v => v.id === action.value.id);
            newState.cartList[index].num += action.value.init;
            return newState;
        }
        case CART_NUM_DELETE: {
            //删除购物车数据
            let index = newState.cartList.findIndex(v => v.id === action.value.id);
            newState.cartList.splice(index, 1);
            console.log(newState.cartList)
            return newState;
        }
        default:
            break;
    }
    return state;
}