<template>
	<view class="content">
		<view class="input-group">
			<view class="input-row border">
				<text class="title">邮箱：</text>
				<m-input type="text" clearable v-model="email" class="email" placeholder="请输入邮箱"></m-input>
				<button type="" @click="getVercode()" class="get-vercode">{{setTimeNumber}}</button>
			</view>
			<m-input type="primary" class="clear">x</m-input>
			<view class="input-row border">
				<text class="title">验证码：</text>
				<m-input type="text" focus clearable v-model="vercode" placeholder="请输入邮箱验证码"></m-input>
			</view>
			<m-input type="primary" class="clear">x</m-input>
			<view class="input-row">
				<text class="title">密码：</text>
				<m-input type="password" displayable v-model="password" placeholder="请输入密码"></m-input>
				<!-- <m-input type="primary" class="clear">x</m-input> -->
			</view>

		</view>
		<view class="btn-row">
			<button type="primary" class="primary" @tap="register">找回密码</button>
		</view>
	</view>
</template>

<script>
	import service from '../../service.js';
	import mInput from '../../components/m-input.vue';
	import uniRequest from 'uni-request';
	const BASE_URL = 'http://www.lexicon.com/'
	export default {
		components: {
			mInput
		},
		data() {
			return {
				vercode: '',
				password: '',
				email: 'zepuer@163.com',
				sid: '',
				setTimeNumber: '验证码',
				verifyShow: true,
			}
		},
		methods: {
			/*
			 * 60S 倒计时
			 */
			timedown(num) {
				let that = this;
				if (num == 0) {
					that.verifyShow = true; // 是否显示获取验证码
					that.setTimeNumber = '验证码'
					return clearTimeout();
				} else {
					that.verifyShow = false; // 是否显示获取验证码
					setTimeout(function() {
						that.setTimeNumber = (num - 1) + 's'
						that.timedown(num - 1);
					}, 1000); //定时每秒减一  
				}
			},

			/*
			 * 验证码
			 */

			getVercode() {
				if (!this.verifyShow) {
					uni.showToast({
						icon: 'none',
						title: '请稍后'
					});
					return
				}
				var pattern = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/;

				if (!pattern.test(this.email)) {
					uni.showToast({
						icon: 'none',
						title: '请输入正确邮箱'
					});
					return;
				}
				var newEmail = {
					email: this.email
				}
				uni.showToast({
					icon: 'none',
					title: '发送中，请稍后'
				});
				uni.request({
					url: BASE_URL + "index/index/sendMail",
					data: newEmail,
					method: 'GET',
					success: (e) => {
						console.log(e)
						if (e.statusCode === 200) {
							if (e.data.code === 200) {
								console.log(e.data.data.sid)
								this.sid = e.data.data.sid
								this.timedown(60)
							} else {
								uni.showToast({
									icon: 'none',
									title: '请换个邮箱地址',
									duration: 1000
								});
							}
						}
					},
				})
			},
			register() {
				/**
				 * 客户端对账号信息进行一些必要的校验。
				 * 实际开发中，根据业务需要进行处理，这里仅做示例。
				 */
				if (this.vercode.length < 4) {
					uni.showToast({
						icon: 'none',
						title: '验证码最短为 4 个字符'
					});
					return;
				}
				if (this.password.length < 6) {
					uni.showToast({
						icon: 'none',
						title: '密码最短为 6 个字符'
					});
					return;
				}

				const data = {
					vercode: this.vercode,
					password: this.password,
					email: this.email,
					sid: this.sid,
				}
				
				var that = this
				uniRequest.post(BASE_URL + "index/index/forget", data).then(function(response) {
					console.log(response)
					if (response.status === 200 && response.data.code === 200) {
						// 登录成功后存入缓存数据addUser 
						
						uni.showToast({
							icon: 'none',
							title: '找回成功,请重新登录',
							duration: 2000
						});
						setTimeout(function(){
							uni.reLaunch({
								url: '../login/login',
							});
						},2000)
						
					} else {
						
						uni.showToast({
							icon: 'none',
							title: '用户邮箱或验证码不正确',
							duration: 1000
						});
					}
				}).catch(function(error) {

					console.log(error);
				});
			}
		}
	}
</script>

<style lang="less" scoped>
	.clear {
		float: right;
		display: none;
	}

	.input-row {
		line-height: 80upx;
		height: 80upx;
	}

	.get-vercode {
		font-size: 24upx;
		line-height: 80upx;
		width: 120upx;
		padding: 0 2upx;
	}
</style>
s