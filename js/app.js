/**
 * 演示程序当前的 “注册/登录” 等操作，是基于 “本地存储” 完成的
 * 当您要参考这个演示程序进行相关 app 的开发时，
 * 请注意将相关方法调整成 “基于服务端Service” 的实现。
 **/
(function($, owner) {
	/**
	 * 用户登录
	 **/
	owner.login = function(loginInfo, callback) {
		callback = callback || $.noop;
		loginInfo = loginInfo || {};
		loginInfo.account = loginInfo.account || '';
		loginInfo.password = loginInfo.password || '';
		if (loginInfo.account.length < 2) {
			return callback('账号最短为 5 个字符');
		}
		if (loginInfo.password.length < 2) {
			return callback('密码最短为 6 个字符');
		}
		 var urldata = app.getlurdata();
		 var lur='http://mb.xczs.co';
		if(urldata.urldata==undefined) {}
					else
					{
						lur=urldata.urldata;		 
					}
			mui.ajax(lur+'/webserver/WebService1.asmx/GetLogin',{
			data:{
				"username":loginInfo.account,
				"password":loginInfo.password
			},
			contentType: "application/x-www-form-urlencoded; charset=utf-8",
			dataType:'json',//服务器返回json格式数据
			type:'post',//HTTP请求类型
			success:function(data){
				//服务器返回响应，根据响应结果，分析是否登录成功；
				//return callback(data);
			 	var users = eval(data);
			 var authed =false;
			 
			  if(users.uid==loginInfo.account )
			 	{
			 	authed=true;
			 	}
			 
//				var authed = users.some(function(user) {
//			return loginInfo.account == user.account && $.md5(loginInfo.password) == user.password;
//		});
//return callback(md5(loginInfo.password));
		 if (authed) {
			return owner.createState(users.name, callback);
		} else {
			return callback('用户名或密码错误' );
		}
			},
			error:function(xhr,type,errorThrown){
				//异常处理；
				return callback("检查网络是否正常！或联系IT人员服务器是否正常！");
			}
		});
		//return callback(users);
		//var users = JSON.parse(localStorage.getItem('$users') || '[]');
		
	};

	owner.createState = function(name, callback) {
		var state = owner.getState();
		state.account = name;
		state.token = "token123456789";
		owner.setState(state);
		return callback();
	};

	/**
	 * 新用户注册
	 **/
	owner.reg = function(regInfo, callback) {
		callback = callback || $.noop;
		regInfo = regInfo || {};
		regInfo.account = regInfo.account || '';
		regInfo.password = regInfo.password || '';
		if (regInfo.account.length < 5) {
			return callback('用户名最短需要 5 个字符');
		}
		if (regInfo.password.length < 6) {
			return callback('密码最短需要 6 个字符');
		}
		if (!checkEmail(regInfo.email)) {
			return callback('邮箱地址不合法');
		}
		var users = JSON.parse(localStorage.getItem('$users') || '[]');
		users.push(regInfo);
		localStorage.setItem('$users', JSON.stringify(users));
		return callback();
	};

	/**
	 * 获取当前状态
	 **/
	owner.getState = function() {
		var stateText = localStorage.getItem('$state') || "{}";
		return JSON.parse(stateText);
	};

	/**
	 * 设置当前状态
	 **/
	owner.setState = function(state) {
		state = state || {};
		localStorage.setItem('$state', JSON.stringify(state));
		//var settings = owner.getSettings();
		//settings.gestures = '';
		//owner.setSettings(settings);
	};

	var checkEmail = function(email) {
		email = email || '';
		return (email.length > 3 && email.indexOf('@') > -1);
	};

	/**
	 * 找回密码
	 **/
	owner.forgetPassword = function(email, callback) {
		callback = callback || $.noop;
		if (!checkEmail(email)) {
			return callback('邮箱地址不合法');
		}
		return callback(null, '新的随机密码已经发送到您的邮箱，请查收邮件。');
	};

	/**
	 * 获取应用本地配置
	 **/
	owner.setSettings = function(settings) {
		settings = settings || {};
		localStorage.setItem('$settings', JSON.stringify(settings));
	}
/**
	 * 设置应用本地配置
	 **/
	owner.getSettings = function() {
		var settingsText = localStorage.getItem('$settings') || "{}";
		return JSON.parse(settingsText);
	}
	
	/**
	 * 设置应用URL配置
	 **/
	owner.getlurdata = function() {
		var settingsText = localStorage.getItem('$lurdata') || "{}";
		return JSON.parse(settingsText);
	}
	
	/**
	 * 获取应用本地URL配置
	 **/
	owner.setlurdata = function(lurdata) {
		lurdata = lurdata || {};
		localStorage.setItem('$lurdata', JSON.stringify(lurdata));
	}

	
}(mui, window.app = {}));