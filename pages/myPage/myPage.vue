<template>
	<view class="page_edu" >
		<view class="page_edu_header">
			<view class="header_content">
				<view class="left">
					<text class="title">{{menu.title}}
						<image v-if="menu.collect_status" src="../../static/img/collect.png" @click="calWord"></image>
						<image v-else src="../../static/img/uncollect.png" @click="calWord"></image>
					</text>
					
				</view>
				<view class="right">
						<image src="../../static/img/eye.png"></image>
					<text class="title">	
						{{menu.clickNum}}
					</text>
				</view>
			</view>
		</view>
		<view class="page_content">
			<view class="menu">
				<view class="intro title_m">
					{{menu.desc}}
				</view>
				<br>
			</view>
			<view class="menu">
				<view class="introduction title_m">
					{{menu.content}}
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import uniRequest from 'uni-request';
	import service from '../../service.js';
	const BASE_URL = 'http://www.lexicon.com/';
	const VALIUSER = service.getUsers();
	export default {
		data() {
			return {
				id: null,
				menu: {

					// clickNum: 2,
					// content: "n  1.  (Computer Science) (usually capital) a system of open source peer-to-peer software for the creation and exchange of (payment in) a certain type of cryptocurrency; the first such system to be fully functional  2.  (Currencies) (sometimes capital) the cryptocurrency created and exchanged using this software",
					// createTime: "2020-02-15 15:50:05",
					// desc: "Related to bitcoin: Bitcoin mining, Bitcoin wallet, Bitcoin miner",
					// id: 53,
					// key: "bitcoin",
					// likeNum: 2,
					// link: "https://www.thefreedictionary.com/bitcoin",
					// sort: 0,
					// stepNum: 0,
					// title: "bitcoin",
					// type: 1,
				}
			}
		},
		methods: {
				
			calWord(){
				var that = this
				var  DATA = {
						sid: 0,
						id: this.id
					}
				if(VALIUSER[0]){
					DATA = {
						sid: VALIUSER[0].sid,
						id: this.id
					}
				}
				console.log('calword')
				if(DATA.sid === 0){
					uni.showToast({
						icon: 'none',
						title: '登录,才可收藏词汇'
					});
					return
				}
				var newUrl
				if(this.menu.collect_status){
					//1 是收藏状态，需要取消收藏
					newUrl = "index/Handle/unCollect"
				}else{
					newUrl = "index/Handle/collect"
				}
				
				uniRequest.post(BASE_URL + newUrl, DATA).then(function(response) {
					console.log(response)
					if (response.status === 200 && response.data.code === 200) {
						// that.menu = response.data.data
						that.menu.collect_status = !that.menu.collect_status
				
					} else {
						uni.showToast({
							icon: 'none',
							title: response.data.msg
						});
					}
				}).catch(function(error) {
					console.log(error);
				});
			}
		},
		onLoad: function(option) { //option为object类型，会序列化上个页面传递的参数
			console.log(option); //打印出上个页面传递的参数。
			this.id = option.id

			var that = this;
			var  DATA = {
					sid: 0,
					id: option.id
				}
			if(VALIUSER[0]){
				DATA = {
					sid: VALIUSER[0].sid,
					id: option.id
				}
			}
			uniRequest.post(BASE_URL + "index/index/detail", DATA).then(function(response) {
				console.log(response)
				if (response.status === 200 && response.data.code === 200) {
					that.menu = response.data.data


				} else {
					uni.showToast({
						icon: 'none',
						title: response.data.msg
					});
				}
			}).catch(function(error) {
				console.log(error);
			});
		
			uniRequest.post(BASE_URL + "index/Handle/clickWord", DATA).then(function(response) {
				console.log(response)
				if (response.status === 200 && response.data.code === 200) {
					// that.menu = response.data.data
					console.log('增加浏览记录')
				
				} else {
					uni.showToast({
						icon: 'none',
						title: response.data.msg
					});
				}
			}).catch(function(error) {
				console.log(error);
			});
		}
	}
</script>


<style scoped lang="less">
	page {
		width: 100%;
		background-color: #ebebeb;
	}
</style>
<style lang="scss" scoped>
	@function realSize($args) {
		@return $args / 1.5;
	}

	.in_b {
		display: inline-block;
	}

	.page_edu {
		width: 100%;
	}

	.menu {
		uni-scroll-view {
			display: block;
			width: 90%;
		}
	}

	.swiper {
		margin-top: 100upx;
		padding: 25upx;
		text-align: center;
	}

	.page_edu_header {
		padding-top: var(--status-bar-height);
		background-color: #00aeff;
		width: 100%;
		height: realSize(185px);

		.header {
			display: flex;
			flex-direction: row;
			align-items: center;
			padding: realSize(20px);

			.btn {
				width: realSize(36px);
				height: realSize(30px);
			}

			.input {
				height: realSize(59px);
				width: 100%;
				margin-left: realSize(20px);
				margin-right: realSize(20px);
				background: rgba(255, 255, 255, 1);
				border-radius: realSize(30px);
				display: flex;
				flex-direction: row;
				align-items: center;

				.search {
					width: realSize(30px);
					height: realSize(30px);
					margin-left: realSize(20px);
					margin-right: realSize(20px);
				}
			}
		}

		.header_content {
			display: flex;
			flex-direction: row;
			uni-image {
			    width: 50upx;
			    height: 50upx;
			    display: inline-block;
			    overflow: hidden;
			    position: relative;
			    padding-right: 10upx;
				padding-left: 15upx;
				vertical-align: middle;
			}
			.right{
				float: right;
				height: 45px;
				line-height: 45px;
				display: table-cell;
				.title{
					// font-size: realSize(25px);
					display: inline-block;
					vertical-align: middle;
				}
				
			}
			.left {
				
				width: 57%;
				margin: 10upx 30upx;

				.title {
					width: realSize(419px);
					height: realSize(59px);
					font-size: realSize(35px);
					font-weight: bold;
					padding-top: 16upx;
					color: rgba(255, 255, 255, 1);
					
				}

				.sub_title {
					margin-top: 3px;
					font-size: realSize(18px);
					font-weight: 400;
					color: rgba(255, 255, 255, 1);

					background: linear-gradient(0deg, rgba(120, 255, 224, 1) 0%, rgba(255, 255, 255, 1) 100%);
					-webkit-background-clip: text;
					-webkit-text-fill-color: transparent;
				}

				.btn {
					margin-top: 3px;
					width: realSize(198px);
					height: realSize(60px);
					background: linear-gradient(-30deg, rgba(255, 88, 96, 1), rgba(255, 151, 0, 1));
					box-shadow: 0px 4px 10px 0px rgba(255, 121, 0, 0.5);
					border-radius: realSize(30px);
					color: rgba(255, 255, 255, 1);
					display: flex;
					align-items: center;
					justify-content: center;
				}
			}
		}
	}

	.page_content {
		width: 100%;
		margin-top: -74px;

		.menu {
			margin-left: 10px;
			margin-right: 10px;
			margin: 30upx 10px;
			padding: 30upx 20upx;
			// height: realSize(576px);
			padding: 20upx 30upx;
			// height: realSize(576px);
			background: rgba(255, 255, 255, 1);
			box-shadow: 0px 10px 10px 0px rgba(0, 161, 124, 0.1);
			border-radius: 10px;

			// display: flex;
			// flex-direction: row;
			// align-items: stretch;
			// justify-content: space-between;
			.title_m {
				text-align: justify;
				text-justify: inter-ideograph;
				text-indent: 2em;
			}
			
		}
	}
</style>
