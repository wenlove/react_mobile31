import React, { Component, Fragment } from 'react';
import { getGoodsInfo } from '../api';

//导入ant组件
import { NavBar, Icon, Carousel } from 'antd-mobile';

//导入链接器
import { connect } from 'react-redux';

//导入action
import { cartAdd } from '../store/actionCreator';

class GoodsDetail extends Component {
    state = {
        imgHeight: 176,
        imglist: [],
        goodsinfo: {}
    }

    componentDidMount() {
        let { id } = this.props.match.params;

        //根据id获取商品详情
        getGoodsInfo(id)
            .then(res => {
                // console.log(res.message)
                if (res.status === 0) {
                    this.setState({
                        imglist: res.message.imglist,
                        goodsinfo: res.message.goodsinfo
                    });
                }
            })
    }

    render() {
        // console.log(this.props.num)
        return (
            <Fragment>
                {/* 导航栏 start */}
                <NavBar
                    mode="dark"
                    icon={<Icon type="left" />}
                    onLeftClick={() => this.props.history.go(-1)}

                >商品详情</NavBar>

                {/* 导航栏 end */}

                {/* 轮播图 start */}
                <Carousel autoplay infinite >
                    {this.state.imglist.map(val => (
                        <a
                            key={val.id}
                            href="javascript:;"
                            style={{ display: 'inline-block', width: '100%', height: this.state.imgHeight }}
                        >
                            <img
                                src={val.thumb_path}
                                alt=""
                                style={{ width: '100%', verticalAlign: 'top' }}
                                onLoad={() => {
                                    // fire window resize event to change height
                                    window.dispatchEvent(new Event('resize'));
                                    this.setState({ imgHeight: 'auto' });
                                }}
                            />
                        </a>
                    ))}
                </Carousel>
                {/* 轮播图 end */}
                {/* 商品信息 start */}
                <div className="goods_info">
                    <div className="goods_title">{this.state.goodsinfo.title}</div>
                    <div className="goods_price">
                        <span className="sell_price">{this.state.goodsinfo.sell_price}</span>
                        <span className="market_price">{this.state.goodsinfo.market_price}</span>
                    </div>
                    <div className="goods_detail">
                        <div className="goods_detail_title">商品参数</div>
                        <div className="goods_detail_content">
                            <div className="goods_no"> 商品编号 :  {this.state.goodsinfo.goods_no} </div>
                            <div className="stock_quantity"> 商品库存 :  {this.state.goodsinfo.stock_quantity} </div>
                        </div>
                        <div className="add_time">上架时间 :  {this.state.goodsinfo.add_time}</div>
                    </div>
                    <div className="goods_product" dangerouslySetInnerHTML={{ __html: this.state.goodsinfo.content }}></div>

                    <style jsx>
                        {`
                        .goods_info{
                            .goods_title{
                                font-weight: 600;
                                font-size: 18px;
                            }
                            .goods_price{
                                display: flex;
                                // justify-content: space-between;
                                padding: 10px 0;
                                .sell_price{
                                    color: red;
                                    margin-right: 5px;
                                }
                                .market_price{
                                    text-decoration: line-through;
                                }
                            }
                            .goods_detail{
                                .goods_detail_title{
                                    padding: 5px 0;
                                    font-size: 16px;
                                    font-weight: 600;
                                }
                                .goods_detail_content{
                                    .goods_no {
                                        padding: 5px 0;
                                      }
                                      .stock_quantity {
                                        padding: 5px 0;
                                      }
                                }
                                .add_time{
                                    padding: 5px 0;
                                }
                            }
                            .goods_product{
                                margin-bottom:45px;
                            }
                        }
                    `}
                    </style>
                </div>
                {/* 商品信息 end */}

                {/* 底部工具栏 start */}
                <div className="btn_tool">
                    <div className="btn_item btm_cantact">
                        <span className="iconfont icon-kefu"></span>
                        <p>客服</p>
                    </div>
                    <a className="btn_item btm_cart" href="javascript:;" onClick={()=>this.props.history.push('/Cart')}>
                        <span className="iconfont icon-gouwuche"></span>
                        <p>购物车</p>
                        <span className="badge" style={{ display: this.props.cartLength ? "block" : "none" }} >
                            {this.props.cartLength}
                        </span>
                    </a>
                    <div className="btn_item btm_cart_add" onClick={() => this.props.handleCartAdd(this.state.goodsinfo)}> 加入购物车</div>
                    <div className="btn_item btm_buy">立即购买</div>
                    <style jsx>
                        {`
                        .btn_tool{
                            display: flex;
                            position: fixed;
                            bottom: 0;
                            height: 40px;
                            width: 100%;
                            background-color: #fff;
                            .btn_item{
                                display: flex;
                                flex: 1;
                                justify-content: center;
                                align-items: center;
                                flex-direction: column;
                            }
                            .btm_cart{
                                position: relative;
                               .badge{
                                    position: absolute;
                                    left: 60%;
                                    top: 0;
                                    border-radius: 50%;
                                    padding: 2px 5px;
                                    background-color: red;
                                    color: #fff;
                                    font-size: 12px;
                               } 
                            }
                            .btm_cart_add{
                                flex: 2;
                                background-color: orange;
                                color: #fff;
                                font-size: 16px;
                              }
                              .btm_buy{
                                flex: 2;
                                color: #fff;
                                font-size: 16px;
                                background-color: orangered;
                              }
                        }
                        `}
                    </style>
                </div>
                {/* 底部工具栏 end */}
            </Fragment>
        );
    }
}

const mapStateToProps = (state) => {
    // console.log(state.cartReducer.cartList.length)
    return {
        cartLength: state.cartReducer.cartList.length
    }
}

const mapDisPatch = (dispatch) => {
    return {
        handleCartAdd: (goodsObj) => {
            dispatch(cartAdd(goodsObj))
        }
    }
}

export default connect(mapStateToProps, mapDisPatch)(GoodsDetail);