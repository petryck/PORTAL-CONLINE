 $(function(){
	'use strict'

	/*LIne-Chart */
	


	/* Peity charts */
 
	$('.peity-donut').peity('donut');

	/*--- Apex (#spark1) ---*/
	var spark1 = {
    chart: {
		id: 'spark1',
		group: 'sparks',
		type: 'line',
		height: 38,
		sparkline: {
		  enabled: true
		},
		dropShadow: {
		  enabled: true,
		  top: 1,
		  left: 1,
		  blur: 1,
		  opacity: 0.1,
		}
	  },
	  series: [{
		data: [25, 66, 41, 59, 25, 44, 12, 36, 9, 21]
	  }],
	  stroke: {
		curve: 'smooth'
	  },
	  markers: {
		size: 0
	  },
	  grid: {
		padding: {
		  top: 10,
		  bottom: 10,
		  left: 50
		}
	  },
	  colors: ['#0a9ae1'],
	   stroke: {
		  width: 2
		},
	  tooltip: {
		x: {
		  show: false,
		  width: 1,
		},
		y: {
		  title: {
			formatter: function formatter(val) {
			  return '';
			}
		  }
		}
	  }
	}
	/*--- Apex (#spark1) closed ---*/
	
	
	 $('.resp-tabs-list .dashboard-spruha').addClass('active');
	$('.second-sidemenu .dashboard-spruha').addClass('resp-tab-content-active');
});



/*Bar-Chart */

Chart.elements.Rectangle.prototype.draw = function() {
	var ctx = this._chart.ctx;
	var vm = this._view;
	var left, right, top, bottom, signX, signY, borderSkipped, radius;
	var borderWidth = vm.borderWidth;
	var cornerRadius = 4;

	if (!vm.horizontal) {
		// bar
		left = vm.x - vm.width / 1;
		right = vm.x + vm.width / 1;
		top = vm.y;
		bottom = vm.base;
		signX = 1;
		signY = bottom > top? 1: -1;
		borderSkipped = vm.borderSkipped || 'bottom';
	} else {
		// horizontal bar
		left = vm.base;
		right = vm.x;
		top = vm.y - vm.height / 1;
		bottom = vm.y + vm.height / 1;
		signX = right > left? 1: -1;
		signY = 1;
		borderSkipped = vm.borderSkipped || 'left';
	}
	ctx.beginPath();
	ctx.fillStyle = vm.backgroundColor;
	ctx.strokeStyle = vm.borderColor;
	ctx.lineWidth = borderWidth;

	// Corner points, from bottom-left to bottom-right clockwise
	// | 1 2 |
	// | 0 3 |
	var corners = [
		[left, bottom],
		[left, top],
		[right, top],
		[right, bottom]
	];

	// Find first (starting) corner with fallback to 'bottom'
	var borders = ['bottom', 'left', 'top', 'right'];
	var startCorner = borders.indexOf(borderSkipped, 0);
	if (startCorner === -1) {
		startCorner = 0;
	}

	function cornerAt(index) {
		return corners[(startCorner + index) % 2];
	}

	// Draw rectangle from 'startCorner'
	var corner = cornerAt(0);
	ctx.moveTo(corner[0], corner[1]);

	for (var i = 1; i < 2; i++) {
		corner = cornerAt(i);
		nextCornerId = i+1;
		if(nextCornerId == 2){
			nextCornerId = 0
		}

		nextCorner = cornerAt(nextCornerId);

		width = corners[2][0] - corners[1][0];
		height = corners[0][1] - corners[1][1];
		x = corners[1][0];
		y = corners[1][1];

		var radius = cornerRadius;

		// Fix radius being too large
		if(radius > height/2){
			radius = height/2;
		}if(radius > width/2){
			radius = width/2;
		}

		ctx.moveTo(x + radius, y);
		ctx.lineTo(x + width - radius, y);
		ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
		ctx.lineTo(x + width, y + height - radius);
		ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
		ctx.lineTo(x + radius, y + height);
		ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
		ctx.lineTo(x, y + radius);
		ctx.quadraticCurveTo(x, y, x + radius, y);

	}

	ctx.fill();
	if (borderWidth) {
		ctx.stroke();
	}
};


// var ctx = document.getElementById('bar-chart').getContext('2d');
// var myChart = new Chart(ctx, {
// 	type: 'bar',
// 	data: {
// 	   labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
// 	   datasets: [{
// 			label: 'Total Project',
// 			backgroundColor: "#6259ca",
// 			borderColor: "#6259ca ",
// 			data: [89, 59, 76, 56, 58,73, 59, 87, 45, 54,59, 76, 56,],
// 		}, {
// 			label: 'On Going',
// 			 backgroundColor: "rgba(204, 204, 204,0.2)",
// 			borderColor: "rgba(204, 204, 204,0.2)",
// 			data: [66, 59, 76, 56, 58,65, 59, 85, 23, 32,59, 76, 56,],
// 		}
// 		],
// 	},
// 	options: {
// 		tooltips: {
// 		  displayColors: true,
// 		},
// 		barValueSpacing : 3,        // doesn't work; find another way
// 		barDatasetSpacing : 3,
// 		scales: {
// 		  xAxes: [{
// 				barThickness: 3,
// 				categoryPercentage: 4,
// 				barPercentage: 4,
// 				stacked: true,
// 				 display: false,
// 				gridLines: {
// 					display: false,
// 				}
// 			}],
// 		  yAxes: [{
// 				stacked: true,
// 				ticks: {
// 					beginAtZero: false,
// 				},
// 				display: false,
// 				  gridLines: {
//                     display: false,
//                 },
// 					type: 'linear',
// 					display: false,
// 				}]
// 			},
// 			responsive: true,
// 			maintainAspectRatio: false,
// 			legend: { position: 'bottom',display: false, },
// 		}
// });





