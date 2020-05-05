<template>
	
	<view class='all'>
		<calender :dataSource ="myCheckData"></calender>
	</view>
</template>

<script>
	import calender from '../../components/Calendar.vue'
	import uniRequest from 'uni-request';
	import service from '../../service.js';
	const BASE_URL = 'http://www.lexicon.com/';
	
	export default {
		components: {
			calender
		},
		data() {
			return {
				myCheckData:[]
			};
		},
		created() {

		},
		watch: {
			
		},
		
		computed: {
			myData(){
				return ['2019-12-04', '2019-12-08', '2019-12-09', '2019-12-12']
			}
		},
		onLoad() {
			//<获取签到日期记录>
			const validUser = service.getUsers();
			const data = {
				sid: validUser[0].sid
			}
			var that = this
			uniRequest.post(BASE_URL + "index/index/signLog", data).then(function(response) {
				console.log(response)
				if (response.status === 200 && response.data.code === 200) {
					console.log(response.data.data);
					that.myCheckData = response.data.data
					
				} else {
					console.log('获取信息失败')
				}
			}).catch(function(error) {

				console.log(error);
			});
			//<获取签到日期记录/>
		},
		methods: {
			
			
		}
	}
</script>

<style lang="scss" scoped>
	.all {
		margin-top: 18rpx;
	}

	.all .bar {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		margin: 30rpx 20rpx;
		padding: 10rpx;
	}

	.bar button {
		height: 30px;
		line-height: 30px;
		font-size: 12px;
	}

	.all .week {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		padding: 20rpx;
		padding-left: 40rpx;
		padding-right: 40rpx;
		margin: 20rpx;
		border-radius: 10px;
		background-color: #fff;
	}

	.myDateTable {
		margin: 2.5vw;
		padding: 2vw;
		border-radius: 10px;
		/* background: linear-gradient(#ff9b0e, #ff8f79); */
		background: linear-gradient(#33c9ff, #b7e4ff);
	}

	.myDateTable .dateCell {
		width: 11vw;
		padding: 1vw;
		display: inline-block;
		text-align: center;
		font-size: 16px;
	}

	.dateCell .cell {
		display: flex;
		border-radius: 50%;
		height: 11vw;
		justify-content: center;
		align-items: center;
	}


	.whiteColor {
		color: #fff;
	}

	.greenColor {
		color: #fff;
		font-weight: bold;
	}

	.bgWhite {
		background: #00aeff;
	}

	.bgGray {
		background-color: rgba(255, 255, 255, 0.42);
	}

	.bgBlue {
		font-size: 14px;
		background-color: #00aeff;
	}

	.redColor {
		color: #ff6666;
	}

	#myMoney {
		width: 90%;
		margin: 10upx auto;
		text-align: center;

		p {
			text-align: center;
			display: inline-block;
		}

		.money {
			margin-top: 30upx;
		}
	}
</style>
	