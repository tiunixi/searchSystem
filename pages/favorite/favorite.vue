<template>
	<view class="page_edu">
		<view class="page_content">
			<view class="menu">
				<view class="show" v-if="menu.length !== 0 ">
					
					<view v-for="(items,index) in menu" :key='index' class="title_card">
							<view class="left in_b"  @tap="myPage(items.data_id)">
								{{ items.title }}
							</view>
							
							<view class="right in_b">
								<!-- <image src="../../static/img/collect.png"></image> -->
								<image src="../../static/img/eye.png"></image>
								<text class="title">
									{{items.clickNum}}
								</text>
							</view>
							<view class="clear"></view>
					</view>
				</view>
				<view class="no-show"  v-else>
					暂无收藏
				</view>
				<view class="example-body">
					<uni-pagination :current="current" :total="total" title="标题文字" :show-icon="true" @change="change" />
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
	// const DATA = {
	// 	sid: VALIUSER[0].sid
	// }
	import uniPagination from '@/components/uni-pagination/uni-pagination.vue'
	import uniList from '@/components/uni-list/uni-list.vue'
	import uniListItem from '@/components/uni-list-item/uni-list-item.vue'
	export default {
		components: {
			uniPagination,
			uniList,
			uniListItem,
			// uniSection
		},
		data() {
			return {
				current: 1,
				total: 0,
				pageSize: 10,
				menu: [
					// {title:'暂无收藏',clickNum:''}, 
				],
				current: 0,
				}
			},
		/**
		 * 初始化页面渲染
		 * */
		onShow() {
			// console.log(1)
			var that = this;
			var  DATA = 0
			if(typeof VALIUSER === 'object'){
				console.log(1)
			    DATA = {
					sid: VALIUSER[0].sid?VALIUSER[0].sid:0
				}
			}

			console.log(typeof VALIUSER === 'object',typeof VALIUSER,DATA)
			
			uniRequest.post(BASE_URL + "index/index/collect", DATA).then(function(response) {
				console.log(response)
				if (response.status === 200 && response.data.code === 200) {
		
					
					that.total = response.data.data.total
					that.pageSize = response.data.data.per_page
					that.current = response.data.data.current_page	
					that.menu = response.data.data.data
					console.log(response.data.data)
					console.log(that.menu)
		
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
			myPage(id) {
				uni.navigateTo({
					url: '../myPage/myPage?id='+id,
				});
			},
			onClickItem(val) {
				this.current = val.currentIndex
			},
			scollSwiper(e){
				this.current = e.target.current
			}
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

	.page_edu {
		width: 100%;
	}
	
	.page_content {
		width: 100%;
		margin-top: 24upx;
		position: relative;
		// height: calc(100vh - 20px);
		.menu {
				margin-left: 10px;
				margin-right: 10px;
				padding-left: 10px;
				padding-right: 10px;
				height: realSize(776px);
				background: rgba(255, 255, 255, 1);
				box-shadow: 0px 10px 10px 0px rgba(0, 161, 124, 0.1);
				border-radius: 10px;
				// display: flex;
				// flex-direction: row;
				// align-items: stretch;
				// justify-content: space-between;
		
				.left {
					float: left;
					height: 35px;
					line-height: 35px;
				}
		
				.right{
					float: right;
					height: 35px;
					line-height: 35px;
					display: table-cell;
					.title{
						// font-size: realSize(25px);
						display: inline-block;
						vertical-align: middle;
					}
				}
		
				.clear {
					clear: both;
					margin-bottom: 20upx;
				}
		
				.title_card {
					height: 35px;
					line-height: 35px;
		
					// overflow: hidden;
					uni-image {
						width: 50upx;
						height: 50upx;
						display: inline-block;
						overflow: hidden;
						position: relative;
						padding-right: 10upx;
						vertical-align: middle;
					}
		
					uni-image>div,
					uni-image>img {
						width: 100%;
						height: 100%;
						margin-top: 3px;
					}
				}
		
				.right——img {
					width: 30upx;
					height: 30upx;
				}
			}
		}
.example-body{
	position: absolute;
	bottom: 0px;
	width: 85%;
	transform: translate(-50%,-50%);
	left: 50%;
}
.no-show{
	text-align: center;
	padding-top: 30upx;
}
</style>
