<template>
	<view class="user">
		<view class="content">
			<!-- #ifdef MP-WEIXIN -->
			<fishWx ref = "fishWx"  :fishsum="5"  :bospeed="2" :fishmaxspeed="3" ></fishWx>
			<!-- #endif -->
			<!--  #ifdef H5 -->
			<fish ref = "fish"  :fishsum="5"  :bospeed="2" :fishmaxspeed="3" ></fish>
			<!-- #endif -->
		</view>
		<view class="btn-row">
			<button v-if="!hasLogin" type="primary" class="primary" @tap="bindLogin">登录</button>
			<button v-if="hasLogin" type="default" @tap="bindLogout">退出登录</button>
		</view>
		<view class="fish-button" v-if="hasLogin">
			<button type="default" @click="bug(1)">买鱼</button>
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
		computed: {
			...mapState(['hasLogin', 'forcedLogin'])
		},
		components: {fish,fishWx},
		methods: {
			...mapMutations(['logout']),
			bindLogin() {
				uni.navigateTo({
					url: '../login/login',
				});
			},
			bindLogout() {
				this.logout();
				/**
				 * 如果需要强制登录跳转回登录页面
				 */
				if (this.forcedLogin) {
					uni.reLaunch({
						url: '../login/login',
					});
				}
			},
			bug() {
				 this.$refs.fishWx.addfish(1)
			}
			
		}
	}
</script>

<style scoped>
	.user {
		position: relative;
		width: 100%;
	}
	.content {
		width: 100%;
		padding: 0;
		overflow: hidden;
		/* position: absolute;
		bottom: 0; */
	}/* 
		
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
