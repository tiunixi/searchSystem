<template>
	<view class="page_edu">
		<view class="page_edu_header">
			<view class="header_content">
				<view class="left">
					<text class="title">比特币（Bitcoin）</text>
				</view>
			</view>
		</view>
		<view class="page_content">
			<view class="menu">
				<view class="intro title_m">
					比特币（Bitcoin）的概念最初由中本聪在2008年11月1日提出，并于2009年1月3日正式诞生 [1]  。根据中本聪的思路设计发布的开源软件以及建构其上的P2P网络。比特币是一种P2P形式的虚拟的加密数字货币。点对点的传输意味着一个去中心化的支付系统。
				</view>
				<br>
				<br>
				<!-- <view class="introduction title_m">
					与所有的货币不同，比特币不依靠特定货币机构发行，它依据特定算法，通过大量的计算产生，比特币经济使用整个P2P网络中众多节点构成的分布式数据库来确认并记录所有的交易行为，并使用密码学的设计来确保货币流通各个环节安全性。P2P的去中心化特性与算法本身可以确保无法通过大量制造比特币来人为操控币值。基于密码学的设计可以使比特币只能被真实的拥有者转移或支付。这同样确保了货币所有权与流通交易的匿名性。比特币与其他虚拟货币最大的不同，是其总数量非常有限，具有极强的稀缺性。
					<br>
					2017年12月17日，比特币达到历史最高价19850美元。
					2020年2月10日，比特币价格突破10000美元。
				</view>
				<br>
				<br> -->
			</view>
			<view class="menu">
				<!-- <view class="intro title_m">
					比特币（Bitcoin）的概念最初由中本聪在2008年11月1日提出，并于2009年1月3日正式诞生 [1]  。根据中本聪的思路设计发布的开源软件以及建构其上的P2P网络。比特币是一种P2P形式的虚拟的加密数字货币。点对点的传输意味着一个去中心化的支付系统。
				</view>
				<br>
				<br> -->
				<view class="introduction title_m">
					与所有的货币不同，比特币不依靠特定货币机构发行，它依据特定算法，通过大量的计算产生，比特币经济使用整个P2P网络中众多节点构成的分布式数据库来确认并记录所有的交易行为，并使用密码学的设计来确保货币流通各个环节安全性。P2P的去中心化特性与算法本身可以确保无法通过大量制造比特币来人为操控币值。基于密码学的设计可以使比特币只能被真实的拥有者转移或支付。这同样确保了货币所有权与流通交易的匿名性。比特币与其他虚拟货币最大的不同，是其总数量非常有限，具有极强的稀缺性。
					<br>
					2017年12月17日，比特币达到历史最高价19850美元。
					2020年2月10日，比特币价格突破10000美元。
				</view>
				<br>
				<br>
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
			margin: 30upx 10px;
			padding: 30upx 20upx;
			// height: realSize(576px);
			padding: 20upx 30upx ;
			// height: realSize(576px);
			background: rgba(255, 255, 255, 1);
			box-shadow: 0px 10px 10px 0px rgba(0, 161, 124, 0.1);
			border-radius: 10px;
			// display: flex;
			// flex-direction: row;
			// align-items: stretch;
			// justify-content: space-between;
			.title_m{
				    text-align: justify; text-justify: inter-ideograph; text-indent: 2em;
			}
		}
	}

</style>
