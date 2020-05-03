<template>
	<view class="user">
		<view class="content">
			<!-- #ifdef MP-WEIXIN -->
			<fishWx ref = "fishWx"  :fishsum="myFish(fishsum)"  :bospeed="2" :fishmaxspeed="3" ></fishWx>
			<!-- #endif -->
			<!--  #ifdef H5 -->
			<fish ref = "fish"  :fishsum="myFish(fishsum)"  :bospeed="2" :fishmaxspeed="3" ></fish>
			<!-- #endif -->
		</view>
		<!-- <view class="fish-button" v-if="hasLogin"> -->
		<view class="fish-button">
			<view class="my-fish">
				<p>我的小鱼</p>
				<p>{{myFish(fishsum)}}</p>
			</view>
			<button type="" @click="sell(1)" class="sell">卖小鱼</button>
			<button type="" @click="bug(1)" class="bug">买小鱼</button>
		</view>
		
		<view class="center_menu">
			<view class="menu_item" v-for="item in menus" :key="item.key" @tap="menuTap(item.key)">
				<image :src="item.icon" mode="aspectFill"></image>
				<text>{{item.name}}</text>
			</view>
		</view>
		
		<view class="btn-row">
			<button v-if="!loginToOut" type="primary" class="primary" @tap="bindLogin">登录</button>
			<button v-if="loginToOut" type="default" class="primary" @tap="bindLogout">退出登录</button>
		</view>
	</view>
</template>

<script>
	import {
		mapState,
		mapMutations
	} from 'vuex'
	import fish from "@/components/xiaodiu-fish-h5/xiaodiu-fish.vue"
	import fishWx from "@/components/xiaodiu-fish-wx/xiaodiu-fish.vue"
	export default {
		data () {
		   return {
		    fishsum: 8,
			loginToOut:true,
			menus: [{
						name: '我的收藏',
						icon: '../../static/fumou-center-template/5.png',
						key: 1,
					},
					{
						name: '签到',
						icon: '../../static/fumou-center-template/6.png',
						key: 2,
					},
					{
						name: '功能介绍与反馈',
						icon: '../../static/fumou-center-template/7.png',
						key: 3,
					},
				]
			
		   }
		},
		computed: {
			...mapState(['hasLogin', 'forcedLogin','userName']),
		},
		components: {fish,fishWx},
		methods: {
			...mapMutations(['logout']),
			bindLogin() {
				uni.navigateTo({
					url: '../login/login',
				});
			},
			
		
			/*
			*退出登录
			*/
			
			bindLogout() {
				this.logout();
				/**
				 * 如果需要强制登录跳转回登录页面
				 */
				console.log("success")
				uni.removeStorage({
				    key: 'USERS_KEY',
				    success: function (res) {
				        console.log('success');
				    }
				});
				if (this.forcedLogin) {
					uni.reLaunch({
						url: '../login/login',
					});
				}
			},
			bug() {
				this.fishsum++;
				// #ifdef MP-WEIXIN
				 this.$refs.fishWx.addfish(1)
				 // #endif
				 // #ifdef H5
				 this.$refs.fish.addfish(1)
				 // #endif
			},
			sell() {
					
				if (this.fishsum !== 0){
					this.fishsum--;
				}
				else {
					uni.showToast({
						title:"您已经没有小鱼了哦~",
						icon:"none"
					})
				}
				// #ifdef MP-WEIXIN
				 this.$refs.fishWx.reducefish(1)
				 // #endif
				 // #ifdef H5
				 this.$refs.fish.reducefish(1)
				 // #endif
			},
			myFish(fishsum) {
				// #ifdef MP-WEIXIN
					return fishsum
				// #endif
				
				// #ifdef H5
					return fishsum
				// #endif
			}
			,menuTap(key) {
				if (key === 1) {
					uni.navigateTo({
						url: '../favorite/favorite',
					});
				}
				else if (key === 2) {
					uni.navigateTo({
						url: '../Calendar/Calendar',
					});
				}
				else if (key === 3) {
					uni.navigateTo({
						url: '../feedback/feedback',
					});
				}
			}
		},
		mounted() {
			console.log(uni.getStorageSync('USERS_KEY'))
			this.loginToOut = uni.getStorageSync('USERS_KEY').length>0
		}
			
	}
</script>

<style scoped lang="less">
	.user {
		position: relative;
		width: 100%;
		background: #fff;
		.uni-page-head-btn {
			display: block !important;
		}
	}
	.btn-row {
		// display: inline-block;
		// position: absolute;
		// top: 0px;
		// left: 290upx;
		// margin-top: 0px;
		// padding: 10px;
		.primary {
			// font-size: 30upx;
			// border-radius: 50%;
			// width: 130upx;
			// height: 130upx;
			// line-height: 130upx;
		}
	}	
	.content {
		width: 100%;
		padding: 0;
		overflow: hidden;
		z-index: 998;
		/* position: absolute;
		bottom: 0; */
	}
	.fish-button {		
		z-index: 999;
		display: flex;
		background: #fff;
		margin-top: 20upx;
		width: 100%;
	}
	.bug {
		width: 20%;
		font-size: 20upx;
		line-height: 64upx;
		border-radius: 35upx;
		border: none;
		background: #ff9700;
		// background: rgba(252s, 135, 29, 1);
		color: #fff;
	}
	.sell {
		width: 20%;
		font-size: 20upx;
		line-height: 64upx;
		border-radius: 35upx;
		border: none;
		background: #ff6666;
		color: #fff;
	}
	.my-fish {
		font-size: 25upx;
		width: 30%;
		display: flex;
		flex-direction:column
	}
	.my-fish p {
		text-align:center
	}
	.center_menu {
			width: 100%;
			display: inline-block;
			background: #fff;
			.menu_item {
				font-size: 28upx;
				letter-spacing: 1px;
				padding: 14px 5%;
				background: #FEFEFE;
				overflow: hidden;
				box-sizing: border-box;
				display: flex;
				align-items: center;
				position: relative;
				border-bottom: 1px solid #EFEFEF;
	
				&:hover {
					background: #F6F6F6 !important;
				}
	
				&::after {
					content: '';
					width: 30upx;
					height: 30upx;
					position: absolute;
					right: 5%;
					background: url('../../static/fumou-center-template/right.png') no-repeat;
					background-size: 100%;
				}
	
				text:nth-of-type(1) {
					margin-left: 10px;
				}
	
				image {
					width: 40upx;
					height: 40upx;
				}
	
				&:nth-of-type(4) {
					margin-top: 10px;
				}
			}
		}
	
	/* 
		
	.xd-drift{
		overflow: hidden;
		left: 0upx;
		position: absolute;
		top: 0px;
		margin-bottom: ;
	}
		
	.drift-bo2{
		margin-bottom:35px;
	} */
</style>
