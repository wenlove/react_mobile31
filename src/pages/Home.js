import React, { Component, Fragment } from 'react';

//  可以让我们的Home组件获取到路由信息对象 history 和match
import { withRouter } from "react-router-dom";

import { Carousel } from 'antd-mobile';
//导入异步请求
import { getGoods, getGoodsGroup } from '../api';

class Home extends Component {
    state = {
        imgHeight: 176,
        sliderlist: [],//轮播图数据
        toplist: [],//推荐商品
        goodsGroup: []//商品列表
    }
    componentDidMount() {

        //获取轮播图数据和商品推荐
        getGoods()
            .then(res => {
                // console.log(res.message);
                if (res.status === 0) {
                    this.setState({
                        sliderlist: res.message.sliderlist,
                        toplist: res.message.toplist
                    });
                }

            });

        //获取商品列表
        getGoodsGroup()
            .then(res => {
                if (res.status === 0) {
                    // console.log(res.message);
                    this.setState({ goodsGroup: res.message });
                }
            });

    }
    render() {
        // console.log(this.state.toplist);
        return (
            <Fragment>
                {/* 轮播图 start */}
                <Carousel autoplay infinite>
                    {this.state.sliderlist.map(val => (
                        <a key={val.id}
                            href="javascript:void(0);"
                            onClick={()=>this.props.history.push("/GoodsDetail/"+val.id)}
                            style={{ display: 'inline-block', width: '100%', height: this.state.imgHeight }}
                        >
                            <img
                                src={val.img_url}
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
                {/* 商品推荐 start */}
                <div className="goods_recommend">
                    <div className="goods_recommend_title">推荐商品</div>
                    <div className="goods_recommend_content">
                        {
                            this.state.toplist.map(v => (
                                <a
                                    key={v.id} href="javascript:;"
                                    onClick={()=>this.props.history.push("/GoodsDetail/"+v.id)}
                                    className="goods_recommend_item">
                                    <div className="goods_recommend_img">
                                        <img src={v.img_url} alt="" />
                                    </div>
                                    <div className="goods_recommend_name">
                                        <p>{v.title}</p>
                                    </div>
                                </a>)
                            )
                        }
                    </div>
                    <style jsx>
                        {`
                            .goods_recommend {
                                .goods_recommend_title{
                                    background-color: #f5f5f5;
                                    padding: 10px;
                                    font-weight: 600;
                                }
                                .goods_recommend_content{
                                    background-color: #fff;
                                    .goods_recommend_item{
                                        display: flex;
                                        border-bottom: 1px solid #999;
                                        font-size: 13px;
                                        .goods_recommend_img{
                                            flex: 1;
                                            padding: 10px;
                                        } 
                                        .goods_recommend_name{
                                            flex: 7;
                                            align-items: center;
                                                display: flex;
                                                overflow: hidden;
                                            p {
                                                white-space: nowrap;
                                                text-overflow: ellipsis;
                                                overflow: hidden;
                                            }
                                        }
                                    }
                                }
                            }
                        `}

                    </style>
                </div>
                {/* 商品推荐 end */}

                {/* 商品列表 start */}
                <div className="goods_group">
                    {
                        this.state.goodsGroup.map(v1 => (
                            <div key={v1.level1cateid} className="goods_group_item">
                                <div className="goods_group_item_title">{v1.catetitle}</div>
                                <div className="goods_group_item_content">
                                    {
                                        v1.datas.map(v2 => (
                                            <a href="javascript:;"
                                                key={v2.artID}
                                                onClick={() => this.props.history.push('/GoodsDetail/' + v2.artID)}
                                                className="goods_item">
                                                <img src={v2.img_url} alt="" />
                                                <div className="artTitle">{v2.artTitle}</div>
                                                <div className="goods_price">
                                                    <span className="sell_price">{v2.sell_price}</span>
                                                    <span className="market_price">{v2.market_price}</span>
                                                </div>
                                                <div className="goods_num">
                                                    热卖中 <span className="stock_quantity">{v2.stock_quantity}</span>
                                                </div>
                                            </a>)
                                        )
                                    }
                                </div>
                            </div>)
                        )
                    }
                    <style jsx>
                        {`
                            .goods_group_item {
                                .goods_group_item_title{
                                    background-color: #f5f5f5;
                                    padding: 10px;
                                    font-weight: 600;
                                }
                                .goods_group_item_content{
                                    display:flex;
                                    flex-wrap: wrap;
                                    background-color: #fff;
                                    .goods_item{
                                        width: 50%;
                                        border-bottom: 1px solid #999;
                                        padding: 10px;
                                        &:nth-child(odd){
                                            border-right: 1px solid #999;
                                        }
                                        .artTitle{
                                            font-size: 15px;
                                            display: -webkit-box;
                                            overflow: hidden;
                                            white-space: normal!important;
                                            text-overflow: ellipsis;
                                            word-wrap: break-word;
                                            -webkit-line-clamp: 2;
                                            -webkit-box-orient: vertical; 
                                        }
                                        .goods_price{
                                            padding: 8px 0;
                                            display: flex;
                                            justify-content: space-between;
                                            .sell_price{
                                                color: red;
                                                font-size: 15px;
                                            }
                                            .market_price{
                                                text-decoration: line-through;
                                                font-size: 14px;
                                            }
                                        }
                                        .goods_num{
                                            font-size: 14px;
                                            span {
                                                font-size: 15px;
                                            }
                                        }
                                    }
                                }
                            }
                        `}
                    </style>
                </div>
                {/* 商品列表 end */}
            </Fragment>
        );
    }
}

export default withRouter(Home);