<template>
  <div id="pfyh">
		<div class="section section1">
			<div class="logo">
				<img src="./img/01/07.png">
			</div>
			<div class="title1">
				<img src="./img/01/01.png">
			</div>
			<div class="card">
				<img class="card1" src="./img/01/02.png">
				<img class="card2" src="./img/01/03.png">
			</div>
			<div class="baloon">
				<img  src="./img/01/04.png">
			</div>
			<div class="building">
				<img src="./img/01/08.png">
			</div>
			<div class="bot">
				<!-- <img class="img1" src="./img/01/05.png"> -->
				<a data-c-collect="申请浦发信用卡" href="https://ecentre.spdbccc.com.cn/creditcard/indexActivity.htm?data=I2772382">
					<img class="img2" src="./img/01/06.png" >
				</a>
			</div>
			<div class="arrow">
				<img src="./img/arrow_1.png">
			</div>
		</div>
		
		<div class="section section2">
			<div class="title3">
				<img src="./img/03/01.png">
			</div>
			<div class="align-center">
				<div class="privilege-group1">
					<div>
						<img class="privilege1" src="./img/03/02.png">
						<img class="privilege2" src="./img/03/03.png">
					</div>
					<div class="mgt-10">
						<img class="privilege3" src="./img/03/04.png?v0103">
						<img class="privilege4" src="./img/03/05.png">
					</div>
					<div class="mgt-10">
						<img class="privilege5" src="./img/03/06.png">
						<img class="privilege6" src="./img/03/07.png?v0103">
					</div>
				</div>
			</div>
			<div class="apply2">
				<a data-c-collect="申请浦发信用卡">
					<img src="./img/01/06.png">
				</a>
			</div>
			<div class="arrow">
				<img src="./img/arrow_1.png">
			</div>
		</div>
		<div class="section section3">
			<div class="title3">
				<img src="./img/04/01.png">
			</div>
			<div class="align-center">
				<div class="privilege-group2">
					<div>
						<img class="privilege7" src="./img/04/02.png">
						<img class="privilege8" src="./img/04/03.png">
					</div>
					<div class="mgt-10">
						<img class="privilege9" src="./img/04/04.png?v0103">
						<img class="privilege10" src="./img/04/05.png">
					</div>
					<div class="mgt-10">
						<img class="privilege11" src="./img/04/06.png">
						<img class="privilege12" src="./img/04/07.png?v0103">
					</div>
				</div>
			</div>
			<div class="apply2">
				<a data-c-collect="申请浦发信用卡" href="https://ecentre.spdbccc.com.cn/creditcard/indexActivity.htm?data=I2772382">
					<img src="./img/01/06.png">
				</a>
			</div>
			<div class="arrow">
				<img src="./img/arrow_1.png">
			</div>
		</div>
		<div class="section section4">
			<div class="title3">
				<img src="./img/05/01.png">
			</div>
			<div class="align-center">
				<div class="gift">
					<img class="giftimg gift1" src="./img/05/02.png">
					<img class="giftimg gift2" src="./img/05/03.png">
					<img class="giftimg gift3" src="./img/05/04.png?v=20200212">
					<img class="giftimg gift4" src="./img/05/05.png">
				</div>
			</div>
            <div class="rule" id="rule" onclick="showRule()">
                更多权益
				<img src="./img/05/07.png">
			</div>
			<div class="detail" id="detail">
                <img src="./img/05/06.png?v=20200212">
                
				<div class="close" onclick="hideRule()"></div>
			</div>
			<div class="apply2">
				<a data-c-collect="申请浦发信用卡" href="https://ecentre.spdbccc.com.cn/creditcard/indexActivity.htm?data=I2772382">
					<img src="./img/01/06.png">
				</a>
			</div>
			<div class="arrow">
				<img src="./img/arrow_1.png">
			</div>
		</div>
		<div class="section section5">
			<div class="title2">
				第5页
			</div>
			<div class="letter">
				<img src="./img/02/02.png">
			</div>
			<div class="align-center1">
				<div class="rotate1">
					<img class="rotate1img" src="./img/02/03.png">
				</div>
			</div>	
			<div class="apply">
				<a data-c-collect="申请浦发信用卡测试">
					<img src="./img/01/06.png">
				</a>
			</div>
		</div>
	</div>
</template>

<script>
export default {
    data() {
        return {}
    },
    mounted() {
        import('../util/jquery.fullPage.js').then(_ => {
            console.log($('#pfyh').fullpage)
            $(function(){
                
		  	$('#pfyh').fullpage({afterLoad: function(anchorLink, i){
				  console.log(anchorLink, i)
			  }});
			});
        })
    }
}
</script>

<style scoped>
@import '../util/jquery.fullPage.css';
/* @import './main.css'; */
</style>