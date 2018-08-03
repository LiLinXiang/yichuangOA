/**
 * Created By   : lilinxiang
 * Created Date : 2018/8/3
 * Description  :
 */

let baseApi = {
	startOrEnd: function (startOrEnd) {
		return this
	},
	
	success: function () {
		return this
	}
};

/*function baseApi2() {
	function startOrEnd(startOrEnd) {
		return this
	}
	function success() {
		return this
	}
}*/
class BaseApi2 {

}


(function () {
	//baseApi2().startOrEnd().success();

	baseApi.startOrEnd(function (flag) {

	}).success(function () {
		
	})
})();

/*
baseApi(allProductColumn).success(function () {

}).finish(function () {

})*/
