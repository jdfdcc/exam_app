<template>
	<div class="page page_pay_state">
		<div v-bind:style="{'min-height':screenHeight - 124 +'px'}">
			<div v-if="pay == 1">
				<img src="../../assets/img/icon/success.png" />
				<div class="pay_content">
					支付成功
				</div>
			</div>
			<div v-if="pay == 2">
				<img src="../../assets/img/icon/fail.png" />
				<div class="pay_content">
					支付失败
				</div>
			</div>
			<br/> <br/> <br/>
			<mu-raised-button @click="go('examHome')" label="返回首页" class="demo-raised-button fn-12" />
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
				pay:2
			};
		},
		methods: {
			/**
			 * 购买
			 */
			choose(item) {}
		},
		activated() {}
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
