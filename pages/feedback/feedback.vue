<template>
	<view class="page_edu">
		<view class="page_edu_header">
			<view class="header_content">
				<view class="left">
					<text class="title">金融名词检索服务</text>
				</view>
			</view>
		</view>
		<view class="page_content">
			<view class="menu">
				<p class="title_m">
					金融名词搜索系统最基本的功能是为用户提供有效的查询信息，包括金融名词的解释，用法等。同时，由于人们经常经常在手机上查询名词，所以本设计会对手机端进行开发，并且对H5、小程序和安卓端进行兼容处理，在用户进行查询的过程中，会使用elasticsearch来进行数据分析。用elasticsearch，可以过滤一些无关信息，重洗本地数据库信息，以达到更新数据的目的。如果用户搜索的内容，数据库中没有，就会根据这个词汇进行爬虫。
				</p>
					<br>
					<br>
				<p class="title_m">
					本设计致力于使得系统可以在多端使用（H5、小程序、安卓）。让用户可以随时随地，方便快捷的使用本系统检索金融名词。
					<br>
					<br>
				</p>
					<br>
				<p class="title_p">	
					如果有意见和建议，可以联系作者： tyx1997@qq.com
				</p>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				id:null
			}
		},
		methods: {
			
		},	
	    onLoad: function (option) { //option为object类型，会序列化上个页面传递的参数
	        console.log(option); //打印出上个页面传递的参数。
	        console.log(option); //打印出上个页面传递的参数。
			this.id = option
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
	.in_b{
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

			.left {
				display: flex;
				flex-direction: column;
				width: 57%;
				margin: 10upx 30upx;

				.title {
					width: realSize(419px);
					height: realSize(59px);
					font-size: realSize(35px);
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
			margin-bottom: 30upx;
			padding: 30upx 20upx;
			// height: realSize(576px);
			background: rgba(255, 255, 255, 1);
			box-shadow: 0px 10px 10px 0px rgba(0, 161, 124, 0.1);
			border-radius: 10px;
			text-align: center;
			// display: flex;
			// flex-direction: row;
			// align-items: stretch;
			// justify-content: space-between;
			.title_m{
				    text-align: justify; text-justify: inter-ideograph; text-indent: 2em;
			}
			.title_p{
				text-align: center;
			}
		}
	}

</style>
