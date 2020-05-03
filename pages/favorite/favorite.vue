<template>
	<view class="page_edu">
		<view class="page_content">
			<view class="menu">
				<view v-for="(items,index) in menu" :key='index' class="word_card"
				 @tap="myPage()">
					<view class="left in_b">
						词汇：{{ items.word }}
					</view>
					<view class="right in_b">
						浏览量：{{ items.AllPageView }}
					</view>
					<view class="clear">
						
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	// import tabControl from '@/components/tabControl-tag/tabControl-tag.vue';
	export default {
		// components:{tabControl},
		data() {
			return {
					menu: [
						{word:'1',AllPageView:'122'},
						{word:'1',AllPageView:'122'},
						{word:'1',AllPageView:'122'},
						{word:'1',AllPageView:'122'},
						{word:'1',AllPageView:'122'},
						{word:'1',AllPageView:'122'},
						{word:'1',AllPageView:'122'},
						{word:'1',AllPageView:'122'},
					],
					current: 0,
				}
			},
		onLoad() {

		},
		methods: {
			myPage() {
				uni.navigateTo({
					url: '../HM-search/HM-search',
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
		// margin-top: -74px;
		.menu {
			margin-left: 10px;
			margin-right: 10px;
			margin: 30upx 10px;
			padding: 30upx 20upx;
			// height: realSize(576px);
			padding: 20upx 30upx ;
			height: realSize(576px);
			background: rgba(255, 255, 255, 1);
			box-shadow: 0px 10px 10px 0px rgba(0, 161, 124, 0.1);
			border-radius: 10px;
			// display: flex;
			flex-direction: row;
			align-items: stretch;
			justify-content: space-between;
			.left{
				float: left;
			}
			.right{
				float: right;
			}
			.clear{
				clear: both;
				margin-bottom: 20upx;
			}
		}
	}

</style>
