import Highcharts from 'highcharts/highstock';
import HighchartsReact from 'highcharts-react-official';
import styled from 'styled-components';
import { Main } from './Styles';
import axios from 'axios';

Highcharts.setOptions({
	lang: { rangeSelectorZoom: '' },
	accessibility: { enabled: false },
});

Highcharts.seriesTypes.line.prototype.drawLegendSymbol = Highcharts.seriesTypes.column.prototype.drawLegendSymbol;

let seriesData = [];

export const Chart = (props) => {
	let endpoints = [
		'https://stockdata.test.quantfolio.dev/ticker/AAPL:NASDAQ',
		'https://stockdata.test.quantfolio.dev/ticker/GOOGL:NASDAQ',
		'https://stockdata.test.quantfolio.dev/ticker/ADBE:NASDAQ',
		'https://stockdata.test.quantfolio.dev/ticker/MSFT:NASDAQ',
	];

	Promise.all(endpoints.map((endpoint) => axios.get(endpoint))).then(
		axios.spread((...allData) => {
			seriesData = { allData };
			console.log(seriesData);
		})
	);

	const options = {
		chart: {
			zoomType: 'x',
		},

		navigator: {
			enabled: false,
		},

		rangeSelector: {
			buttons: [
				{
					type: 'year',
					count: 1,
					text: '1Y',
				},
				{
					type: 'year',
					count: 5,
					text: '5Y',
				},
				{
					type: 'all',
					text: 'MAX',
				},
			],
			selected: 2, // all
		},

		scrollbar: {
			enabled: false,
		},

		legend: {
			enabled: true,
			align: 'center',
			verticalAlign: 'bottom',
			x: 0,
			y: 0,
		},

		tooltip: {
			borderWidth: 0,
		},

		plotOptions: {
			series: {
				marker: {
					enabled: false,
					symbol: 'circle',
				},
			},
		},

		series: [
			seriesData.allData.forEach((stock) => {
				return {
					name: stock.data.meta.symbol,
					data: [
						stock.data.values
							.map((element) => {
								return [Date.parse(element.datetime), parseFloat(element.open)];
							})
							.reverse(),
					],
				};
			}),
		],

		credits: {
			enabled: false,
		},
	};

	return (
		<Main>
			<HighchartsReact
				highcharts={Highcharts}
				options={options}
				constructorType={'stockChart'}
				containerProps={{ className: props.className }}
			/>
		</Main>
	);
};

export const HighChartWrapper = styled(Chart)`
	/* .highcharts-plot-border {
		fill: black !important;
	} */
	width: min(100%, 100rem);
`;
