<template>
	<!-- 打卡日历页面 -->
	<view class='all'>
		<view class="bar">
			<!-- 上一个月 -->
			<view class="previous" @click="handleCalendar(0)">
				<button class="barbtn" v-if="langType=='ch'">上一月</button>
				<button class="barbtn" v-else>Last</button>
			</view>
			<!-- 显示年月 -->
			<view class="date">{{cur_year || "--"}} 年 {{cur_month || "--"}} 月</view>
			<!-- 下一个月 -->
			<view class="next" @click="handleCalendar(1)">
				<button class="barbtn" v-if="langType=='ch'">下一月</button>
				<button class="barbtn" v-else>Next</button>
			</view>
		</view>
		<!-- 显示星期 -->
		<view class="week" v-if="langType=='ch'">
			<view v-for="(item,index) in weeks_ch" :key="index">{{item}}</view>
		</view>
		<view class="week" v-else>
			<view v-for="(item,index) in weeks_en" :key="index">{{item}}</view>
		</view>
		<view  class="myDateTable">
			<view v-for="(item,j) in days" :key="j" class='dateCell'>
				<view v-if="item.date==undefined||item.date == null" class='cell'>
					<text :decode="true">&nbsp;&nbsp;</text>
				</view>
				<view v-else>
					<!-- 已签到日期 -->
					<view v-if="item.isSign == true" class='cell greenColor bgWhite  '>
						<text>{{item.date}}</text>
					</view>
					<!-- 漏签 删除漏签-->
					<view class="cell redColor bgGray" v-else-if="cur_year<toYear||(cur_year==toYear&&cur_month<toMonth)||(cur_year==toYear&&cur_month==toMonth&&item.date<today)">
					<!-- <view @click="clickSignUp(item.date,0)" class="cell redColor bgGray" v-else-if="cur_year<toYear||(cur_year==toYear&&cur_month<toMonth)||(cur_year==toYear&&cur_month==toMonth&&item.date<today)"> -->
						<!-- 小程序不兼容这个 v-else-if="(new Date(cur_year+'-'+cur_month+'-'+item.date))<(new Date())"> -->
						<text>{{item.date}}</text>
					</view>
					<!-- 今日未签到-->
					<view @click="clickSignUp(item.date,1)" class="cell whiteColor bgBlue" v-else-if="item.date==today&&cur_month==toMonth&&cur_year==toYear">
						<text>签到</text>
					</view>
					<!-- 当前日期之后 -->
					<view class="whiteColor cell" v-else>
						<text>{{item.date}}</text>
					</view>
				</view>

			</view>
		</view>
		<view id="myMoney">
			<p>签到3天可以获取￥1金币</p>
			<p>集齐3枚，可以买小鱼哦</p><br>
			<p class="money">现有金币：￥{{balance}}</p>
			<!-- <button type="" @click="toBuy()" class="toBuy">购买小鱼</button> -->
		</view>
	</view>
</template>

<script>
	import uniRequest from 'uni-request';
	import service from '../service.js';
	const BASE_URL = 'http://www.lexicon.com/';
	const VALIUSER = service.getUsers();
	var  DATA = {
			sid: 0
		}
	if(VALIUSER[0]){
		DATA = {
			sid: VALIUSER[0].sid
		}
	}
	export default {
		data() {
			return {
				days: [],
				SignUp: [],
				cur_year: 0, //当前选的年
				cur_month: 0, //当前选的月
				today: parseInt(new Date().getDate()), //本日
				toMonth: parseInt(new Date().getMonth() + 1), //本月
				toYear: parseInt(new Date().getFullYear()), //本年
				weeks_ch: ['日', '一', '二', '三', '四', '五', '六'],
				weeks_en: ['Sun', 'Mon', 'Tues', 'Wed', 'Thur', 'Fri', 'Sat']
			};
		},
		props: {
			sendYear: {
				type: Number,
				default: new Date().getFullYear()
			},
			sendMonth: {
				type: Number,
				default: new Date().getMonth() + 1
			},
			dataSource: { //已签到的数据源
				type: Array,
				default: () => {
					return []
				}
			},
			langType: { //只是示例一个翻译而已，要想所有都翻译自己可以再加加
				type: String,
				default: "ch"
			},
		},
		created() {
			this.cur_year = this.sendYear;
			this.cur_month = this.sendMonth;
			this.SignUp = this.dataSource;

			this.calculateEmptyGrids(this.cur_year, this.cur_month);
			this.calculateDays(this.cur_year, this.cur_month);
			this.onJudgeSign();
			this.balance = VALIUSER[0]? VALIUSER[0].balance:0;

		},
		watch: {
			dataSource: 'onResChange',
		},
		onLoad() {
			//<获取签到日期记录>
			const VALIUSER = service.getUsers();
			var  DATA = {
					sid: 0
				}
			if(VALIUSER[0]){
				  DATA = {
					sid: VALIUSER[0].sid
				}
			}
			uniRequest.post(BASE_URL + "index/index/signLog", DATA).then(function(response) {
				if (response.status === 200 && response.data.code === 200) {
					console.log(response.data.data);
				} else {
					console.log('获取信息失败')
				}
			}).catch(function(error) {

				console.log(error);
			});
			//<获取签到日期记录/>
		},
		methods: {
			
			// 获取当月共多少天
			getThisMonthDays(year, month) {
				return new Date(year, month, 0).getDate()
			},
			// 获取当月第一天星期几
			getFirstDayOfWeek(year, month) {
				return new Date(Date.UTC(year, month - 1, 1)).getDay();
			},
			// 计算当月1号前空了几个格子，把它填充在days数组的前面
			calculateEmptyGrids(year, month) {
				//计算每个月时要清零
				this.days = [];
				const firstDayOfWeek = this.getFirstDayOfWeek(year, month);
				if (firstDayOfWeek > 0) {
					for (let i = 0; i < firstDayOfWeek; i++) {
						var obj = {
							date: null,
							isSign: false
						}
						this.days.push(obj);
					}
				}
			},

			// 绘制当月天数占的格子，并把它放到days数组中
			calculateDays(year, month) {
				const thisMonthDays = this.getThisMonthDays(year, month);
				// this.columnsLen=Math.ceil(thisMonthDays/7);
				// console.log(this.columnsLen);
				for (let i = 1; i <= thisMonthDays; i++) {
					var obj = {
						date: i,
						isSign: false
					}
					this.days.push(obj);
				}
				//console.log(this.days);

			},

			onResChange(newD, oldD) {
				this.SignUp = newD;
				this.onJudgeSign();
			},
			//匹配判断当月与当月哪些日子签到打卡
			onJudgeSign() {

				var signs = this.SignUp;
				var daysArr = this.days;
				for (var i = 0; i < signs.length; i++) {
					var current = new Date(signs[i]); //.replace(/-/g, "/")
					var year = current.getFullYear();
					var month = current.getMonth() + 1;
					var day = current.getDate();
					day = parseInt(day);
					for (var j = 0; j < daysArr.length; j++) {
						//年月日相同则打卡成功   						
						if (year == this.cur_year && month == this.cur_month && daysArr[j].date == day) { //&& signs[i].isSign == "今日已打卡"
							// console.log(daysArr[j].date, day);
							daysArr[j].isSign = true;
						}
					}
				}
				this.days = daysArr;
			},

			// 切换控制年月，上一个月，下一个月
			handleCalendar(type) {
				const cur_year = parseInt(this.cur_year);
				const cur_month = parseInt(this.cur_month);
				var newMonth;
				var newYear = cur_year;
				if (type === 0) { //上个月
					newMonth = cur_month - 1;
					if (newMonth < 1) {
						newYear = cur_year - 1;
						newMonth = 12;
					}
				} else {
					newMonth = cur_month + 1;
					if (newMonth > 12) {
						newYear = cur_year + 1;
						newMonth = 1;
					}
				}
				this.calculateEmptyGrids(newYear, newMonth);
				this.calculateDays(newYear, newMonth);

				this.cur_year = newYear;
				this.cur_month = newMonth;

				this.SignUp = []; //先清空
				this.$emit('dateChange', this.cur_year + "-" + this.cur_month); //传给调用模板页面去拿新数据				
			},

			clickSignUp(date, type) { //0补签，1当日签到		
				//this.$http.postHttp("Comment/UpdateRecord", "", (res) => {//可以通过后台接口添加当前用户当日打卡记录，
				//console.log(res);
				//if (res!= undefined) {
				var str = "签到";
				if (type !== 0) {
					var that = this
					console.log(VALIUSER[0],'1111')
					uniRequest.post(BASE_URL + "index/index/sign", DATA).then(function(response) {
						if (response.status === 200 && response.data.code === 200) {
	
							const newData = {
								account: VALIUSER[0].account,
								// pwd: VALIUSER[0].pwd,
								sid: VALIUSER[0].sid,
								nickname: VALIUSER[0].nickname,
								balance: (VALIUSER[0].balance+1),//后台互自动增加减少
								fishNum: VALIUSER[0].fishNum,
								
							}
							//TODO
							service.addUser(newData)
							that.balance = VALIUSER[0].balance;
							uni.showToast({
								title: "签到成功",
								icon: 'success',
								duration: 2000
							});
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

				this.SignUp.push(this.cur_year + "-" + this.cur_month + "-" + date); //自动加假数据，写了接口就不用了

				this.$emit('clickChange', this.cur_year + "-" + this.cur_month + "-" + date); //传给调用模板页面
				//refresh
				this.onJudgeSign();
				//}
				// })
			}
		}
	}
</script>

<style lang="scss" scoped>
	.toBuy {
		width: 32%;
		font-size: 29upx;
		line-height: 64upx;
		border-radius: 35upx;
		margin-top: 19upx;
		border: none;
		background: #ff9700;
		// background: rgba(252s, 135, 29, 1);
		color: #fff;
	}
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
