// 管理账号信息
const USERS_KEY = 'USERS_KEY';
const STATE_KEY = 'STATE_KEY';
const getUsers = function() {
	let ret = '';
	ret = uni.getStorageSync(USERS_KEY);
	if (!ret) {
		ret = '[]';
	}
	return JSON.parse(ret);
}

const addUser = function(userInfo) {
	// let users = getUsers();
	let users = []
	console.log('users',userInfo)
	// users.pop()
	users.unshift({
		account: userInfo.account,
		password: userInfo.password,
		sid: userInfo.sid,
		balance: userInfo.balance,
		fishNum: userInfo.fishNum,
		nickname: userInfo.nickname
	});
	uni.setStorageSync(USERS_KEY, JSON.stringify(users));
}

export default {
	getUsers,
	addUser
}
