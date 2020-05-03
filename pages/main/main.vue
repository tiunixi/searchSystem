<template>
	<view class="page_edu">
		<view class="page_edu_header">
			<view class="header">
				<image src="/static/img/MainFavorite.png" class="btn" @tap="toFavorite()"></image>
				<view class="input" @click="HMSEarch()">
					<image src="/static/img/search.png" class="search"></image>
					<input type="text" value="" placeholder="搜索" />
				</view>
				<image src="/static/img/MainSignIn.png" class="btn" @tap="toSign()"></image>
			</view>
			<view class="header_content">
				<view class="left">
					<text class="title">金融名词检索服务</text>
					<text class="sub_title">读懂名词，轻松备考面试</text>
					<text class="btn" @tap="searchPage()">功能介绍与反馈</text>
				</view>
				<view>
					<image src="/static/right.png" style="width: 131px;height: 122px;"></image>
				</view>
			</view>
		</view>
		<view class="page_content">
			<view class="menu">
				<tabControl :current="current" :values="items" bgc="#fff" :fixed="true" :scrollFlag='true' :isEqually='true'
				 @clickItem="onClickItem"></tabControl>
				<!-- 使用 swiper 配合 滑动切换 -->
				<swiper class="swiper" style="height: 100%;width: 100%;" @change='scollSwiper' :current='current'>
					<swiper-item v-for="(items,index) in menu" :key='index'>
						<!-- 使用 scroll-view 来滚动内容区域 -->
						<!-- {{menu}} -->
						<scroll-view scroll-y="true" style="height: 100%;width: 100%;">
							<view class="menu_item" v-for="(item,index) in items" :key='index'>
								<view class="word_card" @tap="toWordPage(item.id)">
									<view class="left in_b">
										{{ item.key }}
									</view>
									<view class="right in_b">
										<image src="../../static/img/eye.png" ></image>
										{{ item.clickNum }}
									</view>
									<view class="clear"></view>
								</view>
							</view>
						</scroll-view>
					</swiper-item>
				</swiper>
			</view>
		</view>
	</view>
</template>

<script>
	import tabControl from '@/components/tabControl-tag/tabControl-tag.vue';
	import uniRequest from 'uni-request';
	import service from '../../service.js';
	const BASE_URL = 'http://www.lexicon.com/';
	const validUser = service.getUsers();
	const data = {
		sid: validUser[0].s_id
	}
	export default {
		components: {
			tabControl
		},
		data() {
			return {
				items: ['本站', '中国网站', '外国网站'],
				menu: [
					
				],
				current: 0,
			}
		},
		onShow() {
			var that = this;
			uniRequest.post(BASE_URL + "index/index/index", data).then(function(response) {
				if (response.status === 200 && response.data.code === 200) {
					that.items = response.data.data.items
					that.menu = response.data.data.menu
				} else {
					uni.showToast({
						icon: 'none',
						title: response.data.msg
					});
				}
			}).catch(function(error) {
				console.log(error);
			});
		},
		methods: {
			searchPage() {
				uni.navigateTo({
					url: '../feedback/feedback',
				});
			},
			HMSEarch() {
				uni.navigateTo({
					url: '../HM-search/HM-search',
				});
			},
			toSign() {
				uni.navigateTo({
					url: '../Calendar/Calendar',
				});
			},
			toFavorite() {
				uni.navigateTo({
					url: '../favorite/favorite',
				});
			},
			onClickItem(val) {
				this.current = val.currentIndex
			},
			scollSwiper(e) {
				this.current = e.target.current
			},
			toWordPage(id) {
				uni.navigateTo({
					url: '../myPage/myPage?id=' + id,
				});
			},
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
		height: realSize(415px);

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

			.left {
				display: flex;
				flex-direction: column;
				width: 57%;
				margin-top: 10px;
				margin-left: 15px;
				margin-right: 15px;

				.title {
					width: realSize(419px);
					height: realSize(59px);
					font-size: realSize(47px);
					font-weight: bold;
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
			padding-left: 10px;
			padding-right: 10px;
			height: realSize(576px);
			background: rgba(255, 255, 255, 1);
			box-shadow: 0px 10px 10px 0px rgba(0, 161, 124, 0.1);
			border-radius: 10px;
			display: flex;
			flex-direction: row;
			align-items: stretch;
			justify-content: space-between;

			.left {
				float: left;
				height: 35px;
				line-height: 35px;
			}

			.right {
				float: right;
				height: 35px;
				line-height: 35px;
			}

			.clear {
				clear: both;
				margin-bottom: 20upx;
			}
			.word_card{
				height: 35px;
				line-height: 35px;
				// overflow: hidden;
				uni-image {
				    width: 40upx; 
				    height: 40upx;
				    display: inline-block;
				    overflow: hidden;
				    position: relative;
					padding-right: 10upx;
					line-height: 40upx;
				}
				
				uni-image>div, uni-image>img {
				    width: 100%;
				    height: 100%;
					margin-top:3px;
				}
			}
			.right——img{
				width: 30upx;
				height: 30upx;
			}
		}
	}
</style>
