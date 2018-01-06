<template>
	<div class="page page_pay_state">
		<div  v-bind:style="{'min-height':screenHeight - 124 +'px'}">
			<div class="pay_content" style="padding-top:40%" v-show="!show">
				正在查询....
			</div>
			<div v-show="show">
				<div v-if="pay">
					<img src="../../assets/img/icon/success.png" />
					<div class="pay_content">
						支付成功
					</div>
				</div>
				<div v-if="!pay">
					<img src="../../assets/img/icon/fail.png" />
					<div class="pay_content">
						支付失败
					</div>
				</div>
				<br/> <br/> <br/>
				<mu-raised-button @click="go('myCenter')" label="返回首页" class="demo-raised-button fn-12" />
			</div>
		</div>
		<rh-footer></rh-footer>
	</div>
</template>

<script>
	export default {
		name: "page_pay_state",
		components: {
			"rh-footer": r => {
				require.ensure(
					[],
					() => r(require("./../../components/common/LogoFooter.vue")),
					"logoFooter"
				);
			}
		},
		data() {
			return {
				show:false,
				pay:false
			};
		},
		methods: {
			/** 
			 *  获取订单信息
			 *  金钱100.00 * choosed
			 */
			getOrderDetail(orderId){
				console.log(orderId)
				// 
				//调用后台生产订单
				utils.jsonp.post("c=apiorder&a=orderinfo",{orderid: orderId,},
					res => {
						this.show = true;
						this.pay = res.data.data.pay_status =='1';
					}
				);
			},
			/**
			 * 购买
			 */
			choose(item) {}

		},
		activated() {
			//订单ID
			let orderId = document.URL.split("=")[1].split("&")[0];
			this.getOrderDetail(orderId)
		}
		// ,
		// beforeRouteEnter(to, from, next) {
		//   next(true);
		//   this.$store.commit('LOADING', {
		//     loading: false
		//   })
		// }
	};
</script>

<style rel="stylesheet/scss" lang="scss">
	@import "src/assets/css/vars.scss";
	.page_pay_state {
		text-align: center;
		padding-top: 40px;
		img {
			margin: $pd-md;
			width: 80px;
		}
		.pay_content {
			font-size: $font-lg;
		}
	}
</style>
