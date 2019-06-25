import React, { Component, Fragment } from 'react';
//导入action
import { cartAhecked, cartAllAheck, cartNumUpdate, cartNumDelete } from '../store/actionCreator';
//  可以让我们的Home组件获取到路由信息对象 history 和match
import { withRouter } from "react-router-dom";
//导入链接器
import { connect } from 'react-redux';
//导入ant组件，导航栏NavBar，滑动操作SwipeAction、list，复选框CheckBox，对话框Modal
import { NavBar, Icon, SwipeAction, List, Checkbox, Modal } from 'antd-mobile';
const CheckboxItem = Checkbox.CheckboxItem;
const alert = Modal.alert;

class Cart extends Component {
    state = {}
    render() {
        return (
            <Fragment>
                {/* 导航栏 start */}
                <NavBar
                    mode="dark"
                    icon={<Icon type="left" />}
                    onLeftClick={() => this.props.history.go(-1)}

                >购物车</NavBar>

                {/* 导航栏 end */}

                {/* 购物车列表 start */}
                <div className="cart_content">
                    {
                        this.props.cartList.map(v =>
                            <div key={v.id}>
                                <List>
                                    <SwipeAction
                                        style={{ backgroundColor: 'gray' }}
                                        autoClose
                                        right={[
                                            {
                                                text: '取消',
                                                onPress: () => console.log('cancel'),
                                                style: { backgroundColor: '#ddd', color: 'white' },
                                            },
                                            {
                                                text: '删除',
                                                onPress: () => { this.props.handleCartDelete(v.id) },
                                                style: { backgroundColor: '#F4333C', color: 'white' },
                                            },
                                        ]}
                                    >

                                        <div className="goods_item">
                                            {/* 多选框 start */}
                                            <div className="goods_chk_wrap">
                                                <CheckboxItem checked={v.isChecked}
                                                    onChange={() => this.props.handleCartAhecked(v.id)}>
                                                </CheckboxItem>
                                            </div>
                                            {/* 多选框 end */}
                                            {/* 图片 start */}
                                            <div className="goods_img_wrap">
                                                <img src={v.img_url} alt="" />
                                            </div>
                                            {/* 图片 end */}
                                            {/* 价格 start */}
                                            <div className="goods_name_wrap">
                                                <div className="goods_title">{v.goods_name}</div>
                                                <div className="goods_price">
                                                    ￥{v.price}
                                                </div>
                                            </div>
                                            {/* 价格 end */}
                                            {/* 操作 start */}
                                            <div className="goods_num_wrap">
                                                <span onClick={() => this.props.handleCartNumUpdate(v.id, -1, v.num)}
                                                    className="iconfont icon-minus btn_substr"></span>
                                                <span className="goods_num">{v.num}</span>
                                                <span onClick={() => this.props.handleCartNumUpdate(v.id, 1)}
                                                    className="iconfont icon-plus btn_add"></span>
                                            </div>
                                            {/* 操作 end */}
                                            <style jsx>
                                                {`
                                                .goods_item{
                                                  display: flex;
                                                  padding: 5px;
                                                  .goods_chk_wrap{
                                                    flex:2;
                                                    display: flex;
                                                    justify-content: center;
                                                    align-items: center;
                                                  }  
                                                  .goods_img_wrap{
                                                    flex:2;
                                                    padding: 5px;
                                                  }
                                                  .goods_name_wrap{
                                                    flex:3;
                                                    display: flex;
                                                    justify-content: space-around;
                                                    align-items: center;
                                                    flex-direction: column;
                                                      .goods_title{
                                                        font-size: 16px;
                                                        font-weight: 400;
                                                      }
                                                      .goods_price{
                                                        font-size: 20px;
                                                        font-weight: 600;
                                                        color: orangered;
                                                      }
                                                  }
                                                  .goods_num_wrap{
                                                    flex:2;
                                                    display: flex;
                                                    justify-content: center;
                                                    align-items: center;
                                                    color: #666;
                                                    .btn_substr{
                                                       font-size: 20px; 
                                                    }
                                                    .goods_num{
                                                      padding: 0 5px;
                                                      color: #000;
                                                    }
                                                    .btn_add{
                                                      font-size: 20px;
                                                    }
                                                  }
                                                }
                                                `}
                                            </style>
                                        </div>
                                    </SwipeAction>
                                </List>
                            </div>
                        )
                    }
                </div>
                {/* 购物车列表 end */}
                <div className="btn_tool">
                    <div className="all_chk_wrap">
                        <CheckboxItem checked={this.props.allChecked}
                            onChange={this.props.handleCartAllCheck}>全选</CheckboxItem>
                    </div>
                    <div className="all_price_wrap">
                        合计<span className="total_price">￥{this.props.allPrice}</span>
                    </div>
                    <div className="pay_wrap">
                        去结算<span>({this.props.selectNums})</span>
                    </div>
                    <style jsx>
                        {`
                        .btn_tool{
                            position: fixed;
                            height: 50px;
                            bottom: 50px;
                            width: 100%;
                            background-color: #fff;
                            display: flex;
                            
                            .all_chk_wrap{
                                flex: 2;
                                display: flex;
                                justify-content: center;
                                align-items: center;
                            }
                            .all_price_wrap{
                                flex: 4;
                                display: flex;
                                justify-content: center;
                                align-items: center;
                                .total_price{
                                    font-size: 14px;
                                    font-weight: 600;
                                    color: orangered;
                                }
                            }
                            .pay_wrap{
                                flex: 3;
                                background-color: orangered;
                                color: #fff;
                                display: flex;
                                justify-content: center;
                                align-items: center;
                            }
                        }
                        `}
                    </style>
                </div>
            </Fragment>
        );
    }
}

//获取总价
function getTotalPrice(arr) {
    let sum = 0;
    arr.forEach(v => {
        //获取选中的商品，计算总价格
        v.isChecked && (sum += v.price * v.num);
        // if (v.isChecked) {
        //     sum += v.price * v.num;
        // }
    })
    return sum;
}

const mapStateToProps = (state) => {
    // console.log(state.cartReducer.cartList.length)
    let { cartList } = state.cartReducer;
    return {
        cartList,
        allChecked: cartList.length && cartList.every(v => v.isChecked),
        selectNums: cartList.filter(v => v.isChecked).length,
        allPrice: getTotalPrice(cartList)
    }
}

const mapDispatch = (dispatch) => {
    return {
        //多选
        handleCartAhecked: (id) => {
            // console.log(id)
            dispatch(cartAhecked(id))
        },
        //实现全选
        handleCartAllCheck: (e) => {
            let { checked } = e.target;
            // console.log(checked)
            dispatch(cartAllAheck(checked))
        },
        //更新购物车数据
        handleCartNumUpdate: (id, init, num) => {
            // 判断商品数量是否为1，并且执行减的操作
            if (init === -1 && num === 1) {
                alert('警告', '您确定删除吗?', [
                    { text: '取消', onPress: () => console.log('cancel') },
                    {
                        text: '删除', onPress: () => {
                            // 1 只需要传递id就可以了  删除数据
                            dispatch(cartNumDelete(id));
                        }
                    },
                ])
            }
            dispatch(cartNumUpdate(id, init));
        },
        //删除购物车数据
        handleCartDelete: (id) => {
            alert('警告', '您确定删除吗?', [
                { text: '取消', onPress: () => console.log('cancel') },
                {
                    text: '删除', onPress: () => {
                        // 1 只需要传递id就可以了  删除数据
                        dispatch(cartNumDelete(id));
                    }
                },
            ])
        }

    }
}

export default withRouter(connect(mapStateToProps, mapDispatch)(Cart));