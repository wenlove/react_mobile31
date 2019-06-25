import { TabBar } from 'antd-mobile';
import React, { Component } from 'react';

//导入链接器
import { connect } from 'react-redux';

class Mylayout extends Component {
    render() {
        // console.log(this.props)
        return (
            <div style={{ position: 'fixed', height: '100%', width: '100%', top: 0 }}>
                <TabBar
                    unselectedTintColor="#949494"
                    tintColor="#33A3F4"
                    barTintColor="white"
                >
                    <TabBar.Item
                        title="首页"
                        key="Home"
                        icon={<span className="iconfont icon-home" />}
                        selectedIcon={<span className="iconfont icon-home" />}
                        selected={this.props.match.url === '/'}
                        onPress={() => this.props.history.push('/')}
                    >
                        {this.props.match.url === '/' ? this.props.children : null}
                    </TabBar.Item>
                    <TabBar.Item
                        icon={<span className="iconfont icon-gouwuche" />}
                        selectedIcon={<span className="iconfont icon-gouwuche" />}
                        title="购物车"
                        key="Cart"
                        badge={this.props.cartLength}
                        selected={this.props.match.url === '/Cart'}
                        onPress={() => this.props.history.push('/Cart')}
                    >
                        {this.props.match.url === '/Cart' ? this.props.children : null}
                    </TabBar.Item>
                    <TabBar.Item
                        icon={<span className="iconfont icon-weibiaoti2fuzhi12" />}
                        selectedIcon={<span className="iconfont icon-weibiaoti2fuzhi12" />}
                        title="我的"
                        key="Mine"
                        selected={this.props.match.url === '/Mine'}
                        onPress={() => this.props.history.push('/Mine')}
                    >
                        {this.props.match.url === '/Mine' ? this.props.children : null}
                    </TabBar.Item>

                </TabBar>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    // console.log(state.cartReducer.cartList.length)
    return {
        cartLength: state.cartReducer.cartList.length
    }
}

export default connect(mapStateToProps, null)(Mylayout);