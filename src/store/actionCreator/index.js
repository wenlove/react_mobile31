//引入常量
import { CART_ADD, CART_CHECKED, CART_ALL_CHECK, CART_NUM_UPDATE, CART_NUM_DELETE } from '../actionTypes';

/**
 * 购物车新增商品
 * @param {Object} goodsObj 
 */
export const cartAdd = (goodsObj) => {
    return {
        type: CART_ADD,
        value: goodsObj
    }
}

/**
 * 购物车切换选中
 * @param {Number} id 
 */
export const cartAhecked = (id) => {
    return {
        type: CART_CHECKED,
        value: { id }
    }
}


/**
 * 实现全选功能
 * @param {Boolen} checked 全选按钮的状态
 */
export const cartAllAheck = (checked) => {
    return {
        type: CART_ALL_CHECK,
        value: { checked }
    }
}

/**
 * 购物车商品数量的更新
 * @param {Number} id 更新商品的id
 * @param {NUmber} init 数量添加还是减少
 */
export const cartNumUpdate = (id, init) => {
    return {
        type: CART_NUM_UPDATE,
        value: { id, init }
    }
}

/**
 * 根据id删除购物车数据
 * @param {Number} id 
 */
export const cartNumDelete = (id) => {
    return {
        type: CART_NUM_DELETE,
        value: { id }
    }
}