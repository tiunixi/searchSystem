<template>
	
	<view class='all'>
		<calender :dataSource ="myCheckData"></calender>
		<button type="" @click="toBuy()" class="toBuy">购买小鱼</button>
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
					// that.myCheckData =["2020-05-04","2020-05-01"]
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
			
			//跳转小鱼
			toBuy(){
				uni.switchTab({
					url: '../user/user',
				});
			},
		}
	}
</script>

<style lang="scss" scoped>
	.toBuy {
		width: 32%;
		font-size: 29upx;
		margin-top: 19upx;
		line-height: 64upx;
		border-radius: 35upx;
		border: none;
		background: #ff6666;
		color: #fff;
	}
	
</style>
	